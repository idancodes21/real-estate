import SideNav from "../components/SideNav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <SideNav />
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
    </div>
  );
}