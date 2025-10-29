import ResponsiveModal from "@/components/responsive-modal";
import { UploadDropzone } from "@/lib/uploadthing";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";

interface ThumbnailUploadModelProps {
  videoId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ThumbnailUploadModel = ({
  videoId,
  open,
  onOpenChange,
}: ThumbnailUploadModelProps) => {
  const utils = trpc.useUtils();

  const onUploadComplete = () => {
    utils.studio.getOne.invalidate({ id: videoId });
    utils.studio.getMany.invalidate();
    onOpenChange(false);
  };

  return (
    <ResponsiveModal
      title="Upload a thumbnail"
      open={open}
      onOpenChange={onOpenChange}
    >
      <UploadDropzone
        endpoint="thumbnailUploader"
        input={{ videoId }}
        onClientUploadComplete={onUploadComplete}
        onUploadError={(error) => {
          console.log("error", error);
          toast.error(error.message);
        }}
        onUploadAborted={() => {
          console.log("hello");
        }}
      />
    </ResponsiveModal>
  );
};

export default ThumbnailUploadModel;
