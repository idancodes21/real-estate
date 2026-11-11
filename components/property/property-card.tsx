import Image from "next/image";
import { BedDouble, MapPin, Move } from "lucide-react";

import type { Property } from "@/app/data/properties";

export default function PropertyCard({ property }: { property: Property }) {
  const { title, location, price, beds, area, image } = property;

  return (
    <article className="flex min-w-0 items-center gap-4">
      <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg bg-muted sm:h-[78px] sm:w-[124px]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="124px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0 space-y-1.5">
        <span className="inline-block rounded bg-accent px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">
          ${price.toLocaleString()}
        </span>

        <h3 className="truncate text-sm font-semibold text-foreground">
          {title}
        </h3>

        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="size-3 shrink-0" />
          <span className="truncate">{location}</span>
        </p>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <BedDouble className="size-3.5" />
            {beds} Beds
          </span>
          <span className="flex items-center gap-1.5">
            <Move className="size-3.5" />
            {area}M
          </span>
        </div>
      </div>
    </article>
  );
}