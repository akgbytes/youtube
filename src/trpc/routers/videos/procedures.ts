import { db } from "@/db";
import { videosTable } from "@/db/schema/videos";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const videosRouter = createTRPCRouter({
  create: protectedProcedure.mutation(async ({ ctx, input }) => {
    const { id: userId } = ctx.user;

    const [video] = await db
      .insert(videosTable)
      .values({
        userId,
        title: "Test title 1",
        description: "Test description 1",
      })
      .returning();

    return {
      video,
    };
  }),
});
