"use client";

import { LiHTMLAttributes } from "react";

interface Props extends LiHTMLAttributes<HTMLLIElement> {
  worldId: string;
  name: string;
  removeItem: (id: string) => void;
}

export default function ListItem({
  worldId,
  name,
  removeItem,
  ...rest
}: Props) {
  return (
    <li
      className="card w-96 bg-bas-100 shadow-xl cursor-pointer"
      {...rest}
      onClick={() => removeItem(worldId)}
    >
      <div className="card-body">
        <p>{name}</p>
      </div>
    </li>
  );
}
