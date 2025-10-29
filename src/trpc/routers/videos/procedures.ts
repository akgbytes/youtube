import { db } from "@/db";
import { videosTable, videoUpdateSchema } from "@/db/schema/videos";
import { mux } from "@/lib/mux";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { UTApi } from "uploadthing/server";
import * as z from "zod";

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
        inputs: [
          {
            generated_subtitles: [
              {
                language_code: "en",
                name: "English",
              },
            ],
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

  update: protectedProcedure
    .input(videoUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;

      if (!input.id) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      const [updatedVideo] = await db
        .update(videosTable)
        .set({
          title: input.title,
          description: input.description,
          categoryId: input.categoryId,
          visibility: input.visibility,
        })
        .where(
          and(eq(videosTable.id, input.id), eq(videosTable.userId, userId))
        )
        .returning();

      if (!updatedVideo) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return updatedVideo;
    }),

  remove: protectedProcedure
    .input(z.object({ id: z.uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;
      const { id } = input;

      const [removedVideo] = await db
        .delete(videosTable)
        .where(and(eq(videosTable.id, id), eq(videosTable.userId, userId)))
        .returning();

      if (!removedVideo) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return removedVideo;
    }),

  restoreThumbnail: protectedProcedure
    .input(
      z.object({
        id: z.uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.user;

      const [existingVideo] = await db
        .select()
        .from(videosTable)
        .where(
          and(eq(videosTable.id, input.id), eq(videosTable.userId, userId))
        );

      if (!existingVideo) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      if (!existingVideo.muxPlaybackId) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      const tempThumbnail = `https://image.mux.com/${existingVideo.muxPlaybackId}/thumbnail.png`;

      const utapi = new UTApi();
      const uploadedThumbnail = await utapi.uploadFilesFromUrl(tempThumbnail);

      if (!uploadedThumbnail.data) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }

      const { ufsUrl: thumbnailUrl, key: thumbnailKey } =
        uploadedThumbnail.data;

      const [updatedVideo] = await db
        .update(videosTable)
        .set({ thumbnailUrl, thumbnailKey })
        .where(
          and(eq(videosTable.id, input.id), eq(videosTable.userId, userId))
        )
        .returning();

      return updatedVideo;
    }),
});
