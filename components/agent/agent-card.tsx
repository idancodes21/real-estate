
import Image from "next/image";
import {
  Building2,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  UserRound,
} from "lucide-react";

export interface AgentCardData {
  id: string;
  designation: string | null;
  experience: number;
  isVerified: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    avatar: string | null;
    profile?: {
      city: string | null;
      country: string | null;
    } | null;
  };
  _count: {
    properties: number;
    inquiries: number;
  };
}

function InfoItem({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <p className="flex min-w-0 items-center gap-2 text-xs text-muted-foreground sm:text-sm">
      <Icon className="size-4 shrink-0" />
      <span className="truncate">{children}</span>
    </p>
  );
}

export default function AgentCard({
  agent,
}: {
  agent: AgentCardData;
}) {
  const { user, designation, _count } = agent;

  const location =
    [user.profile?.city, user.profile?.country]
      .filter(Boolean)
      .join(", ") || "Location not provided";

  return (
    <article className="relative flex gap-4 rounded-xl p-3 transition-shadow hover:shadow-lg hover:shadow-black/5 sm:gap-6">
      <div className="relative flex h-24 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted sm:h-[115px] sm:w-[148px]">
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt={user.name}
            fill
            sizes="148px"
            unoptimized
            className="object-cover"
          />
        ) : (
          <UserRound className="size-10 text-muted-foreground" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate pr-8 text-sm font-semibold text-foreground sm:text-lg">
          {user.name}
        </h3>

        <p className="text-xs text-muted-foreground sm:text-sm">
          {designation || "Real Estate Agent"}
        </p>

        <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:mt-6 sm:grid-cols-2">
          <InfoItem icon={Mail}>{user.email}</InfoItem>
          <InfoItem icon={MapPin}>{location}</InfoItem>
          <InfoItem icon={Phone}>
            {user.phone || "No phone number"}
          </InfoItem>
          <InfoItem icon={Building2}>
            {_count.properties} Properties
          </InfoItem>
        </div>
      </div>

      <button
        type="button"
        aria-label={`Actions for ${user.name}`}
        className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      >
        <MoreHorizontal className="size-4" />
      </button>
    </article>
  );
}
