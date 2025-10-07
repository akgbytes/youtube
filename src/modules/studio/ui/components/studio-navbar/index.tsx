import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import AuthButton from "@/modules/auth/ui/components/auth-button";
import { ThemeToggle } from "@/components/theme-toggle";
import AppLogo from "@/components/app-logo";
import StudioUploadModel from "../studio-upload-model";

const StudioNavbar = () => {
  return (
    <nav className="fixed top-0 right-0 left-0 h-16 z-50 px-2 sm:px-4 pr-5 flex items-center bg-background border-b shadow-md">
      <div className="flex items-center gap-4 w-full">
        {/* Menu and Logo */}
        <div className="flex items-center shrink-0">
          <SidebarTrigger />
          <Link href="/studio">
            <div className="flex items-center gap-1 p-4">
              <AppLogo />
              <h3 className="font-semibold text-xl tracking-tight">Studio</h3>
            </div>
          </Link>
        </div>

        {/* Space */}
        <div className="flex-1" />

        {/* Auth button */}
        <div className="flex items-center gap-4 shrink-0">
          <StudioUploadModel />
          <ThemeToggle />
          <AuthButton />
        </div>
      </div>
    </nav>
  );
};

export default StudioNavbar;
