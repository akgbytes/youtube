import { DEFAULT_LIMIT } from "@/constants";
import StudioView from "@/modules/studio/ui/views/studio-view";
import { HydrateClient, trpc } from "@/trpc/server";

interface PageProps {}

export default function Page({}: PageProps) {
  void trpc.studio.getMany.prefetchInfinite({ limit: DEFAULT_LIMIT });

  return (
    <HydrateClient>
      <StudioView />
    </HydrateClient>
  );
}
