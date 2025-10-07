import { z } from "zod";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";
export const appRouter = createTRPCRouter({
  hello: protectedProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `${opts.ctx.user}`,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
