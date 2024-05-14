"use server";

import { revalidatePath } from "next/cache";
import { GraphQLClient, gql } from "graphql-request";

const mutation = gql`mutation { removeWorld($id: String!) { removeTodo(id:$id) {id}} }`;

export async function removeWorld(id: string) {
  const client = new GraphQLClient("/api/graphql");
  return client.request(mutation, { id });
  revalidatePath("/");
}
