import { Activity, TestTube, Pill, ClipboardList, FileText } from "lucide-react";
import { formatDate } from "../utils/format";

const CATEGORY_ICON = {
  Imaging: Activity,
  "Lab Reports": TestTube,
  Diagnostics: Activity,
  Prescriptions: Pill,
  "Clinical Notes": ClipboardList,
};

export default function ReportCard({ report, onOpen }) {
  const Icon = CATEGORY_ICON[report.category] || FileText;
  return (
    <button
      onClick={() => onOpen(report)}
      className="flex w-full items-start gap-3.5 rounded-md2 border border-border-subtle bg-base-surface p-4 text-left transition-fast hover:-translate-y-0.5 hover:border-border-soft hover:bg-base-elevated hover:shadow-card"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/[0.05] text-ink-secondary">
        <Icon size={16} strokeWidth={2} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-ink-primary">{report.title}</p>
        <p className="mt-0.5 truncate text-xs text-ink-muted">
          {report.hospital} · {formatDate(report.date)}
        </p>
      </div>
    </button>
  );
}
