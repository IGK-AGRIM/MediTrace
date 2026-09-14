import { useState, useMemo } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { Search, Users, Plus } from "lucide-react";
import TopBar from "../components/TopBar";
import PatientCard from "../components/PatientCard";
import EmptyState from "../components/EmptyState";
import AddPatientModal from "../components/AddPatientModal";
import { useData } from "../context/DataContext";
import { useToast } from "../context/ToastContext";

export default function DoctorPatients() {
  const { onMenuClick } = useOutletContext();
  const { patients } = useData();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [addOpen, setAddOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return patients;
    return patients.filter(
      (p) => p.name.toLowerCase().includes(q) || p.patientId.toLowerCase().includes(q)
    );
  }, [query, patients]);

  const handleSaved = (patient) => {
    setAddOpen(false);
    showToast(`${patient.name} registered as ${patient.patientId}.`, "success");
    navigate(`/doctor/patient/${patient.id}`);
  };

  return (
    <>
      <TopBar
        title="Patients"
        subtitle={`${patients.length} total`}
        onMenuClick={onMenuClick}
        right={
          <button
            onClick={() => setAddOpen(true)}
            className="flex items-center gap-1.5 rounded-md bg-accent px-3 py-2 text-xs font-medium text-base-bg transition-fast hover:bg-accent-dim"
          >
            <Plus size={14} strokeWidth={2.5} />
            New Patient
          </button>
        }
      />
      <main className="flex-1 px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-3xl animate-fade-in">
          <div className="mb-5 flex items-center gap-2.5 rounded-md2 border border-border-subtle bg-base-surface px-4 py-2.5">
            <Search size={15} className="text-ink-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter by name or patient ID…"
              className="flex-1 bg-transparent text-sm text-ink-primary placeholder:text-ink-muted focus:outline-none"
            />
          </div>

          {filtered.length === 0 ? (
            <EmptyState icon={Users} title="No patient record found" message="Try another patient ID or name." />
          ) : (
            <div className="space-y-2">
              {filtered.map((p) => (
                <PatientCard key={p.id} patient={p} />
              ))}
            </div>
          )}
        </div>
      </main>

      <AddPatientModal open={addOpen} onClose={() => setAddOpen(false)} onSaved={handleSaved} />
    </>
  );
}
