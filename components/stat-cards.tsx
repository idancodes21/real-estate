import StatCard from "./stat-card";

const stats = [
  { label: "Properties for Sale", value: 684, percent: 75, color: "var(--chart-1)" },
  { label: "Properties for Rent", value: 546, percent: 70, color: "var(--chart-2)" },
  { label: "Total Customer", value: 5732, percent: 75, color: "var(--chart-3)" },
  { label: "Total City", value: 90, percent: 85, color: "var(--chart-4)" },
];

export default function StatCards() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </section>
  );
}