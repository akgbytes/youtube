import { db } from "@/db";
import { videosTable } from "@/db/schema/videos";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { and, desc, eq, lt, or } from "drizzle-orm";
import * as z from "zod";

export const studioRouter = createTRPCRouter({
  getMany: protectedProcedure
    .input(
      z.object({
        cursor: z
          .object({
            id: z.uuid(),
            updatedAt: z.date(),
          })
          .nullish(),

        limit: z.number().min(1).max(50),
      })
    )
    .query(async ({ ctx, input }) => {
      const { cursor, limit } = input;
      const { id: userId } = ctx.user;
      const data = await db
        .select()
        .from(videosTable)
        .where(
          and(
            eq(videosTable.userId, userId),

            cursor
              ? or(
                  lt(videosTable.updatedAt, cursor.updatedAt),
                  and(
                    eq(videosTable.updatedAt, cursor.updatedAt),
                    lt(videosTable.id, cursor.id)
                  )
                )
              : undefined
          )
        )
        .orderBy(desc(videosTable.updatedAt), desc(videosTable.id))
        .limit(limit + 1);

      const hasMore = data.length > limit;

      // Remove the last video if their is more videos
      const videos = hasMore ? data.slice(0, -1) : data;

      // Set the next cursor to the last video if there is more data
      const lastVideo = videos[videos.length - 1];
      const nextCursor = hasMore
        ? {
            id: lastVideo.id,
            updatedAt: lastVideo.updatedAt,
          }
        : null;

      return { videos, nextCursor };
    }),
});
