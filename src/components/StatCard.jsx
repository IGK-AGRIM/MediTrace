import { useCountUp } from "../hooks/useCountUp";

export default function StatCard({ label, value, sub, icon: Icon, accent = false, trend, countUp = false }) {
  const isNumber = typeof value === "number";
  const animated = useCountUp(isNumber ? value : 0);
  const display = isNumber && countUp ? animated : value;

  return (
    <div className="rounded-md2 border border-border-subtle bg-base-surface p-4 transition-fast hover:border-border-soft">
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium text-ink-secondary">{label}</span>
        {Icon && (
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-md ${
              accent ? "bg-accent-soft text-accent" : "bg-white/[0.05] text-ink-secondary"
            }`}
          >
            <Icon size={14} strokeWidth={2.25} />
          </span>
        )}
      </div>
      <div className="mt-2.5 flex items-baseline gap-2">
        <span className="text-2xl font-semibold tracking-tight text-ink-primary">{display}</span>
        {trend && <span className="text-[11px] font-medium text-status-good">{trend}</span>}
      </div>
      {sub && <div className="mt-1 text-xs text-ink-muted">{sub}</div>}
    </div>
  );
}
