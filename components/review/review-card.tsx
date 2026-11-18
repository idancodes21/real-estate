import Image from "next/image";
import { Star } from "lucide-react";

import type { Review } from "@/app/data/reviews";
import { approveReview, rejectReview } from "@/app/(dashboard)/review/actions";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "UTC",
});

const timeFormat = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
  timeZone: "UTC",
});

function Stars({ rating }: { rating: number }) {
  const filled = Math.round(rating);

  return (
    <div
      role="img"
      aria-label={`${rating.toFixed(1)} out of 5 stars`}
      className="flex"
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`size-4 ${
            i < filled ? "fill-warning text-warning" : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  );
}

export default function ReviewCard({ review }: { review: Review }) {
  const { id, name, avatar, joinedAt, rating, title, text, tags, status } =
    review;
  const joined = new Date(joinedAt);

  return (
    <article className="grid gap-4 rounded-xl bg-card p-4 text-card-foreground sm:p-5 md:grid-cols-[210px_minmax(0,1fr)_auto] md:items-center md:gap-6">
      {/* Reviewer */}
      <div className="flex items-start gap-3">
        <div className="relative size-11 shrink-0 overflow-hidden rounded-md bg-muted">
          <Image src={avatar} alt={name} fill sizes="44px" className="object-cover" />
        </div>

        <div className="min-w-0 space-y-0.5">
          <p className="text-xs text-primary">#{id}</p>
          <p className="truncate text-sm font-semibold text-foreground">
            {name}
          </p>
          <p className="text-[11px] leading-snug text-muted-foreground">
            Join On {dateFormat.format(joined).replaceAll("/", "-")}
            <br />
            {timeFormat.format(joined)}
          </p>
        </div>
      </div>

      {/* Review */}
      <div className="min-w-0 space-y-2">
        <h3 className="text-xs text-muted-foreground">{title}</h3>
        <p className="text-xs leading-relaxed text-muted-foreground">{text}</p>

        <ul className="flex flex-wrap gap-2 pt-1">
          {tags.map(({ label, tone }) => (
            <li
              key={label}
              className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase ${
                tone === "positive"
                  ? "border-primary/50 text-primary"
                  : "border-destructive/50 text-destructive"
              }`}
            >
              {label}
            </li>
          ))}
        </ul>
      </div>

      {/* Rating + actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 md:flex-col md:items-end">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-foreground">
            {rating.toFixed(1)}
          </span>
          <Stars rating={rating} />
        </div>

        <div className="flex items-center gap-2">
          {status !== "DELETED" && (
            <form action={rejectReview.bind(null, id)}>
              <button
                type="submit"
                className="rounded-full border border-destructive/50 px-4 py-1 text-[11px] font-medium text-destructive transition-colors hover:bg-destructive/10"
              >
                Reject
              </button>
            </form>
          )}

          {status !== "PUBLISHED" && (
            <form action={approveReview.bind(null, id)}>
              <button
                type="submit"
                className="rounded-full bg-success px-4 py-1 text-[11px] font-medium text-white transition-colors hover:bg-success/90 dark:text-background"
              >
                Approve
              </button>
            </form>
          )}
        </div>
      </div>
    </article>
  );
}