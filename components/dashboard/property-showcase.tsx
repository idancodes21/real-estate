"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronLeft, ChevronRight, MapPin } from "lucide-react";

import type { Property } from "@/app/data/properties";

const tabs = ["Popular", "Recommended", "Newest"] as const;

type SortKey = "recent" | "price-asc" | "price-desc";

function ShowcaseCard({ property }: { property: Property }) {
  const { title, location, price, image } = property;

  return (
    <article className="w-[260px] shrink-0 snap-start sm:w-[280px]">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
        <Image
          src={image}
          alt={title}
          fill
          sizes="280px"
          className="object-cover"
        />
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <h3 className="truncate text-sm font-semibold text-foreground">
            {title}
          </h3>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="size-3.5 shrink-0 text-foreground" />
            <span className="truncate">{location}</span>
          </p>
        </div>

        <span className="shrink-0 rounded-md bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-foreground">
          ${price.toLocaleString("en-US")}
        </span>
      </div>
    </article>
  );
}

export default function PropertyShowcase({
  properties,
}: {
  properties: Property[];
}) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Popular");
  const [sort, setSort] = useState<SortKey>("recent");

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const sorted = useMemo(() => {
    const copy = [...properties];
    if (sort === "price-asc") copy.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") copy.sort((a, b) => b.price - a.price);
    return copy;
  }, [properties, sort]);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const observer = new ResizeObserver(updateArrows);
    observer.observe(el);
    return () => observer.disconnect();
  }, [updateArrows]);

  function scrollByPage(direction: 1 | -1) {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  }

  function handleSortChange(value: SortKey) {
    setSort(value);
    scrollRef.current?.scrollTo({ left: 0 }); 
  }

  return (
    <section className="min-w-0 rounded-xl bg-card p-4 text-card-foreground sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-base font-semibold text-foreground">
          Property List
        </h2>

        <div className="flex flex-wrap items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              aria-pressed={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-md px-3.5 py-2 text-xs font-medium transition-colors ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              {tab}
            </button>
          ))}

          <div className="relative">
            <select
              aria-label="Sort properties"
              value={sort}
              onChange={(e) => handleSortChange(e.target.value as SortKey)}
              className="h-8 appearance-none rounded-md bg-muted py-0 pl-3.5 pr-8 text-xs font-medium text-muted-foreground outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              <option value="recent">Most Recent</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
      </div>

      {sorted.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">
          No properties yet.
        </p>
      ) : (
        <div className="relative mt-5">
          <div
            ref={scrollRef}
            onScroll={updateArrows}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {sorted.map((property) => (
              <ShowcaseCard key={property.id} property={property} />
            ))}
          </div>

          {canPrev && (
            <button
              type="button"
              onClick={() => scrollByPage(-1)}
              aria-label="Scroll left"
              className="absolute left-2 top-[35%] flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md transition-colors hover:bg-accent"
            >
              <ChevronLeft className="size-4" />
            </button>
          )}

          {canNext && (
            <button
              type="button"
              onClick={() => scrollByPage(1)}
              aria-label="Scroll right"
              className="absolute right-2 top-[35%] flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md transition-colors hover:bg-accent"
            >
              <ChevronRight className="size-4" />
            </button>
          )}
        </div>
      )}
    </section>
  );
}