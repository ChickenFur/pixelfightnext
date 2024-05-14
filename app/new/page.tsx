import Link from "next/link";
import { redirect } from "next/navigation";
import { GraphQLClient, gql } from "graphql-request";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

const mutation = gql`
  mutation addWorld($name: String!) {
    addWorld(name: $name) {
      id
    }
  }
`;

const formValuesSchema = z.object({
  name: z.string().min(3).max(255),
  // id: z.string().optional(),
  // createdAt: z.number().optional(),
});

async function addWorld(formData: FormData) {
  "use server";

  const formValue = {} as any;
  for (const [key, value] of [...formData.entries()]) {
    if (key.includes("ACTION_ID")) continue;
    formValue[key] = value.valueOf();
  }

  const parsed = await formValuesSchema.parseAsync(formValue);

  const graphQLClient = new GraphQLClient("http://localhost:3000/api/graphql");
  await graphQLClient.request(mutation, parsed);
  redirect("/");
}

export default function NewWorld() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl">New World</h1>
      <form action={addWorld}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" className="w-full" required />
        <button type="submit" className="btn">
          Add World
        </button>
      </form>
      <Link href="..">Go Back</Link>
    </div>
  );
}
