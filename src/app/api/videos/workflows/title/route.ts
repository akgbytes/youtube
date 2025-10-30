import { TITLE_SYSTEM_PROMPT } from "@/constants";
import { db } from "@/db";
import { videosTable } from "@/db/schema/videos";
import { serve } from "@upstash/workflow/nextjs";
import { and, eq } from "drizzle-orm";

interface Payload {
  userId: string;
  videoId: string;
}

export const { POST } = serve(async (context) => {
  const payload = context.requestPayload as Payload;
  const { userId, videoId } = payload;

  const video = await context.run("get-video", async () => {
    const [existingVideo] = await db
      .select()
      .from(videosTable)
      .where(and(eq(videosTable.id, videoId), eq(videosTable.userId, userId)));

    if (!existingVideo) {
      throw new Error("Not found");
    }

    if (!existingVideo.muxPlaybackId || !existingVideo.muxTrackId) {
      throw new Error("Video transcript not available");
    }

    return existingVideo;
  });

  const transcript = await context.run("get-transcript", async () => {
    const trackUrl = `https://stream.mux.com/${video.muxPlaybackId}/text/${video.muxTrackId}.txt`;
    const response = await fetch(trackUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch transcript: ${response.statusText}`);
    }

    const text = await response.text();

    if (!text || text.trim().length === 0) {
      throw new Error("Transcript is empty");
    }

    return text;
  });

  const { status, body } = await context.api.openai.call("generate-title", {
    token: process.env.OPENAI_API_KEY!,
    operation: "chat.completions.create",
    body: {
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: TITLE_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: transcript,
        },
      ],
    },
  });

  const title = body.choices[0]?.message.content;

  await context.run("update-video", async () => {
    await db
      .update(videosTable)
      .set({
        title: title || video.title,
      })
      .where(and(eq(videosTable.id, videoId), eq(videosTable.userId, userId)));
  });
});
