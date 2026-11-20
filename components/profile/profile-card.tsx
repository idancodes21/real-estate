import type { ComponentType } from "react";
import Image from "next/image";
import { Camera, Mail, MapPin, MoreHorizontal, Phone } from "lucide-react";

import type { ProfileUser } from "@/lib/profile";

function InfoField({
  label,
  icon: Icon,
  value,
}: {
  label: string;
  icon: ComponentType<{ className?: string }>;
  value?: string | null;
}) {
  return (
    <div className="min-w-0 space-y-1.5">
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="flex h-11 items-center gap-3 rounded-lg border border-border bg-card px-3 text-sm">
        <Icon className="size-4 shrink-0 text-foreground" />
        {value ? (
          <span className="truncate text-foreground">{value}</span>
        ) : (
          <span className="text-muted-foreground">Not set</span>
        )}
      </div>
    </div>
  );
}

export default function ProfileCard({ user }: { user: ProfileUser }) {
  const { name, email, phone, avatar, role, profile } = user;

  const address = [
    profile?.address,
    profile?.city,
    profile?.state,
    profile?.country,
  ]
    .filter(Boolean)
    .join(", ");

  const roleLabel = role.charAt(0) + role.slice(1).toLowerCase(); // ADMIN → Admin
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <section className="rounded-xl bg-card p-4 text-card-foreground sm:p-5">
      <div className="flex flex-col gap-6 md:flex-row md:gap-12">
        {/* Cover + avatar */}
        <div className="relative mb-8 shrink-0 md:mb-0 md:w-[290px]">
          {/* Placeholder: swap for the artwork exported from Figma */}
          <div className="relative h-56 overflow-hidden rounded-lg bg-linear-to-br from-sky-300 via-violet-300 to-amber-200 md:h-[272px]">
            <button
              type="button"
              className="absolute bottom-3 left-3 flex items-center gap-2 rounded-md bg-card/90 px-3 py-2 text-xs font-medium text-foreground backdrop-blur transition-colors hover:bg-card"
            >
              <Camera className="size-4 text-muted-foreground" />
              Change Photo
            </button>
          </div>

          <div className="absolute bottom-0 left-1/2 size-16 -translate-x-1/2 translate-y-1/2 overflow-hidden rounded-full border-4 border-card bg-muted md:bottom-auto md:left-auto md:right-0 md:top-8 md:size-[68px] md:translate-x-1/2 md:translate-y-0">
            {avatar ? (
              <Image
                src={avatar}
                alt={name}
                fill
                sizes="68px"
                className="object-cover"
              />
            ) : (
              <span className="flex size-full items-center justify-center text-lg font-semibold text-muted-foreground">
                {initials}
              </span>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="min-w-0 flex-1 md:pt-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-medium text-foreground">{name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{roleLabel}</p>
            </div>

            <button
              type="button"
              aria-label="Profile actions"
              className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <MoreHorizontal className="size-4" />
            </button>
          </div>

          <div className="mt-6 grid max-w-xl gap-x-5 gap-y-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <InfoField label="Address" icon={MapPin} value={address} />
            </div>
            <InfoField label="Phone Number" icon={Phone} value={phone} />
            <InfoField label="Email" icon={Mail} value={email} />
          </div>
        </div>
      </div>
    </section>
  );
}