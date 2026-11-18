import type { Metadata } from "next";

import ReviewCard from "@/components/review/review-card";
import ReviewTabs from "@/components/review/review-tabs";
import Pagination from "@/components/pagination";

import {
  REVIEW_PAGE_SIZE,
  getReviews,
  parseReviewFilters,
} from "@/lib/reviews";

export const metadata: Metadata = {
  title: "Review List",
};

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ReviewPage({ searchParams }: PageProps) {
  const filters = parseReviewFilters(await searchParams);
  const { items, total, page, pageCount } = await getReviews(filters);

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-foreground">Review List</h1>

      <ReviewTabs active={filters.tab} />

      {items.length === 0 ? (
        <p className="rounded-xl bg-card py-16 text-center text-sm text-muted-foreground">
          No reviews here yet.
        </p>
      ) : (
        <div className="space-y-4">
          {items.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}

      <Pagination
        page={page}
        pageCount={pageCount}
        total={total}
        pageSize={REVIEW_PAGE_SIZE}
        basePath="/review"
        noun="reviews"
        params={{ tab: filters.tab === "all" ? undefined : filters.tab }}
      />
    </div>
  );
}