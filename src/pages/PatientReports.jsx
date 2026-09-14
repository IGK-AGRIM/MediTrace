import { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { FileText, Search } from "lucide-react";
import TopBar from "../components/TopBar";
import ReportCard from "../components/ReportCard";
import ReportPreviewModal from "../components/ReportPreviewModal";
import EmptyState from "../components/EmptyState";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";

export default function PatientReports() {
  const { onMenuClick } = useOutletContext();
  const { patientSession } = useAuth();
  const { getReportsForPatient, getPatientById } = useData();
  const [previewReport, setPreviewReport] = useState(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const patient = getPatientById(patientSession.id);
  const allReports = getReportsForPatient(patientSession.id);
  const categories = useMemo(() => ["All", ...new Set(allReports.map((r) => r.category))], [allReports]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allReports
      .filter((r) => (category === "All" ? true : r.category === category))
      .filter((r) => (q ? r.title.toLowerCase().includes(q) : true))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [allReports, query, category]);

  const grouped = useMemo(() => {
    const map = new Map();
    filtered.forEach((r) => {
      const key = r.category || "Other";
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(r);
    });
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <>
      <TopBar title="Reports" subtitle={`${allReports.length} on file`} onMenuClick={onMenuClick} />
      <main className="flex-1 px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-3xl animate-fade-in">
          <div className="mb-4 flex flex-col gap-2.5 sm:flex-row">
            <div className="flex flex-1 items-center gap-2.5 rounded-md2 border border-border-subtle bg-base-surface px-3.5 py-2.5">
              <Search size={14} className="text-ink-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search reports…"
                className="flex-1 bg-transparent text-sm text-ink-primary placeholder:text-ink-muted focus:outline-none"
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-md2 border border-border-subtle bg-base-surface px-3 py-2.5 text-sm text-ink-secondary focus:border-accent/40 focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {filtered.length === 0 ? (
            <EmptyState icon={FileText} title="No reports found" message="Your medical documents will appear here." />
          ) : (
            <div className="space-y-6">
              {grouped.map(([cat, items]) => (
                <div key={cat}>
                  <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-ink-muted">{cat}</p>
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
      </main>
      <ReportPreviewModal report={previewReport} patient={patient} onClose={() => setPreviewReport(null)} />
    </>
  );
}
