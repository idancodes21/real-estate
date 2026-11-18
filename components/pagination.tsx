import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  pageCount: number;
  total: number;
  pageSize: number;
  basePath: string;
  params?: Record<string, string | undefined>; 
  noun?: string;
}

type PageItem = number | "start-ellipsis" | "end-ellipsis";

function getPageItems(page: number, pageCount: number): PageItem[] {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  const items: PageItem[] = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(pageCount - 1, page + 1);

  if (start > 2) items.push("start-ellipsis");
  for (let p = start; p <= end; p++) items.push(p);
  if (end < pageCount - 1) items.push("end-ellipsis");
  items.push(pageCount);

  return items;
}

export default function Pagination({
  page,
  pageCount,
  total,
  pageSize,
  basePath,
  params = {},
  noun = "properties",
}: PaginationProps) {
  if (total === 0) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  function href(target: number) {
    const search = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value) search.set(key, value);
    }
    if (target > 1) search.set("page", String(target));
    const query = search.toString();
    return query ? `${basePath}?${query}` : basePath;
  }

  const boxClass =
    "flex size-7 items-center justify-center rounded-md text-xs transition-colors";

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-muted-foreground">
        Showing {from} to {to} of {total} {noun}
      </p>

      <nav aria-label="Pagination" className="flex items-center gap-1">
        {page > 1 ? (
          <Link
            href={href(page - 1)}
            aria-label="Previous page"
            className={`${boxClass} text-muted-foreground hover:bg-accent`}
          >
            <ChevronLeft className="size-4" />
          </Link>
        ) : (
          <span className={`${boxClass} text-muted-foreground/40`}>
            <ChevronLeft className="size-4" />
          </span>
        )}

        {getPageItems(page, pageCount).map((item) =>
          typeof item === "string" ? (
            <span key={item} className={`${boxClass} text-muted-foreground`}>
              …
            </span>
          ) : (
            <Link
              key={item}
              href={href(item)}
              aria-current={item === page ? "page" : undefined}
              className={`${boxClass} ${
                item === page
                  ? "bg-primary font-medium text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent"
              }`}
            >
              {item}
            </Link>
          ),
        )}

        {page < pageCount ? (
          <Link
            href={href(page + 1)}
            aria-label="Next page"
            className={`${boxClass} text-muted-foreground hover:bg-accent`}
          >
            <ChevronRight className="size-4" />
          </Link>
        ) : (
          <span className={`${boxClass} text-muted-foreground/40`}>
            <ChevronRight className="size-4" />
          </span>
        )}
      </nav>
    </div>
  );
}