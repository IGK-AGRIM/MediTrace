import { useState } from "react";
import Modal from "./Modal";

export default function AddNoteModal({ open, onClose, onSave }) {
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [error, setError] = useState("");

  const handleClose = () => {
    setNote("");
    setError("");
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.trim()) {
      setError("Write a quick note before saving.");
      return;
    }
    onSave({ note: note.trim(), date });
    setNote("");
    setError("");
  };

  return (
    <Modal open={open} onClose={handleClose} title="Add a personal note" subtitle="Visible only to you — not part of your doctor-verified record." width="max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-ink-secondary">Date</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            max={new Date().toISOString().slice(0, 10)}
            className="w-full rounded-md border border-border-subtle bg-base-bg px-3 py-2 text-sm text-ink-primary transition-fast focus:border-accent/40 focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-ink-secondary">How are you feeling?</span>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
            placeholder="e.g. Slept better this week, cough is almost gone."
            className="w-full resize-none rounded-md border border-border-subtle bg-base-bg px-3 py-2 text-sm text-ink-primary placeholder:text-ink-muted transition-fast focus:border-accent/40 focus:outline-none"
          />
        </label>
        {error && <p className="text-xs text-status-critical">{error}</p>}
        <div className="flex items-center justify-end gap-2.5 border-t border-border-subtle pt-4">
          <button type="button" onClick={handleClose} className="rounded-md border border-border-subtle px-4 py-2 text-sm text-ink-secondary transition-fast hover:text-ink-primary">
            Cancel
          </button>
          <button type="submit" className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-base-bg transition-fast hover:bg-accent-dim">
            Save Note
          </button>
        </div>
      </form>
    </Modal>
  );
}
