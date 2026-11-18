import { reviews as seed, type Review, type ReviewStatus } from "@/app/data/reviews";

export const REVIEW_PAGE_SIZE = 5;

export type ReviewTab = "all" | "published" | "deleted";

const tabStatus: Record<ReviewTab, ReviewStatus | undefined> = {
  all: undefined,
  published: "PUBLISHED",
  deleted: "DELETED",
};

export interface ReviewFilters {
  tab: ReviewTab;
  page: number;
}

const globalForReviews = globalThis as unknown as { __reviews?: Review[] };
const store = (globalForReviews.__reviews ??= structuredClone(seed));

type RawParams = Record<string, string | string[] | undefined>;

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

// URL input is untrusted, same rule as parseFilters for properties
export function parseReviewFilters(params: RawParams): ReviewFilters {
  const tab = first(params.tab);
  const page = Number(first(params.page));

  return {
    tab: tab === "published" || tab === "deleted" ? tab : "all",
    page: Number.isInteger(page) && page > 0 ? page : 1,
  };
}

export async function getReviews(filters: { tab: ReviewTab; page: number }) {
  // Filter by tab
  const status = tabStatus[filters.tab];
  const matches = store.filter((r) => !status || r.status === status);

  //  Count, and keep the page number valid
  const total = matches.length;
  const pageCount = Math.max(1, Math.ceil(total / REVIEW_PAGE_SIZE));
  const page = Math.min(filters.page, pageCount);

  const items = matches.slice(
    (page - 1) * REVIEW_PAGE_SIZE,
    page * REVIEW_PAGE_SIZE,
  );

  return { items, total, page, pageCount };
}

export async function setReviewStatus(id: string, status: ReviewStatus) {
  const review = store.find((r) => r.id === id);
  if (review) review.status = status;
}