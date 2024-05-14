import { Infer } from "garph";
import { request, gql } from "graphql-request";

import { worldsGQL } from "@/server/gql/schema";
import ListItem from "./ListItem";
import { removeWorld } from "./actions";
import { Key } from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
const query = gql`
  query getWorlds {
    getWorlds {
      id
      name
      createdAt
    }
  }
`;

interface QueryData {
  getWorlds: Array<Infer<typeof worldsGQL>>;
}

export default async function List() {
  const { getWorlds } = await request<QueryData>(
    "http://localhost:3000/api/graphql",
    query
  );

  return (
    <ul className="space-y-4">
      {getWorlds?.map((todo, index) => {
        console.log("the index is", index);
        return (
          <ListItem
            key={index as Key}
            name={todo.name}
            worldId={todo.id}
            removeItem={removeWorld}
          />
        );
      })}
    </ul>
  );
}
