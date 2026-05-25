import type { Metadata } from "next";

import UserProfile from "./user-profile";

export const metadata: Metadata = {
  title: "User",
};

export default function UserPage() {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-4 py-16 dark:bg-black">
      <UserProfile />
    </div>
  );
}

