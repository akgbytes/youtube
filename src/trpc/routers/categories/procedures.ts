import { db } from "@/db";
import { categoriesTable } from "@/db/schema/categories";
import { createTRPCRouter, baseProcedure } from "@/trpc/init";

export const categoriesRouter = createTRPCRouter({
  getAll: baseProcedure.query(async () => {
    const data = await db.select().from(categoriesTable);

    return data;
  }),
});
