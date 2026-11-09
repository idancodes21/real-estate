"use client";

import {
  LayoutGrid,
  Building2,
  UserCheck,
  Star,
  MessageSquare,
  User,
} from "lucide-react";
import { ComponentType } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavItem {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

const homeNav: NavItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutGrid },
  { label: "Property", href: "/property", icon: Building2 },
  { label: "Agent", href: "/agent", icon: UserCheck },
  { label: "Review", href: "/review", icon: Star },
  { label: "Message", href: "/message", icon: MessageSquare },
  { label: "My Profile", href: "/profile", icon: User },
];

const SideNav = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar p-4">
      <nav className="mt-6 flex flex-col gap-2">
        {homeNav.map((item) => {
          const isActive = pathname === item.href;
          const IconComponent = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-colors ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md shadow-sidebar-primary/20"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
              }`}
            >
              <IconComponent className="size-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default SideNav;