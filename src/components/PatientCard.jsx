import { useNavigate } from "react-router-dom";
import { AlertTriangle, ChevronRight } from "lucide-react";
import Avatar from "./Avatar";

function formatDate(dateStr) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function PatientCard({ patient }) {
  const navigate = useNavigate();
  const latestVisit = [...patient.visits].sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  return (
    <button
      onClick={() => navigate(`/doctor/patient/${patient.id}`)}
      className="flex w-full items-center gap-3.5 rounded-md2 border border-border-subtle bg-base-surface px-4 py-3.5 text-left transition-fast hover:border-border-soft hover:bg-base-elevated"
    >
      <Avatar seed={patient.patientId} name={patient.name} size="md" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-medium text-ink-primary">{patient.name}</p>
          {patient.allergies.length > 0 && (
            <AlertTriangle size={12.5} className="shrink-0 text-status-critical" />
          )}
        </div>
        <p className="mt-0.5 truncate text-xs text-ink-muted">
          {patient.patientId} · {latestVisit ? `${latestVisit.diagnosis}, ${formatDate(latestVisit.date)}` : "No visits yet"}
        </p>
      </div>
      <ChevronRight size={16} className="shrink-0 text-ink-muted" />
    </button>
  );
}
