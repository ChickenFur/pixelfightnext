import { GarphSchema } from "garph";

export const g = new GarphSchema();

export const worldsGQL = g.type("worlds", {
  id: g.string(),
  name: g.string(),
  createdAt: g.int(),
});

export const queryType = g.type("Query", {
  getWorlds: g.ref(worldsGQL).list().description("Get all worlds"),
});

export const mutationType = g.type("Mutation", {
  addWorld: g
    .ref(worldsGQL)
    .args({ name: g.string() })
    .description("Add a new world"),
  removeWorld: g
    .ref(worldsGQL)
    .args({ id: g.string() })
    .description("Remove a world"),
});
