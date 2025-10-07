import { HydrateClient, trpc } from "@/trpc/server";
import HomeView from "@/modules/home/ui/views/home-view";

/**
 * By default, Next.js tries to statically optimize pages means it renders them at build time
 * but since we're calling `trpc.categories.getAll.prefetch()` we need to disable static
 * optimization and force this page to render on the server at request time.
 */

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    categoryId?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { categoryId } = await searchParams;

  await trpc.categories.getAll.prefetch();

  return (
    <HydrateClient>
      <HomeView categoryId={categoryId} />
    </HydrateClient>
  );
}
