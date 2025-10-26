import VideoView from "@/modules/studio/ui/views/video-view";
import { HydrateClient, trpc } from "@/trpc/server";

interface PageProps {
  params: Promise<{ videoId: string }>;
}

export const dynamic = "force-dynamic";

export default async function Page({ params }: PageProps) {
  const { videoId } = await params;
  void trpc.studio.getOne({ id: videoId });

  return (
    <HydrateClient>
      <VideoView videoId={videoId} />
    </HydrateClient>
  );
}
