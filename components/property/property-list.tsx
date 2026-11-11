import type { Property } from "@/app/data/properties";
import PropertyCard from "./property-card";

export default function PropertyList({
  properties,
}: {
  properties: Property[];
}) {
  if (properties.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        No properties found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-2">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}