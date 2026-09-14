import { useState } from "react";
import { ChevronDown, Stethoscope, Pill, FileText, CalendarClock } from "lucide-react";

const SEVERITY_DOT = {
  mild: "bg-status-good",
  moderate: "bg-status-warn",
  critical: "bg-status-critical",
  normal: "bg-ink-muted",
};

function formatDate(dateStr) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function TimelineEntry({ visit, isLatest, reports, onOpenReport, defaultOpen = false, staggerIndex = 0, isLast = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const dotColor = SEVERITY_DOT[visit.severity] || SEVERITY_DOT.normal;
  const entryReports = (visit.reports || [])
    .map((id) => reports.find((r) => r.id === id))
    .filter(Boolean);
  const entryStyle = { animationDelay: `${Math.min(staggerIndex * 70, 420)}ms`, animationFillMode: "backwards" };

  return (
    <div className="relative flex animate-slide-up gap-4 pb-8 last:pb-0" style={entryStyle}>
      {/* connector line */}
      <div className="relative flex w-3 flex-col items-center">
        <span className="relative mt-1.5 flex h-2.5 w-2.5 shrink-0">
          {isLatest && (
            <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${dotColor} opacity-40`} />
          )}
          <span
            className={`relative inline-flex h-2.5 w-2.5 rounded-full ring-4 ${
              isLatest ? `${dotColor} ring-accent-softer` : `${dotColor} ring-base-bg`
            }`}
          />
        </span>
        {!isLast && (
          <span
            className="mt-1.5 w-px flex-1 origin-top scale-y-0 animate-[growLine_0.5s_ease-out_forwards] bg-border-soft"
            style={{ animationDelay: `${Math.min(staggerIndex * 70, 420) + 120}ms` }}
          />
        )}
      </div>

      {/* content */}
      <div
        className={`flex-1 rounded-md2 border px-4 py-3.5 transition-fast ${
          isLatest
            ? "border-accent/25 bg-accent-softer"
            : "border-border-subtle bg-base-surface"
        }`}
      >
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-start justify-between gap-3 text-left"
        >
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-sm font-semibold text-ink-primary">{visit.diagnosis}</span>
              {isLatest && (
                <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-medium text-accent">
                  Most recent
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-ink-secondary">
              {formatDate(visit.date)} · {visit.hospital}
            </p>
          </div>
          <ChevronDown
            size={16}
            className={`mt-0.5 shrink-0 text-ink-muted transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <div className="mt-3.5 space-y-3.5 border-t border-border-subtle pt-3.5 text-sm animate-fade-in">
            <div className="flex items-start gap-2.5">
              <Stethoscope size={14} className="mt-0.5 shrink-0 text-ink-muted" />
              <div>
                <p className="text-xs font-medium text-ink-secondary">{visit.doctor}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-ink-muted">{visit.symptoms}</p>
              </div>
            </div>

            {visit.notes && (
              <p className="rounded-md bg-white/[0.03] px-3 py-2.5 text-xs leading-relaxed text-ink-secondary">
                {visit.notes}
              </p>
            )}

            {visit.prescriptions?.length > 0 && (
              <div className="flex items-start gap-2.5">
                <Pill size={14} className="mt-0.5 shrink-0 text-ink-muted" />
                <ul className="flex-1 space-y-1">
                  {visit.prescriptions.map((rx, i) => (
                    <li key={i} className="text-xs leading-relaxed text-ink-secondary">
                      {rx}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {entryReports.length > 0 && (
              <div className="flex items-start gap-2.5">
                <FileText size={14} className="mt-0.5 shrink-0 text-ink-muted" />
                <div className="flex flex-1 flex-wrap gap-1.5">
                  {entryReports.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => onOpenReport?.(r)}
                      className="rounded-md border border-border-subtle bg-white/[0.02] px-2.5 py-1 text-xs text-ink-secondary transition-fast hover:border-accent/30 hover:text-accent"
                    >
                      {r.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {visit.followUp && (
              <div className="flex items-center gap-2.5 text-xs text-ink-muted">
                <CalendarClock size={14} className="shrink-0" />
                Follow-up recommended: {formatDate(visit.followUp)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
