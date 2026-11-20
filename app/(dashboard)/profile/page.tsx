import type { Metadata } from "next";
import { redirect } from "next/navigation";

import PropertyShowcase from "@/components/dashboard/property-showcase";
import ProfileCard from "@/components/profile/profile-card";
import { getProfile } from "@/lib/profile";
import { getLatestProperties } from "@/app/data/properties";

export const metadata: Metadata = {
  title: "My Profile",
};

export default async function ProfilePage() {
  const [user, properties] = await Promise.all([
    getProfile(),
    getLatestProperties(8),
  ]);

  if (!user) redirect("/login");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
      <ProfileCard user={user} />
      <PropertyShowcase properties={properties} />
    </div>
  );
}