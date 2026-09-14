import { useMemo, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { CalendarClock, ArrowRight, CheckCircle2 } from "lucide-react";
import TopBar from "../components/TopBar";
import EmptyState from "../components/EmptyState";
import Avatar from "../components/Avatar";
import { useData } from "../context/DataContext";
import { formatDate } from "../utils/format";

const TABS = ["Today", "Upcoming", "Completed"];

export default function DoctorAppointments() {
  const { onMenuClick } = useOutletContext();
  const { patients } = useData();
  const navigate = useNavigate();
  const [tab, setTab] = useState("Today");

  const { today, upcoming, completed } = useMemo(() => {
    const todayStr = new Date().toISOString().slice(0, 10);
    const followUps = patients.flatMap((p) =>
      p.visits
        .filter((v) => v.followUp)
        .map((v) => ({ patient: p, date: v.followUp, reason: `Follow-up: ${v.diagnosis}`, hospital: v.hospital, doctor: v.doctor, key: `f-${v.id}` }))
    );
    const pastVisits = patients
      .flatMap((p) =>
        p.visits.map((v) => ({ patient: p, date: v.date, reason: v.diagnosis, hospital: v.hospital, doctor: v.doctor, key: `v-${v.id}` }))
      )
      .filter((v) => v.date < todayStr)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    return {
      today: followUps.filter((v) => v.date === todayStr).sort((a, b) => a.patient.name.localeCompare(b.patient.name)),
      upcoming: followUps.filter((v) => v.date > todayStr).sort((a, b) => new Date(a.date) - new Date(b.date)),
      completed: pastVisits,
    };
  }, [patients]);

  const list = tab === "Today" ? today : tab === "Upcoming" ? upcoming : completed;

  return (
    <>
      <TopBar title="Appointments" subtitle="Derived from scheduled follow-ups and visit history" onMenuClick={onMenuClick} />
      <main className="flex-1 px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-3xl animate-fade-in">
          <div className="mb-5 inline-flex rounded-md border border-border-subtle bg-base-surface p-1">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded px-3.5 py-1.5 text-xs font-medium transition-fast ${
                  tab === t ? "bg-accent-soft text-accent" : "text-ink-secondary hover:text-ink-primary"
                }`}
              >
                {t}
                {t === "Today" && today.length > 0 && (
                  <span className="ml-1.5 rounded-full bg-accent px-1.5 py-0.5 text-[9px] font-semibold text-base-bg">
                    {today.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {list.length === 0 ? (
            <EmptyState icon={CalendarClock} title={`No ${tab.toLowerCase()} appointments`} />
          ) : (
            <div className="space-y-2">
              {list.map((item) => (
                <button
                  key={item.key}
                  onClick={() => navigate(`/doctor/patient/${item.patient.id}`)}
                  className="flex w-full items-center gap-3.5 rounded-md2 border border-border-subtle bg-base-surface px-4 py-3.5 text-left transition-fast hover:border-border-soft hover:bg-base-elevated"
                >
                  <Avatar seed={item.patient.patientId} name={item.patient.name} size="md" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink-primary">{item.patient.name}</p>
                    <p className="mt-0.5 truncate text-xs text-ink-muted">
                      {item.reason} · {item.hospital}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {tab === "Completed" ? (
                      <CheckCircle2 size={13} className="text-status-good" />
                    ) : (
                      <span className="text-xs font-medium text-accent">{formatDate(item.date)}</span>
                    )}
                    <ArrowRight size={13} className="text-ink-muted" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
