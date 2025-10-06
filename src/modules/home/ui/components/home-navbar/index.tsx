import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import SearchInput from "./search-input";
import AuthButton from "@/modules/auth/ui/components/auth-button";

const HomeNavbar = () => {
  return (
    <nav className="fixed top-0 right-0 left-0 h-16 z-50 px-2 sm:px-4 pr-5 flex items-center bg-background">
      <div className="flex items-center gap-4 w-full">
        {/* Menu and Logo */}
        <div className="flex items-center shrink-0">
          <SidebarTrigger />
          <Link href="/">
            <div className="flex items-center gap-1 p-4">
              <Image src="/logo.svg" height={32} width={32} alt="logo" />
              <h3 className="font-semibold text-xl tracking-tight">YouTube</h3>
            </div>
          </Link>
        </div>

        {/* Search bar */}
        <div className="flex flex-1 justify-center mx-auto max-w-[720px]">
          <SearchInput />
        </div>

        {/* Auth button */}
        <div className="flex items-center gap-4 shrink-0">
          <AuthButton />
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
