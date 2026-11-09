import DashboardShell from "@/components/DashboardShell";
import { getCurrentUser } from "@/lib/get-current-user";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <DashboardShell user={user}>
      {children}
    </DashboardShell>
  );
}