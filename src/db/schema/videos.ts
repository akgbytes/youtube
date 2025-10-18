import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./users";
import { categoriesTable } from "./categories";

export const videosTable = pgTable("videos", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  userId: uuid("user_id")
    .references(() => usersTable.id, { onDelete: "cascade" })
    .notNull(),
  categoryId: uuid("category_id").references(() => categoriesTable.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),

  muxStatus: text("mux_status"),
  muxAssetId: text("mux_asset_id").unique(),
  muxUploadId: text("mux_upload_id").unique(),
  muxPlaybackId: text("mux_playback_id").unique(),
  muxTrackId: text("mux_track_id").unique(),
  muxTrackStatus: text("mux_track_status"),
});
