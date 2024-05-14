import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

type users = string[];
type worldState = number[][];

export const worlds = sqliteTable("worlds", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: integer("created_at").notNull(),
});

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  displayName: text("display_name").notNull(),
  email: text("email").notNull(),
  createdAt: integer("created_at").notNull(),
});

export const worldUsers = sqliteTable("world_users", {
  worldId: text("world_id")
    .notNull()
    .references(() => worlds.id),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
});

export const worldState = sqliteTable("world_state", {
  worldId: text("world_id")
    .notNull()
    .references(() => worlds.id),
  state: text("state", { mode: "json" }).$type<worldState>(),
  iterations: integer("iterations").notNull(),
});

export const userColors = sqliteTable("user_colors", {
  worldId: text("world_id")
    .notNull()
    .references(() => worlds.id),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
  color: text("color").notNull(),
});
