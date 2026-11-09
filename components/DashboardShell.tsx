"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import Navbar from "@/components/Navbar";
import SideNav from "@/components/SideNav";

import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";

import type { getCurrentUser } from "@/lib/get-current-user";

type CurrentUser = NonNullable<
  Awaited<ReturnType<typeof getCurrentUser>>
>;

interface DashboardShellProps {
  children: React.ReactNode;
  user: CurrentUser | null;
}

export default function DashboardShell({
  children,
  user,
}: DashboardShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile sidebar whenever the route changes.
  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Navbar
      onMenuClick={() => setMobileNavOpen(true)}
       user={user}
      />

      <div className="flex min-h-0 flex-1">
        {/* Desktop sidebar */}
        <aside className="hidden w-64 shrink-0 border-r md:block">
          <SideNav />
        </aside>

        {/* Mobile sidebar */}
        <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
          <SheetContent side="left" className="w-72 p-0">
            <SheetTitle className="sr-only">
              Navigation menu
            </SheetTitle>

            <SideNav />
          </SheetContent>
        </Sheet>

        {/* Dashboard content */}
        <main className="min-w-0 flex-1 overflow-y-auto bg-background p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}