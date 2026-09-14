import { useOutletContext } from "react-router-dom";
import { ShieldCheck, Phone, Droplet, Cake } from "lucide-react";
import TopBar from "../components/TopBar";
import Avatar from "../components/Avatar";
import Badge from "../components/Badge";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { formatDate } from "../utils/format";

export default function PatientProfilePage() {
  const { onMenuClick } = useOutletContext();
  const { patientSession } = useAuth();
  const { getPatientById } = useData();
  const patient = getPatientById(patientSession.id);

  return (
    <>
      <TopBar title="Profile" onMenuClick={onMenuClick} />
      <main className="flex-1 px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-2xl animate-fade-in space-y-6">
          <div className="rounded-md2 border border-border-subtle bg-base-surface p-5">
            <div className="flex items-center gap-3.5">
              <Avatar seed={patient.patientId} name={patient.name} size="xl" />
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-ink-primary">{patient.name}</h2>
                <p className="mt-0.5 text-xs text-ink-muted">{patient.patientId}</p>
                <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-status-goodSoft px-2 py-0.5 text-[10px] font-medium text-status-good">
                  <ShieldCheck size={10} />
                  Demo account · Active
                </span>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 border-t border-border-subtle pt-4 sm:grid-cols-3">
              <div>
                <p className="flex items-center gap-1.5 text-[11px] text-ink-muted">
                  <Cake size={12} /> Date of birth
                </p>
                <p className="mt-1 text-sm text-ink-primary">{formatDate(patient.dob, { day: "numeric", month: "long", year: "numeric" })}</p>
              </div>
              <div>
                <p className="flex items-center gap-1.5 text-[11px] text-ink-muted">
                  <Droplet size={12} /> Blood group
                </p>
                <p className="mt-1 text-sm text-ink-primary">{patient.bloodGroup}</p>
              </div>
              <div>
                <p className="flex items-center gap-1.5 text-[11px] text-ink-muted">
                  <Phone size={12} /> Phone
                </p>
                <p className="mt-1 text-sm text-ink-primary">{patient.phone || "—"}</p>
              </div>
            </div>
          </div>

          <div className="rounded-md2 border border-border-subtle bg-base-surface p-5">
            <h3 className="mb-3 text-sm font-semibold text-ink-primary">Health information</h3>
            <div className="space-y-3">
              <div>
                <p className="mb-1.5 text-[11px] text-ink-muted">Allergies</p>
                <div className="flex flex-wrap gap-1.5">
                  {patient.allergies.length > 0 ? (
                    patient.allergies.map((a) => (
                      <Badge key={a} variant="critical">
                        {a}
                      </Badge>
                    ))
                  ) : (
                    <Badge variant="good">No known allergies</Badge>
                  )}
                </div>
              </div>
              <div>
                <p className="mb-1.5 text-[11px] text-ink-muted">Known conditions</p>
                <div className="flex flex-wrap gap-1.5">
                  {patient.conditions.length > 0 ? (
                    patient.conditions.map((c) => (
                      <Badge key={c} variant="warn">
                        {c}
                      </Badge>
                    ))
                  ) : (
                    <Badge variant="neutral">None recorded</Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-md2 border border-border-subtle bg-base-surface p-5">
            <h3 className="mb-3 text-sm font-semibold text-ink-primary">Emergency contact</h3>
            <p className="text-sm text-ink-secondary">{patient.emergencyContact || "Not provided"}</p>
          </div>

          <p className="text-center text-[11px] text-ink-muted">Prototype environment · Demo data</p>
        </div>
      </main>
    </>
  );
}
