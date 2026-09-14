import { useMemo } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { AlertTriangle, Activity, CalendarClock, FileText, ArrowRight, Pill, Droplet } from "lucide-react";
import TopBar from "../components/TopBar";
import StatCard from "../components/StatCard";
import TimelineEntry from "../components/TimelineEntry";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { formatDate, timeAgo } from "../utils/format";

export default function PatientDashboard() {
  const { onMenuClick } = useOutletContext();
  const { patientSession } = useAuth();
  const { getPatientById, getReportsForPatient, getActivityForPatient } = useData();

  const patient = getPatientById(patientSession.id);
  const reports = getReportsForPatient(patient.id);
  const activity = getActivityForPatient(patient.id);

  const sortedVisits = useMemo(
    () => [...patient.visits].sort((a, b) => new Date(b.date) - new Date(a.date)),
    [patient.visits]
  );
  const latestVisit = sortedVisits[0];
  const upcomingFollowUp = sortedVisits
    .filter((v) => v.followUp && new Date(v.followUp) >= new Date(new Date().toDateString()))
    .sort((a, b) => new Date(a.followUp) - new Date(b.followUp))[0];

  const firstName = patient.name.split(" ")[0];

  return (
    <>
      <TopBar title="Dashboard" onMenuClick={onMenuClick} />
      <main className="flex-1 px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-3xl animate-fade-in">
          <h2 className="text-xl font-semibold tracking-tight text-ink-primary">Welcome back, {firstName}</h2>
          <p className="mt-1 text-sm text-ink-secondary">Your health journey, connected.</p>

          {patient.allergies.length > 0 && (
            <div className="mt-5 flex items-start gap-3 rounded-md2 border border-status-critical/25 bg-status-criticalSoft px-4 py-3">
              <AlertTriangle size={16} className="mt-0.5 shrink-0 text-status-critical" />
              <div>
                <p className="text-sm font-medium text-ink-primary">
                  Allergic to {patient.allergies.join(", ")}
                </p>
                <p className="mt-0.5 text-xs text-ink-secondary">
                  Make sure every doctor you visit is aware of this before treatment.
                </p>
              </div>
            </div>
          )}

          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            <div className="rounded-md2 border border-border-subtle bg-base-surface p-3 text-center">
              <Droplet size={13} className="mx-auto text-ink-muted" />
              <p className="mt-1.5 text-base font-semibold text-ink-primary">{patient.bloodGroup}</p>
              <p className="text-[10px] text-ink-muted">Blood group</p>
            </div>
            <div className="rounded-md2 border border-border-subtle bg-base-surface p-3 text-center">
              <AlertTriangle size={13} className="mx-auto text-ink-muted" />
              <p className="mt-1.5 text-base font-semibold text-ink-primary">{patient.allergies.length}</p>
              <p className="text-[10px] text-ink-muted">Allergies</p>
            </div>
            <div className="rounded-md2 border border-border-subtle bg-base-surface p-3 text-center">
              <Activity size={13} className="mx-auto text-ink-muted" />
              <p className="mt-1.5 text-base font-semibold text-ink-primary">{patient.visits.length}</p>
              <p className="text-[10px] text-ink-muted">Visits</p>
            </div>
            <div className="rounded-md2 border border-border-subtle bg-base-surface p-3 text-center">
              <FileText size={13} className="mx-auto text-ink-muted" />
              <p className="mt-1.5 text-base font-semibold text-ink-primary">{reports.length}</p>
              <p className="text-[10px] text-ink-muted">Reports</p>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <StatCard
              label="Last Visit"
              value={latestVisit ? formatDate(latestVisit.date) : "—"}
              sub={latestVisit?.hospital}
              icon={Activity}
              accent
            />
            <StatCard
              label="Upcoming Follow-up"
              value={upcomingFollowUp ? formatDate(upcomingFollowUp.followUp) : "None scheduled"}
              icon={CalendarClock}
            />
            <StatCard
              label="Current Medications"
              value={latestVisit?.prescriptions?.length || 0}
              sub={latestVisit?.prescriptions?.[0] || "None active"}
              icon={Pill}
            />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-ink-primary">Medical journey</h3>
                <Link to="/patient/timeline" className="flex items-center gap-1 text-xs text-accent hover:underline">
                  Full timeline
                  <ArrowRight size={12} />
                </Link>
              </div>
              {sortedVisits.slice(0, 2).map((visit, i, arr) => (
                <TimelineEntry
                  key={visit.id}
                  visit={visit}
                  isLatest={i === 0}
                  defaultOpen={i === 0}
                  staggerIndex={i}
                  isLast={i === arr.length - 1}
                  reports={reports}
                />
              ))}
            </div>

            <div className="lg:col-span-2">
              <h3 className="mb-3 text-sm font-semibold text-ink-primary">Recent activity</h3>
              {activity.length === 0 ? (
                <p className="text-xs text-ink-muted">Nothing new yet — updates from your care team will show up here.</p>
              ) : (
                <div className="space-y-2.5">
                  {activity.slice(0, 6).map((a) => (
                    <div key={a.id} className="flex items-start gap-2.5 text-xs">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink-muted" />
                      <div>
                        <p className="text-ink-secondary">{a.message}</p>
                        <p className="mt-0.5 text-[11px] text-ink-muted">{timeAgo(a.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
