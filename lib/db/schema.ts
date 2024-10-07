import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const $notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  userId: text("user_id").notNull(),
  editorState: text("editor_state"),
});

export type Note = typeof $notes.$inferSelect;
