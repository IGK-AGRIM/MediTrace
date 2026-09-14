import { useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { Users, Activity, FileText, TrendingUp } from "lucide-react";
import TopBar from "../components/TopBar";
import StatCard from "../components/StatCard";
import { AnimatedBar, VerticalBar } from "../components/AnimatedBar";
import { useData } from "../context/DataContext";
import { HOSPITALS } from "../data/mockData";

const SEVERITY_COLORS = {
  critical: "bg-status-critical",
  moderate: "bg-status-warn",
  mild: "bg-status-good",
  normal: "bg-accent",
};

export default function DoctorAnalytics() {
  const { onMenuClick } = useOutletContext();
  const { patients, reports } = useData();

  const allVisits = useMemo(() => patients.flatMap((p) => p.visits), [patients]);

  const visitsByYear = useMemo(() => {
    const years = ["2023", "2024", "2025", "2026"];
    return years.map((y) => ({ label: y, value: allVisits.filter((v) => v.date.startsWith(y)).length }));
  }, [allVisits]);

  const visitsBySeverity = useMemo(() => {
    const order = ["critical", "moderate", "mild", "normal"];
    return order
      .map((s) => ({ label: s[0].toUpperCase() + s.slice(1), value: allVisits.filter((v) => v.severity === s).length, key: s }))
      .filter((r) => r.value > 0);
  }, [allVisits]);

  const visitsByHospital = useMemo(
    () => HOSPITALS.map((h) => ({ label: h, value: allVisits.filter((v) => v.hospital === h).length })),
    [allVisits]
  );

  const reportsByCategory = useMemo(() => {
    const categories = [...new Set(reports.map((r) => r.category))];
    return categories
      .map((c) => ({ label: c, value: reports.filter((r) => r.category === c).length }))
      .sort((a, b) => b.value - a.value);
  }, [reports]);

  const maxYear = Math.max(...visitsByYear.map((v) => v.value), 1);
  const maxSeverity = Math.max(...visitsBySeverity.map((v) => v.value), 1);
  const maxHospital = Math.max(...visitsByHospital.map((v) => v.value), 1);
  const maxCategory = Math.max(...reportsByCategory.map((v) => v.value), 1);

  const avgVisits = patients.length ? (allVisits.length / patients.length).toFixed(1) : "0";

  return (
    <>
      <TopBar title="Analytics" subtitle="System-level demo statistics" onMenuClick={onMenuClick} />
      <main className="flex-1 px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-5xl animate-fade-in">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatCard label="Total Patients" value={patients.length} icon={Users} accent countUp />
            <StatCard label="Total Visits" value={allVisits.length} icon={Activity} countUp />
            <StatCard label="Total Reports" value={reports.length} icon={FileText} countUp />
            <StatCard label="Avg Visits / Patient" value={avgVisits} icon={TrendingUp} />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-md2 border border-border-subtle bg-base-surface p-5">
              <h3 className="mb-4 text-sm font-semibold text-ink-primary">Visits by year</h3>
              <div className="flex items-end gap-2">
                {visitsByYear.map((v) => (
                  <VerticalBar key={v.label} label={v.label} value={v.value} max={maxYear} />
                ))}
              </div>
            </div>

            <div className="rounded-md2 border border-border-subtle bg-base-surface p-5">
              <h3 className="mb-4 text-sm font-semibold text-ink-primary">Visits by severity</h3>
              <div className="space-y-3.5">
                {visitsBySeverity.map((v) => (
                  <AnimatedBar key={v.key} label={v.label} value={v.value} max={maxSeverity} colorClass={SEVERITY_COLORS[v.key]} />
                ))}
              </div>
            </div>

            <div className="rounded-md2 border border-border-subtle bg-base-surface p-5">
              <h3 className="mb-4 text-sm font-semibold text-ink-primary">Visits by hospital</h3>
              <div className="space-y-3.5">
                {visitsByHospital.map((v) => (
                  <AnimatedBar key={v.label} label={v.label} value={v.value} max={maxHospital} />
                ))}
              </div>
            </div>

            <div className="rounded-md2 border border-border-subtle bg-base-surface p-5">
              <h3 className="mb-4 text-sm font-semibold text-ink-primary">Reports by category</h3>
              <div className="space-y-3.5">
                {reportsByCategory.map((v) => (
                  <AnimatedBar key={v.label} label={v.label} value={v.value} max={maxCategory} colorClass="bg-accent" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
