import { useOutletContext, useNavigate } from "react-router-dom";
import { RotateCcw, ShieldCheck, Lock, Database } from "lucide-react";
import TopBar from "../components/TopBar";
import Avatar from "../components/Avatar";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { useToast } from "../context/ToastContext";

export default function DoctorSettings() {
  const { onMenuClick } = useOutletContext();
  const { doctorSession, logoutDoctor } = useAuth();
  const { resetDemoData } = useData();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleReset = () => {
    resetDemoData();
    showToast("Demo data has been reset to its original state.", "info");
  };

  const handleLogout = () => {
    logoutDoctor();
    navigate("/doctor/login");
  };

  return (
    <>
      <TopBar title="Settings" onMenuClick={onMenuClick} />
      <main className="flex-1 px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-2xl animate-fade-in space-y-6">
          <div className="rounded-md2 border border-border-subtle bg-base-surface p-5">
            <h3 className="mb-4 text-sm font-semibold text-ink-primary">Profile</h3>
            <div className="flex items-center gap-3.5">
              <Avatar seed={doctorSession?.doctorId} name={doctorSession?.name} size="lg" />
              <div>
                <p className="text-sm font-medium text-ink-primary">{doctorSession?.name}</p>
                <p className="mt-0.5 text-xs text-ink-muted">
                  {doctorSession?.specialization} · {doctorSession?.hospital}
                </p>
                <p className="mt-0.5 text-xs text-ink-muted">Doctor ID: {doctorSession?.doctorId}</p>
              </div>
            </div>
          </div>

          <div className="rounded-md2 border border-border-subtle bg-base-surface p-5">
            <h3 className="mb-3 text-sm font-semibold text-ink-primary">Demo controls</h3>
            <p className="mb-3 text-xs text-ink-muted">
              Restore every patient, report, and note to its original seed state — useful between rehearsal runs.
            </p>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 rounded-md border border-border-subtle px-3.5 py-2 text-xs font-medium text-ink-secondary transition-fast hover:border-accent/30 hover:text-accent"
            >
              <RotateCcw size={13.5} />
              Reset demo data
            </button>
          </div>

          <div className="rounded-md2 border border-border-subtle bg-base-surface p-5">
            <h3 className="mb-3 text-sm font-semibold text-ink-primary">Session &amp; trust</h3>
            <div className="space-y-2.5 text-xs text-ink-secondary">
              <p className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-status-good" />
                Simulated secure session — prototype environment
              </p>
              <p className="flex items-center gap-2">
                <Lock size={14} className="text-ink-muted" />
                Authorized access only (login simulated for this demo)
              </p>
              <p className="flex items-center gap-2">
                <Database size={14} className="text-ink-muted" />
                All records shown are demo data stored locally in this browser
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full rounded-md border border-border-subtle px-4 py-2.5 text-sm text-ink-secondary transition-fast hover:text-ink-primary"
          >
            Log out
          </button>
        </div>
      </main>
    </>
  );
}
