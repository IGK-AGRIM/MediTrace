import { FileText, Download, Printer, ShieldCheck } from "lucide-react";
import Modal from "./Modal";
import Logo from "./Logo";
import { formatDate } from "../utils/format";

export default function ReportPreviewModal({ report, patient, onClose }) {
  if (!report) return null;
  return (
    <Modal open={!!report} onClose={onClose} title="Document preview" width="max-w-lg">
      <div className="overflow-hidden rounded-md border border-border-soft bg-base-bg">
        <div className="flex items-center justify-between border-b border-border-subtle px-4 py-3">
          <Logo size="sm" />
          <span className="flex items-center gap-1 text-[10px] text-ink-muted">
            <ShieldCheck size={11} />
            Simulated document · demo data
          </span>
        </div>

        <div className="px-4 py-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-semibold text-ink-primary">{report.title}</h3>
              <p className="mt-0.5 text-xs text-ink-muted">{report.category || report.type}</p>
            </div>
            <span className="rounded-full bg-white/[0.05] px-2.5 py-1 text-[10px] font-medium text-ink-secondary">
              Final
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-y-2 border-y border-border-subtle py-3 text-xs">
            {patient && (
              <>
                <span className="text-ink-muted">Patient</span>
                <span className="text-right text-ink-primary">
                  {patient.name} ({patient.patientId})
                </span>
              </>
            )}
            <span className="text-ink-muted">Hospital</span>
            <span className="text-right text-ink-primary">{report.hospital}</span>
            {report.doctor && (
              <>
                <span className="text-ink-muted">Doctor</span>
                <span className="text-right text-ink-primary">{report.doctor}</span>
              </>
            )}
            <span className="text-ink-muted">Date</span>
            <span className="text-right text-ink-primary">{formatDate(report.date, { day: "numeric", month: "long", year: "numeric" })}</span>
          </div>

          <div className="mt-3">
            <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-ink-muted">Findings</p>
            <p className="text-sm leading-relaxed text-ink-secondary">{report.summary}</p>
          </div>

          <div className="mt-5 flex h-16 items-center justify-center rounded border border-dashed border-border-soft text-ink-muted">
            <FileText size={16} strokeWidth={1.5} className="mr-2" />
            <span className="text-[11px]">End of document</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2">
        <button
          disabled
          title="Not available in this prototype"
          className="flex cursor-not-allowed items-center gap-1.5 rounded-md border border-border-subtle px-3 py-1.5 text-xs text-ink-muted"
        >
          <Printer size={12.5} />
          Print
        </button>
        <button
          disabled
          title="Not available in this prototype"
          className="flex cursor-not-allowed items-center gap-1.5 rounded-md border border-border-subtle px-3 py-1.5 text-xs text-ink-muted"
        >
          <Download size={12.5} />
          Download
        </button>
      </div>
    </Modal>
  );
}
