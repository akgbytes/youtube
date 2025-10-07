"use client";

import { trpc } from "@/trpc/client";

const PageClient = () => {
  const [data] = trpc.categories.getAll.useSuspenseQuery();
  return (
    <div>
      <h1>I'm on homepage</h1>
      {data.map((name) => (
        <p key={name.id}>{name.name}</p>
      ))}
    </div>
  );
};

export default PageClient;
