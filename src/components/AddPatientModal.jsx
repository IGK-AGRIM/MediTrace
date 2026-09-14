import { useState, useEffect } from "react";
import Modal from "./Modal";
import { useData } from "../context/DataContext";

const EMPTY_FORM = {
  name: "",
  dob: "",
  gender: "Male",
  bloodGroup: "O+",
  phone: "",
  emergencyContact: "",
  allergies: "",
  conditions: "",
};

function Field({ label, children, required }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-ink-secondary">
        {label}
        {required && <span className="text-status-critical"> *</span>}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-md border border-border-subtle bg-base-bg px-3 py-2 text-sm text-ink-primary placeholder:text-ink-muted transition-fast focus:border-accent/40 focus:outline-none";

export default function AddPatientModal({ open, onClose, onSaved }) {
  const { addPatient, generatePatientId } = useData();
  const [form, setForm] = useState(EMPTY_FORM);
  const [previewId, setPreviewId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) setPreviewId(generatePatientId());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleClose = () => {
    setForm(EMPTY_FORM);
    setError("");
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.dob || !form.gender || !form.bloodGroup) {
      setError("Name, date of birth, gender, and blood group are required.");
      return;
    }
    const newPatient = addPatient({
      patientId: previewId,
      name: form.name.trim(),
      dob: form.dob,
      gender: form.gender,
      bloodGroup: form.bloodGroup,
      phone: form.phone.trim(),
      emergencyContact: form.emergencyContact.trim(),
      allergies: form.allergies.split(",").map((s) => s.trim()).filter(Boolean),
      conditions: form.conditions.split(",").map((s) => s.trim()).filter(Boolean),
    });
    setForm(EMPTY_FORM);
    setError("");
    onSaved(newPatient);
  };

  return (
    <Modal open={open} onClose={handleClose} title="Register new patient" subtitle="Creates a new connected medical record." width="max-w-xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-between rounded-md border border-border-subtle bg-white/[0.02] px-3 py-2">
          <span className="text-xs text-ink-muted">Assigned Patient ID</span>
          <span className="text-sm font-medium text-accent">{previewId}</span>
        </div>

        <Field label="Full name" required>
          <input value={form.name} onChange={update("name")} placeholder="e.g. Neha Kulkarni" className={inputClass} />
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label="Date of birth" required>
            <input type="date" value={form.dob} onChange={update("dob")} className={inputClass} max={new Date().toISOString().slice(0, 10)} />
          </Field>
          <Field label="Gender" required>
            <select value={form.gender} onChange={update("gender")} className={inputClass}>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </Field>
          <Field label="Blood group" required>
            <select value={form.bloodGroup} onChange={update("bloodGroup")} className={inputClass}>
              {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map((bg) => (
                <option key={bg}>{bg}</option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Phone">
            <input value={form.phone} onChange={update("phone")} placeholder="+91 …" className={inputClass} />
          </Field>
          <Field label="Emergency contact">
            <input value={form.emergencyContact} onChange={update("emergencyContact")} placeholder="Name (Relation) · Phone" className={inputClass} />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Known allergies">
            <input value={form.allergies} onChange={update("allergies")} placeholder="Comma-separated" className={inputClass} />
          </Field>
          <Field label="Chronic conditions">
            <input value={form.conditions} onChange={update("conditions")} placeholder="Comma-separated" className={inputClass} />
          </Field>
        </div>

        {error && <p className="text-xs text-status-critical">{error}</p>}

        <div className="flex items-center justify-end gap-2.5 border-t border-border-subtle pt-4">
          <button type="button" onClick={handleClose} className="rounded-md border border-border-subtle px-4 py-2 text-sm text-ink-secondary transition-fast hover:text-ink-primary">
            Cancel
          </button>
          <button type="submit" className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-base-bg transition-fast hover:bg-accent-dim">
            Create Patient Record
          </button>
        </div>
      </form>
    </Modal>
  );
}
