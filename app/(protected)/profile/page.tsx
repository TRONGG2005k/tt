import type { Metadata } from "next";

import ProfilePanel from "@/components/ProfilePanel";

export const metadata: Metadata = {
  title: "Profile",
};

export default function ProfilePage() {
  return <ProfilePanel />;
}
