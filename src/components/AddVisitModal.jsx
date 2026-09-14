import { useState } from "react";
import { Plus, X, Stethoscope, ClipboardList, Pill, FileText } from "lucide-react";
import Modal from "./Modal";
import { HOSPITALS } from "../data/mockData";

const EMPTY_FORM = {
  hospital: HOSPITALS[0],
  date: new Date().toISOString().slice(0, 10),
  diagnosis: "",
  symptoms: "",
  notes: "",
  followUp: "",
  severity: "moderate",
};

function SectionHeader({ icon: Icon, label }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <Icon size={13} className="text-accent" />
      <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">{label}</span>
    </div>
  );
}

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

export default function AddVisitModal({ open, onClose, onSave, doctorName }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [medications, setMedications] = useState([""]);
  const [reportNames, setReportNames] = useState([""]);
  const [error, setError] = useState("");

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const updateMed = (i) => (e) =>
    setMedications((prev) => prev.map((m, idx) => (idx === i ? e.target.value : m)));
  const addMed = () => setMedications((prev) => [...prev, ""]);
  const removeMed = (i) => setMedications((prev) => prev.filter((_, idx) => idx !== i));

  const updateReport = (i) => (e) =>
    setReportNames((prev) => prev.map((r, idx) => (idx === i ? e.target.value : r)));
  const addReport = () => setReportNames((prev) => [...prev, ""]);
  const removeReport = (i) => setReportNames((prev) => prev.filter((_, idx) => idx !== i));

  const reset = () => {
    setForm(EMPTY_FORM);
    setMedications([""]);
    setReportNames([""]);
    setError("");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.diagnosis.trim() || !form.date || !form.hospital) {
      setError("Hospital, date, and diagnosis are required.");
      return;
    }
    const prescriptions = medications.map((m) => m.trim()).filter(Boolean);
    const reportTitles = reportNames.map((r) => r.trim()).filter(Boolean);

    onSave(
      {
        hospital: form.hospital,
        date: form.date,
        doctor: doctorName,
        diagnosis: form.diagnosis.trim(),
        symptoms: form.symptoms.trim() || "Not recorded",
        notes: form.notes.trim(),
        prescriptions,
        followUp: form.followUp || null,
        severity: form.severity,
      },
      reportTitles
    );
    reset();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Add new visit"
      subtitle="This will be added to the patient's connected medical timeline."
      width="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <section>
          <SectionHeader icon={Stethoscope} label="Visit details" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Hospital" required>
              <select value={form.hospital} onChange={update("hospital")} className={inputClass}>
                {HOSPITALS.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Date of visit" required>
              <input
                type="date"
                value={form.date}
                onChange={update("date")}
                className={inputClass}
                max={new Date().toISOString().slice(0, 10)}
              />
            </Field>
          </div>
          <p className="mt-2 text-xs text-ink-muted">Attending doctor: {doctorName}</p>
        </section>

        <section>
          <SectionHeader icon={ClipboardList} label="Care" />
          <div className="space-y-4">
            <Field label="Diagnosis" required>
              <input
                value={form.diagnosis}
                onChange={update("diagnosis")}
                placeholder="e.g. Acute Respiratory Infection"
                className={inputClass}
              />
            </Field>
            <Field label="Symptoms">
              <textarea
                value={form.symptoms}
                onChange={update("symptoms")}
                rows={2}
                placeholder="What the patient reported"
                className={`${inputClass} resize-none`}
              />
            </Field>
            <Field label="Clinical notes">
              <textarea
                value={form.notes}
                onChange={update("notes")}
                rows={2}
                placeholder="Exam findings, clinical observations"
                className={`${inputClass} resize-none`}
              />
            </Field>
            <Field label="Severity">
              <select value={form.severity} onChange={update("severity")} className={inputClass}>
                <option value="mild">Mild</option>
                <option value="moderate">Moderate</option>
                <option value="critical">Critical</option>
                <option value="normal">Routine</option>
              </select>
            </Field>
          </div>
        </section>

        <section>
          <SectionHeader icon={Pill} label="Prescription" />
          <div className="space-y-2">
            {medications.map((m, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  value={m}
                  onChange={updateMed(i)}
                  placeholder="e.g. Azithromycin 500mg — once daily for 5 days"
                  className={inputClass}
                />
                {medications.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMed(i)}
                    className="shrink-0 rounded-md p-2 text-ink-muted transition-fast hover:text-status-critical"
                    aria-label="Remove medication"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addMed}
            className="mt-2 flex items-center gap-1.5 text-xs font-medium text-accent transition-fast hover:text-accent-dim"
          >
            <Plus size={13} />
            Add another medication
          </button>
        </section>

        <section>
          <SectionHeader icon={FileText} label="Reports" />
          <div className="space-y-2">
            {reportNames.map((r, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  value={r}
                  onChange={updateReport(i)}
                  placeholder="e.g. Chest X-Ray"
                  className={inputClass}
                />
                {reportNames.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeReport(i)}
                    className="shrink-0 rounded-md p-2 text-ink-muted transition-fast hover:text-status-critical"
                    aria-label="Remove report"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addReport}
            className="mt-2 flex items-center gap-1.5 text-xs font-medium text-accent transition-fast hover:text-accent-dim"
          >
            <Plus size={13} />
            Add report
          </button>

          <div className="mt-4">
            <Field label="Follow-up date">
              <input type="date" value={form.followUp} onChange={update("followUp")} className={inputClass} />
            </Field>
          </div>
        </section>

        {error && <p className="text-xs text-status-critical">{error}</p>}

        <div className="flex items-center justify-end gap-2.5 border-t border-border-subtle pt-4">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-md border border-border-subtle px-4 py-2 text-sm text-ink-secondary transition-fast hover:text-ink-primary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-base-bg transition-fast hover:scale-[1.02] hover:bg-accent-dim active:scale-[0.98]"
          >
            Save Visit
          </button>
        </div>
      </form>
    </Modal>
  );
}
