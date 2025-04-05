import { SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

const Topbar = () => {
  const { isAdmin } = useAuthStore();
  console.log({ isAdmin });

  return (
    <div
      className="flex items-center justify-between p-4 sticky top-0 bg-gradient-to-r from-indigo-900/80 to-purple-900/80 
      backdrop-blur-md z-10 border-b border-purple-800/30 shadow-lg shadow-purple-500/10
    ">
      <div className="flex gap-2 items-center">
        <img src="/spotify.png" className="size-8 drop-shadow-md" alt="Spotify logo" />
        <span className="text-lg font-bold text-white">Songify</span>
      </div>
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link
            to={"/admin"}
            className={cn(buttonVariants({ variant: "outline" }), "border-purple-700/50 bg-purple-950/30 hover:bg-purple-900/50 text-purple-200 shadow-sm shadow-purple-500/20")}
          >
            <LayoutDashboardIcon className="size-4 mr-2" />
            Admin Dashboard
          </Link>
        )}

        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  );
};
export default Topbar;
