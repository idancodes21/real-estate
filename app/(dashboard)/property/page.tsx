import type { Metadata } from "next";

import PropertyList from "@/components/property/property-list";
import { properties } from "@/app/data/properties";

export const metadata: Metadata = {
  title: "Property List",
};

export default function PropertyPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">Property List</h1>

        <button
          type="button"
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          + Add Property
        </button>
      </div>

      <section className="rounded-xl bg-card p-4 sm:p-5">
        {/* Filter bar goes here next */}
        <PropertyList properties={properties} />
      </section>
    </div>
  );
}