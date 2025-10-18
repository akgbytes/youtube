import { db } from "@/db";
import { videosTable } from "@/db/schema/videos";
import { mux } from "@/lib/mux";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const videosRouter = createTRPCRouter({
  create: protectedProcedure.mutation(async ({ ctx, input }) => {
    const { id: userId } = ctx.user;

    const upload = await mux.video.uploads.create({
      new_asset_settings: {
        passthrough: userId,
        playback_policies: ["public"],
        static_renditions: [
          {
            resolution: "1080p",
          },
        ],
      },

      cors_origin: "*", // Set to app url in production
    });

    const [video] = await db
      .insert(videosTable)
      .values({
        userId,
        title: "Test title 1",
        description: "Test description 1",
        muxStatus: "waiting",
        muxUploadId: upload.id,
      })
      .returning();

    return {
      video,
      url: upload.url,
    };
  }),
});
