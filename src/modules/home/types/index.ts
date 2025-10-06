import { LucideProps } from "lucide-react";

export type SidebarItem = {
  title: string;
  url: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  auth: boolean;
};
