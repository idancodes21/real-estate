import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Input } from "./ui/input";
import { Bell, Menu, Search } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex h-[70px] w-full items-center justify-between bg-sidebar px-4 md:px-6">
      {/* Left side: Mobile menu toggle, Logo, and Desktop Search */}
      <div className="flex items-center gap-3 md:gap-8">
        {/* Mobile menu button (visible only on small screens) */}
        <button
          type="button"
          className="p-1 text-muted-foreground hover:text-foreground md:hidden"
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-6 w-6" />
        </button>

       <div className="flex gap-40">
         {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-foreground">
          <Image
            src="/logo.png"
            width={32}
            height={32}
            alt="Yariga logo"
            className="h-8 w-auto object-contain"
          />
          <h2 className="hidden sm:inline-block">Yariga</h2>
        </Link>

        {/* Desktop Search */}
        <div className="relative hidden w-full max-w-sm md:block">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
          <Input
            type="search"
            placeholder="Search Property, Customer etc"
            className="h-10 w-[350] rounded-xl border-none bg-zinc-100/80 pl-10 pr-4 text-sm font-normal focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0"
          />
        </div>
       </div>
      </div>

      {/* Right side: Mobile search icon, Notification, and Profile */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Mobile search trigger icon */}
        <button
          type="button"
          className="p-2 text-muted-foreground hover:text-foreground md:hidden"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>

        {/* Notification Bell with Badge */}
        <button
          type="button"
          className="relative rounded-full p-2 text-muted-foreground hover:bg-zinc-100 hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <Image
            width={40}
            height={40}
            alt="Profile picture"
            src="/user-1.png"
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="hidden text-left lg:block">
            <h2 className="text-sm font-bold text-foreground leading-tight">Hawkins Maru</h2>
            <p className="text-xs text-muted-foreground">Company Manager</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;