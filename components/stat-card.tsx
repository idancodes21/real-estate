interface StatCardProps {
  label: string;
  value: string | number;
  percent: number; 
  color: string;   
}

const RADIUS = 16;
const STROKE = 8;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function StatCard({ label, value, percent, color }: StatCardProps) {
  const clamped = Math.min(100, Math.max(0, percent));
  const drawn = (CIRCUMFERENCE * clamped) / 100;

  return (
    <div className="flex items-center justify-between rounded-xl bg-card px-5 py-6 text-card-foreground">
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-xl font-bold text-foreground">
          {typeof value === "number" ? value.toLocaleString() : value}
        </p>
      </div>

      <svg
        viewBox="0 0 40 40"
        className="size-10 -rotate-90"
        style={{ color }}
        aria-hidden="true"
      >
        {/* Track: faint full circle */}
        <circle
          cx="20"
          cy="20"
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE}
          opacity={0.15}
        />
        {/* Progress: only part of the outline is drawn */}
        <circle
          cx="20"
          cy="20"
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE}
          strokeDasharray={`${drawn} ${CIRCUMFERENCE}`}
        />
      </svg>
    </div>
  );
}