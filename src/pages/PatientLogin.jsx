import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Logo from "../components/Logo";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { DEMO_PATIENT_ID } from "../data/mockData";

export default function PatientLogin() {
  const [patientId, setPatientId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loginPatient } = useAuth();
  const { findPatient } = useData();
  const navigate = useNavigate();

  const attemptLogin = (id, pwd) => {
    const patient = findPatient(id);
    if (patient && pwd === patient.password) {
      loginPatient(patient);
      navigate("/patient/dashboard");
    } else {
      setError("Invalid Patient ID or password.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    attemptLogin(patientId, password);
  };

  const handleDemo = () => {
    const patient = findPatient(DEMO_PATIENT_ID);
    loginPatient(patient);
    navigate("/patient/dashboard");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-base-bg px-6">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-6 flex items-center gap-1.5 text-xs text-ink-muted transition-fast hover:text-ink-secondary">
          <ArrowLeft size={13} />
          Back
        </Link>

        <Logo />
        <h1 className="mt-6 text-lg font-semibold tracking-tight text-ink-primary">Patient sign in</h1>
        <p className="mt-1 text-sm text-ink-secondary">Your medical history. Always connected.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-3.5">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink-secondary">Patient ID</label>
            <input
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              placeholder="MT-20481"
              className="w-full rounded-md border border-border-subtle bg-base-surface px-3 py-2.5 text-sm text-ink-primary placeholder:text-ink-muted transition-fast focus:border-accent/40 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink-secondary">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-md border border-border-subtle bg-base-surface px-3 py-2.5 text-sm text-ink-primary placeholder:text-ink-muted transition-fast focus:border-accent/40 focus:outline-none"
            />
          </div>
          {error && <p className="text-xs text-status-critical">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-base-bg transition-fast hover:bg-accent-dim"
          >
            Sign in
          </button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-border-subtle" />
          <span className="text-[11px] text-ink-muted">or</span>
          <div className="h-px flex-1 bg-border-subtle" />
        </div>

        <button
          onClick={handleDemo}
          className="w-full rounded-md border border-border-subtle px-4 py-2.5 text-sm font-medium text-ink-secondary transition-fast hover:border-accent/30 hover:text-accent"
        >
          Use Demo Patient
        </button>

        <p className="mt-6 text-center text-xs text-ink-muted">
          Looking for the doctor view?{" "}
          <Link to="/doctor/login" className="text-accent hover:underline">
            Go to Doctor Portal
          </Link>
        </p>
      </div>
    </div>
  );
}
