import * as z from "zod";
import { createTRPCRouter, protectedProcedure } from "../init";
import { categoriesRouter } from "./categories/procedures";
export const appRouter = createTRPCRouter({
  // hello: protectedProcedure
  //   .input(
  //     z.object({
  //       text: z.string(),
  //     })
  //   )
  //   .query((opts) => {
  //     return {
  //       greeting: `${opts.ctx.user}`,
  //     };
  //   }),
  categories: categoriesRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
