"use client";
import { Button } from "@/components/ui/button";
import { UserCircleIcon } from "lucide-react";

import { UserButton, SignedOut, SignedIn, SignInButton } from "@clerk/nextjs";

const AuthButton = () => {
  return (
    <>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button
            variant="outline"
            className="px-4 py-2 text-sm font-medium rounded-full shadow-none text-blue-600 hover:text-blue-500 border-blue-500/20"
          >
            <UserCircleIcon />
            Sign in
          </Button>
        </SignInButton>
      </SignedOut>
    </>
  );
};

export default AuthButton;
