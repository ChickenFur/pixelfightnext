import { InferResolvers } from "garph";
import { YogaInitialContext } from "graphql-yoga";
import { eq } from "drizzle-orm";

import dayjs from "dayjs";
import { mutationType, queryType } from "./schema";
import { db } from "../db/config";
import { worlds } from "../db/schema";

import { v4 as uuidv4 } from "uuid";

type Resolvers = InferResolvers<
  {
    Query: typeof queryType;
    Mutation: typeof mutationType;
  },
  { context: YogaInitialContext }
>;
export const resolvers: Resolvers = {
  Query: {
    getWorlds: (_, __, ctx) => {
      return db.select().from(worlds).all();
    },
  },
  Mutation: {
    addWorld: (_, { name }, ctx) => {
      console.log("I am adding a new world to the db", name);
      return db
        .insert(worlds)
        .values({
          id: uuidv4(),
          name,
          createdAt: dayjs().unix(),
        })
        .returning()
        .get();
    },
    removeWorld: async (_, { id }, ctx) => {
      const world = await db
        .delete(worlds)
        .where(eq(worlds.id, id))
        .returning()
        .get();
      if (!world) {
        throw new Error("World not found");
      }
      return {
        __typename: "worlds",
        ...world,
      };
    },
  },
};
