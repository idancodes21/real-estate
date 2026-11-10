interface Referral {
  label: string;
  percent: number; 
  color: string;   
}

const referrals: Referral[] = [
  { label: "Social Media", percent: 64, color: "var(--chart-5)" },
  { label: "Marketplaces", percent: 40, color: "var(--chart-3)" },
  { label: "Websites", percent: 50, color: "var(--warning)" },
  { label: "Digital Ads", percent: 80, color: "var(--chart-4)" },
  { label: "Others", percent: 15, color: "var(--destructive)" },
];

export default function PropertyReferrals() {
  return (
    <section className="min-w-0 rounded-xl bg-card p-5 text-card-foreground">
      <h2 className="text-base font-semibold text-foreground">
        Property Referrals
      </h2>

      <ul className="mt-5 space-y-5">
        {referrals.map(({ label, percent, color }) => {
          const clamped = Math.min(100, Math.max(0, percent));

          return (
            <li key={label} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground">{label}</span>
                <span className="font-medium text-foreground">{clamped}%</span>
              </div>

              {/* Track */}
              <div
                role="progressbar"
                aria-label={label}
                aria-valuenow={clamped}
                aria-valuemin={0}
                aria-valuemax={100}
                className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
              >
                {/* Fill */}
                <div
                  className="h-full rounded-full"
                  style={{ width: `${clamped}%`, backgroundColor: color }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}