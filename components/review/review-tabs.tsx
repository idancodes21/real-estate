import Link from "next/link";

import type { ReviewTab } from "@/lib/reviews";

const tabs: { key: ReviewTab; label: string }[] = [
  { key: "all", label: "All Reviews" },
  { key: "published", label: "Published" },
  { key: "deleted", label: "Deleted" },
];

export default function ReviewTabs({ active }: { active: ReviewTab }) {
  return (
    <nav
      aria-label="Review filter"
      className="inline-flex rounded-xl bg-card px-2"
    >
      {tabs.map(({ key, label }) => {
        const isActive = key === active;

        return (
          <Link
            key={key}
            href={key === "all" ? "/review" : `/review?tab=${key}`}
            aria-current={isActive ? "page" : undefined}
            className={`relative px-5 py-3.5 text-xs font-medium transition-colors ${
              isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {label}
            {isActive && (
              <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-primary" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}