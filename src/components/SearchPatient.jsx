import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, QrCode, AlertTriangle } from "lucide-react";
import { useData } from "../context/DataContext";
import QRScanModal from "./QRScanModal";
import Avatar from "./Avatar";

function latestVisitOf(patient) {
  return [...patient.visits].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
}

export default function SearchPatient({ autoFocus = false }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const { patients } = useData();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return patients
      .filter((p) => p.patientId.toLowerCase().includes(q) || p.name.toLowerCase().includes(q))
      .slice(0, 5);
  }, [query, patients]);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const goToPatient = (patient) => {
    setQuery("");
    setFocused(false);
    navigate(`/doctor/patient/${patient.id}`);
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center gap-2.5 rounded-md2 border border-border-subtle bg-base-surface px-4 py-3 shadow-card transition-fast focus-within:border-accent/40 focus-within:shadow-[0_0_0_3px_rgba(32,199,181,0.08)]">
        <Search size={16} className="shrink-0 text-ink-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          autoFocus={autoFocus}
          placeholder="Search patient by name, ID, or scan QR…"
          className="flex-1 bg-transparent text-sm text-ink-primary placeholder:text-ink-muted focus:outline-none"
        />
        <button
          onClick={() => setQrOpen(true)}
          className="flex shrink-0 items-center gap-1.5 rounded-md border border-border-subtle px-2.5 py-1.5 text-xs font-medium text-ink-secondary transition-fast hover:border-accent/30 hover:text-accent"
        >
          <QrCode size={13.5} />
          Scan QR
        </button>
      </div>

      {focused && query.trim() && (
        <div className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-md2 border border-border-soft bg-base-elevated shadow-elevated animate-slide-up">
          {results.length > 0 ? (
            results.map((p) => {
              const lv = latestVisitOf(p);
              return (
                <button
                  key={p.id}
                  onClick={() => goToPatient(p)}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-fast hover:bg-white/[0.05]"
                >
                  <Avatar seed={p.patientId} name={p.name} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-ink-primary">{p.name}</p>
                    <p className="truncate text-xs text-ink-muted">
                      {p.patientId}
                      {lv ? ` · ${lv.diagnosis}` : ""}
                    </p>
                  </div>
                  {p.allergies.length > 0 && <AlertTriangle size={13} className="shrink-0 text-status-critical" />}
                </button>
              );
            })
          ) : (
            <div className="px-4 py-4 text-center">
              <p className="text-sm text-ink-secondary">No connected patient found.</p>
              <p className="mt-0.5 text-xs text-ink-muted">Try another patient ID or name.</p>
            </div>
          )}
        </div>
      )}

      <QRScanModal open={qrOpen} onClose={() => setQrOpen(false)} onUseDemoPatient={goToPatient} />
    </div>
  );
}
