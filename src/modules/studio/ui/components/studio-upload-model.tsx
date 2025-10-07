"use client";

import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";

interface StudioUploadModelProps {}

const StudioUploadModel = ({}: StudioUploadModelProps) => {
  return (
    <Button variant="secondary">
      <IconPlus />
      Create
    </Button>
  );
};

export default StudioUploadModel;
