"use client";

import ResponsiveModal from "@/components/responsive-modal";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { trpc } from "@/trpc/client";
import { IconPlus } from "@tabler/icons-react";
import { toast } from "sonner";

interface StudioUploadModelProps {}

const StudioUploadModel = ({}: StudioUploadModelProps) => {
  const utils = trpc.useUtils();
  const create = trpc.video.create.useMutation({
    onSuccess: () => {
      toast.success("Video created successfully");
      utils.studio.getMany.invalidate();
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return (
    <>
      <ResponsiveModal
        title="Upload"
        open={!!create.data}
        onOpenChange={(open) => {
          if (!open) create.reset();
        }}
      >
        <p>Test modal</p>
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
