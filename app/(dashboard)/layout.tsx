import Navbar from "@/components/Navbar";
import SideNav from "@/components/SideNav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Navbar />
      <div className="flex min-h-0 flex-1">
        <SideNav />
        <main className="min-w-0 flex-1 overflow-y-auto bg-background p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}