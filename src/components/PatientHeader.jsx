import { Droplet, AlertTriangle, Phone, Clock, Cake } from "lucide-react";
import Badge from "./Badge";
import Avatar from "./Avatar";

function formatDate(dateStr, opts) {
  if (!dateStr) return "—";
  return new Date(dateStr + "T00:00:00").toLocaleDateString(
    "en-IN",
    opts || { day: "numeric", month: "short", year: "numeric" }
  );
}

export default function PatientHeader({ patient, lastUpdated, actions }) {
  return (
    <div className="rounded-md2 border border-border-subtle bg-base-surface p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <Avatar seed={patient.patientId} name={patient.name} size="lg" />
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-ink-primary">{patient.name}</h2>
            <p className="mt-0.5 text-xs text-ink-muted">
              {patient.patientId} · {patient.age} yrs · {patient.gender}
            </p>
            {patient.dob && (
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-ink-muted">
                <Cake size={12} />
                Born {formatDate(patient.dob, { day: "numeric", month: "long", year: "numeric" })}
              </p>
            )}
          </div>
        </div>
        {actions && <div className="shrink-0">{actions}</div>}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge variant="neutral" icon={Droplet}>
          {patient.bloodGroup}
        </Badge>
        {patient.allergies.length > 0 ? (
          patient.allergies.map((a) => (
            <Badge key={a} variant="critical" icon={AlertTriangle}>
              Allergy: {a}
            </Badge>
          ))
        ) : (
          <Badge variant="good">No known allergies</Badge>
        )}
        {patient.conditions.map((c) => (
          <Badge key={c} variant="warn">
            {c}
          </Badge>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 border-t border-border-subtle pt-3.5 text-xs text-ink-muted">
        {patient.phone && (
          <span className="flex items-center gap-1.5">
            <Phone size={12.5} />
            {patient.phone}
          </span>
        )}
        {patient.emergencyContact && (
          <span className="flex items-center gap-1.5">
            Emergency: {patient.emergencyContact}
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <Clock size={12.5} />
          Last updated {formatDate(lastUpdated)}
        </span>
      </div>
    </div>
  );
}
