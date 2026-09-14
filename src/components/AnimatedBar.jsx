import { useEffect, useState } from "react";

export function AnimatedBar({ label, value, max, colorClass = "bg-accent" }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(max ? Math.min((value / max) * 100, 100) : 0), 60);
    return () => clearTimeout(t);
  }, [value, max]);

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="text-ink-secondary">{label}</span>
        <span className="font-medium text-ink-primary">{value}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <div className={`h-full rounded-full ${colorClass} transition-all duration-700 ease-out`} style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

export function VerticalBar({ label, value, max, colorClass = "bg-accent" }) {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setHeight(max ? Math.max((value / max) * 100, 4) : 4), 60);
    return () => clearTimeout(t);
  }, [value, max]);

  return (
    <div className="flex flex-1 flex-col items-center gap-2">
      <span className="text-xs font-medium text-ink-primary">{value}</span>
      <div className="flex h-28 w-full items-end justify-center">
        <div
          className={`w-6 rounded-t-sm ${colorClass} transition-all duration-700 ease-out sm:w-8`}
          style={{ height: `${height}%` }}
        />
      </div>
      <span className="text-[11px] text-ink-muted">{label}</span>
    </div>
  );
}
