"use client"
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

interface navItem {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}
const homeNav: navItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutGrid,
  },
  {
    label: "Property",
    href: "/property",
    icon: Building2,
  },
  {
    label: "Agent",
    href: "/agent",
    icon: UserCheck,
  },
  {
    label: "Review",
    href: "/review",
    icon: Star,
  },
  {
    label: "Message",
    href: "/message",
    icon: MessageSquare,
  },
  {
    label: "My Profile",
    href: "/profile",
    icon: User,
  },
];
const SideNav = () => {
    const pathname = usePathname();
  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col p-4">
        <nav className="flex flex-col gap-2 mt-6">
                {homeNav.map((item) => {
                    const isActive = pathname === item.href;
                    const IconComponent = item.icon;

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                                isActive
                                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" // Active styling from your image
                                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"  // Inactive styling
                            }`}
                        >
                            <IconComponent className="w-5 h-5" />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
    </aside>
  )
};

export default SideNav;
