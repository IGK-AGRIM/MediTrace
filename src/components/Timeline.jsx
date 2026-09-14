import { useMemo } from "react";
import TimelineEntry from "./TimelineEntry";
import EmptyState from "./EmptyState";
import { Activity } from "lucide-react";

export default function Timeline({ visits, reports, onOpenReport }) {
  const sorted = useMemo(
    () => [...visits].sort((a, b) => new Date(b.date) - new Date(a.date)),
    [visits]
  );

  const grouped = useMemo(() => {
    const map = new Map();
    sorted.forEach((v) => {
      const year = v.date.slice(0, 4);
      if (!map.has(year)) map.set(year, []);
      map.get(year).push(v);
    });
    return Array.from(map.entries());
  }, [sorted]);

  if (sorted.length === 0) {
    return (
      <EmptyState
        icon={Activity}
        title="No medical history available"
        message="Visits added for this patient will appear here as a connected timeline."
      />
    );
  }

  return (
    <div>
      {grouped.map(([year, visitsInYear]) => (
        <div key={year} className="mb-6 last:mb-0">
          <p className="mb-3 pl-[1px] text-xs font-semibold tracking-wide text-ink-muted">{year}</p>
          {visitsInYear.map((visit) => {
            const globalIndex = sorted.findIndex((v) => v.id === visit.id);
            return (
              <TimelineEntry
                key={visit.id}
                visit={visit}
                isLatest={globalIndex === 0}
                defaultOpen={globalIndex === 0}
                staggerIndex={globalIndex}
                isLast={globalIndex === sorted.length - 1}
                reports={reports}
                onOpenReport={onOpenReport}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
