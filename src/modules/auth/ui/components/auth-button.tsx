import { Button } from "@/components/ui/button";
import { UserCircleIcon } from "lucide-react";

const AuthButton = () => {
  return (
    <Button
      variant="outline"
      className="px-4 py-2 text-sm font-medium rounded-full shadow-none text-blue-600 hover:text-blue-500 border-blue-500/20"
    >
      <UserCircleIcon />
      Sign in
    </Button>
  );
};

export default AuthButton;
