import StudioLayout from "@/modules/studio/ui/layout/studio-layout";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <StudioLayout>{children}</StudioLayout>;
}
