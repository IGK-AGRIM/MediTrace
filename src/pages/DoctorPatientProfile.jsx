import { useState, useMemo } from "react";
import { useParams, useOutletContext, Link } from "react-router-dom";
import { Plus, ArrowLeft, FileText, NotebookPen, Pill, CalendarClock, Building2 } from "lucide-react";
import TopBar from "../components/TopBar";
import PatientHeader from "../components/PatientHeader";
import Timeline from "../components/Timeline";
import ReportCard from "../components/ReportCard";
import ReportPreviewModal from "../components/ReportPreviewModal";
import AddVisitModal from "../components/AddVisitModal";
import EmptyState from "../components/EmptyState";
import NoteCard from "../components/NoteCard";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { formatDate } from "../utils/format";

export default function DoctorPatientProfile() {
  const { id } = useParams();
  const { onMenuClick } = useOutletContext();
  const { getPatientById, getReportsForPatient, getSelfLogsForPatient, addVisit } = useData();
  const { doctorSession } = useAuth();
  const { showToast } = useToast();
  const [addOpen, setAddOpen] = useState(false);
  const [previewReport, setPreviewReport] = useState(null);

  const patient = getPatientById(id);

  const sortedVisits = useMemo(
    () => (patient ? [...patient.visits].sort((a, b) => new Date(b.date) - new Date(a.date)) : []),
    [patient]
  );

  const groupedReports = useMemo(() => {
    if (!patient) return [];
    const reports = getReportsForPatient(patient.id);
    const map = new Map();
    reports.forEach((r) => {
      const key = r.category || "Other";
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(r);
    });
    return Array.from(map.entries());
  }, [patient, getReportsForPatient]);

  const providers = useMemo(() => {
    if (!patient) return [];
    const map = new Map();
    patient.visits.forEach((v) => {
      const year = v.date.slice(0, 4);
      if (!map.has(v.hospital) || year > map.get(v.hospital)) map.set(v.hospital, year);
    });
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [patient]);

  if (!patient) {
    return (
      <>
        <TopBar title="Patient not found" onMenuClick={onMenuClick} />
        <main className="flex-1 px-4 py-10 sm:px-6">
          <EmptyState title="No patient record found." message="This patient may have been removed from the demo data." />
        </main>
      </>
    );
  }

  const reports = getReportsForPatient(patient.id);
  const selfLogs = getSelfLogsForPatient(patient.id);
  const latestVisit = sortedVisits[0] || null;
  const todayStr = new Date().toISOString().slice(0, 10);
  const nextFollowUp = sortedVisits
    .filter((v) => v.followUp && v.followUp >= todayStr)
    .sort((a, b) => new Date(a.followUp) - new Date(b.followUp))[0];

  const handleSaveVisit = (visitData, reportTitles) => {
    addVisit(patient.id, visitData, reportTitles);
    setAddOpen(false);
    showToast(`New visit added for ${patient.name}.`, "success");
  };

  return (
    <>
      <TopBar
        title={patient.name}
        subtitle={patient.patientId}
        onMenuClick={onMenuClick}
        right={
          <button
            onClick={() => setAddOpen(true)}
            className="flex items-center gap-1.5 rounded-md bg-accent px-3 py-2 text-xs font-medium text-base-bg transition-fast hover:scale-[1.02] hover:bg-accent-dim active:scale-[0.98]"
          >
            <Plus size={14} strokeWidth={2.5} />
            Add Visit
          </button>
        }
      />
      <main className="flex-1 px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-3xl animate-fade-in">
          <Link
            to="/doctor/patients"
            className="mb-4 inline-flex items-center gap-1.5 text-xs text-ink-muted transition-fast hover:text-ink-secondary"
          >
            <ArrowLeft size={12.5} />
            All patients
          </Link>

          <PatientHeader patient={patient} lastUpdated={latestVisit?.date} />

          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            <div className="rounded-md2 border border-border-subtle bg-base-surface p-3">
              <p className="flex items-center gap-1.5 text-[10px] text-ink-muted">
                <Pill size={11} /> Current medications
              </p>
              <p className="mt-1 text-xs leading-snug text-ink-primary">
                {latestVisit?.prescriptions?.length ? latestVisit.prescriptions.length + " active" : "None recorded"}
              </p>
            </div>
            <div className="rounded-md2 border border-border-subtle bg-base-surface p-3">
              <p className="flex items-center gap-1.5 text-[10px] text-ink-muted">
                <CalendarClock size={11} /> Next follow-up
              </p>
              <p className="mt-1 text-xs leading-snug text-ink-primary">
                {nextFollowUp ? formatDate(nextFollowUp.followUp) : "None scheduled"}
              </p>
            </div>
            <div className="rounded-md2 border border-border-subtle bg-base-surface p-3">
              <p className="flex items-center gap-1.5 text-[10px] text-ink-muted">
                <Building2 size={11} /> Providers seen
              </p>
              <p className="mt-1 text-xs leading-snug text-ink-primary">{providers.length}</p>
            </div>
            <div className="rounded-md2 border border-border-subtle bg-base-surface p-3">
              <p className="flex items-center gap-1.5 text-[10px] text-ink-muted">Total visits</p>
              <p className="mt-1 text-xs leading-snug text-ink-primary">{patient.visits.length}</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="mb-4 text-sm font-semibold text-ink-primary">Medical Journey</h3>
            <Timeline visits={patient.visits} reports={reports} onOpenReport={setPreviewReport} />
          </div>

          {providers.length > 0 && (
            <div className="mt-10">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink-primary">
                <Building2 size={15} className="text-ink-muted" />
                Connected Providers
              </h3>
              <div className="flex flex-wrap gap-2">
                {providers.map(([hospital, year]) => (
                  <span
                    key={hospital}
                    className="rounded-md2 border border-border-subtle bg-base-surface px-3 py-1.5 text-xs text-ink-secondary"
                  >
                    {hospital} <span className="text-ink-muted">· {year}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink-primary">
              <FileText size={15} className="text-ink-muted" />
              Reports
            </h3>
            {reports.length === 0 ? (
              <EmptyState icon={FileText} title="No reports uploaded yet." />
            ) : (
              <div className="space-y-5">
                {groupedReports.map(([cat, items]) => (
                  <div key={cat}>
                    <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wide text-ink-muted">{cat}</p>
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {items.map((r) => (
                        <ReportCard key={r.id} report={r} onOpen={setPreviewReport} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {selfLogs.length > 0 && (
            <div className="mt-10">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink-primary">
                <NotebookPen size={15} className="text-ink-muted" />
                Patient Notes
              </h3>
              <div className="space-y-2.5">
                {selfLogs.map((log) => (
                  <NoteCard key={log.id} log={log} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <AddVisitModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSave={handleSaveVisit}
        doctorName={doctorSession?.name}
      />
      <ReportPreviewModal report={previewReport} patient={patient} onClose={() => setPreviewReport(null)} />
    </>
  );
}
