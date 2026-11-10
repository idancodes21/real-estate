import DashboardShell from "@/components/DashboardShell";
import { getCurrentUser } from "@/lib/get-current-user";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  // Require authentication
  if (!user) {
    redirect("/login");
  }

  // Only managers can access this dashboard
  if (user.role !== "MANAGER") {
    redirect("/unauthorized");
  }

  return (
    <DashboardShell user={user}>
      {children}
    </DashboardShell>
  );
}