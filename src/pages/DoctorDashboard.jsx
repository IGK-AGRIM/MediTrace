import { useMemo } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { Users, Activity, CalendarClock, FileText, ArrowRight } from "lucide-react";
import TopBar from "../components/TopBar";
import StatCard from "../components/StatCard";
import SearchPatient from "../components/SearchPatient";
import PatientCard from "../components/PatientCard";
import NetworkVisual from "../components/NetworkVisual";
import EmptyState from "../components/EmptyState";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { formatDate, timeAgo } from "../utils/format";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function DoctorDashboard() {
  const { onMenuClick } = useOutletContext();
  const { doctorSession } = useAuth();
  const { patients, reports, activityLog } = useData();
  const navigate = useNavigate();

  const stats = useMemo(() => {
    const totalVisits = patients.reduce((sum, p) => sum + p.visits.length, 0);
    const thisMonth = new Date().toISOString().slice(0, 7);
    const visitsThisMonth = patients.reduce(
      (sum, p) => sum + p.visits.filter((v) => v.date.startsWith(thisMonth)).length,
      0
    );
    const upcomingFollowUps = patients
      .flatMap((p) => p.visits.filter((v) => v.followUp).map((v) => ({ ...v, patient: p })))
      .filter((v) => new Date(v.followUp) >= new Date(new Date().toDateString()))
      .sort((a, b) => new Date(a.followUp) - new Date(b.followUp));

    return { totalVisits, visitsThisMonth, upcomingFollowUps };
  }, [patients]);

  const recentPatients = useMemo(() => {
    return [...patients]
      .sort((a, b) => {
        const latestA = Math.max(...a.visits.map((v) => new Date(v.date).getTime()), 0);
        const latestB = Math.max(...b.visits.map((v) => new Date(v.date).getTime()), 0);
        return latestB - latestA;
      })
      .slice(0, 6);
  }, [patients]);

  const lastName = doctorSession?.name?.split(" ").slice(-1)[0];

  return (
    <>
      <TopBar title="Overview" onMenuClick={onMenuClick} />
      <main className="flex-1 px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-6xl animate-fade-in">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-ink-primary">
                {greeting()}, Dr. {lastName}.
              </h2>
              <p className="mt-1 text-sm text-ink-secondary">Connected care overview</p>
            </div>
            <span className="flex items-center gap-2 rounded-full border border-border-subtle bg-base-surface px-3 py-1.5 text-[11px] font-medium text-ink-secondary">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-good opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-status-good" />
              </span>
              MediTrace network operational
            </span>
          </div>

          <SearchPatient />

          <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatCard label="Connected Patients" value={patients.length} icon={Users} accent countUp />
            <StatCard label="Visits This Month" value={stats.visitsThisMonth} sub={`${stats.totalVisits} total logged`} icon={Activity} countUp />
            <StatCard label="Reports Added" value={reports.length} icon={FileText} countUp />
            <StatCard label="Follow-ups" value={stats.upcomingFollowUps.length} icon={CalendarClock} countUp />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-ink-primary">Recent patients</h3>
              </div>
              <div className="space-y-2">
                {recentPatients.map((p) => (
                  <PatientCard key={p.id} patient={p} />
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <h3 className="mb-3 text-sm font-semibold text-ink-primary">Connected network</h3>
              <div className="rounded-md2 border border-border-subtle bg-base-surface p-3">
                <NetworkVisual />
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <h3 className="mb-3 text-sm font-semibold text-ink-primary">Upcoming follow-ups</h3>
              {stats.upcomingFollowUps.length === 0 ? (
                <EmptyState icon={CalendarClock} title="No upcoming follow-ups" />
              ) : (
                <div className="space-y-1.5 border-l border-border-subtle pl-4">
                  {stats.upcomingFollowUps.slice(0, 5).map((v) => (
                    <button
                      key={v.id}
                      onClick={() => navigate(`/doctor/patient/${v.patient.id}`)}
                      className="relative flex w-full items-center justify-between gap-3 rounded-md2 border border-border-subtle bg-base-surface px-4 py-3 text-left transition-fast hover:border-border-soft hover:bg-base-elevated"
                    >
                      <span className="absolute -left-[21px] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent" />
                      <div className="min-w-0">
                        <p className="truncate text-sm text-ink-primary">{v.patient.name}</p>
                        <p className="mt-0.5 truncate text-xs text-ink-muted">
                          {v.diagnosis} · {v.hospital}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <span className="text-xs font-medium text-accent">{formatDate(v.followUp)}</span>
                        <ArrowRight size={13} className="text-ink-muted" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-2">
              <h3 className="mb-3 text-sm font-semibold text-ink-primary">Recent activity</h3>
              <div className="space-y-2.5">
                {activityLog.slice(0, 6).map((a) => (
                  <div key={a.id} className="flex items-start gap-2.5 text-xs">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink-muted" />
                    <div>
                      <p className="text-ink-secondary">{a.message}</p>
                      <p className="mt-0.5 text-[11px] text-ink-muted">{timeAgo(a.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
