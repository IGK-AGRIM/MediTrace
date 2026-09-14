import { StickyNote } from "lucide-react";

function formatDate(dateStr) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function NoteCard({ log }) {
  return (
    <div className="flex gap-3 rounded-md2 border border-border-subtle bg-base-surface px-4 py-3.5">
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/[0.05] text-ink-muted">
        <StickyNote size={13.5} strokeWidth={2} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium uppercase tracking-wide text-ink-muted">
            Self-reported
          </span>
          <span className="text-[11px] text-ink-muted">· {formatDate(log.date)}</span>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-ink-secondary">{log.note}</p>
      </div>
    </div>
  );
}
