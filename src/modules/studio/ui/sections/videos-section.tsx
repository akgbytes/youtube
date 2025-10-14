"use client";

import { DEFAULT_LIMIT } from "@/app/constants";
import { trpc } from "@/trpc/client";

interface VideosSectionProps {}

const VideosSection = ({}: VideosSectionProps) => {
  const [data] = trpc.studio.getMany.useSuspenseInfiniteQuery(
    {
      limit: DEFAULT_LIMIT,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  return <div>VideosSection</div>;
};

export default VideosSection;
