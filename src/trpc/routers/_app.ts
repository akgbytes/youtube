import * as z from "zod";
import { createTRPCRouter, protectedProcedure } from "../init";
import { categoriesRouter } from "./categories/procedures";
import { studioRouter } from "./studio/procedures";
import { videosRouter } from "./videos/procedures";
export const appRouter = createTRPCRouter({
  studio: studioRouter,
  video: videosRouter,
  categories: categoriesRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
