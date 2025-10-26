"use client";

import ResponsiveModal from "@/components/responsive-modal";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { trpc } from "@/trpc/client";
import { IconPlus } from "@tabler/icons-react";
import { toast } from "sonner";
import StudioUploader from "./studio-uploader";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

interface StudioUploadModelProps {}

const StudioUploadModel = ({}: StudioUploadModelProps) => {
  const router = useRouter();
  const utils = trpc.useUtils();
  const create = trpc.videos.create.useMutation({
    onSuccess: () => {
      toast.success("Video created successfully");
      utils.studio.getMany.invalidate();
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const onSuccess = () => {
    if (!create.data?.video.id) return;

    create.reset();
    router.push(`/studio/videos/${create.data.video.id}`);
  };

  return (
    <>
      <ResponsiveModal
        title="Upload"
        open={!!create.data?.url}
        onOpenChange={(open) => {
          if (!open) create.reset();
        }}
      >
        {create.data?.url ? (
          <StudioUploader endpoint={create.data.url} onSuccess={onSuccess} />
        ) : (
          <Loader2Icon />
        )}
      </ResponsiveModal>
      <Button
        variant="secondary"
        onClick={() => {
          create.mutate();
        }}
        disabled={create.isPending}
      >
        {create.isPending ? <Spinner /> : <IconPlus />}
        <span>Create</span>
      </Button>
    </>
  );
};

export default StudioUploadModel;
