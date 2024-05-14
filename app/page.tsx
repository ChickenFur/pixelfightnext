import React, { Suspense } from "react";
import Link from "next/link";
import dayjs from "dayjs";

import List from "./components/list";

export default function Page() {
  return (
    <div className="space-y-6">
      <div className="flex flex-row items-start justify-between max-w-xl">
        <span className="space-y-2">
          <h1 className="text-3xl font-bold">Worlds</h1>
          <p className="text-sm text-neutral-500">
            A list of all the worlds you have created.
          </p>
        </span>
        <Link className="btn" href="/new">
          Create New World
        </Link>

        <List />
      </div>
    </div>
  );
}
