import { useState } from "react";
import { ScanLine } from "lucide-react";
import Modal from "./Modal";
import { useData } from "../context/DataContext";
import { DEMO_PATIENT_ID } from "../data/mockData";

export default function QRScanModal({ open, onClose, onUseDemoPatient }) {
  const [scanning, setScanning] = useState(false);
  const { patients } = useData();

  const handleUseDemo = () => {
    setScanning(true);
    setTimeout(() => {
      const patient = patients.find((p) => p.patientId === DEMO_PATIENT_ID);
      setScanning(false);
      onClose();
      if (patient) onUseDemoPatient(patient);
    }, 850);
  };

  return (
    <Modal open={open} onClose={onClose} title="QR scanner" subtitle="Point the camera at the patient's MediTrace ID card" width="max-w-sm">
      <div className="flex flex-col items-center">
        <div className="relative flex h-48 w-48 items-center justify-center overflow-hidden rounded-md2 border border-border-soft bg-base-bg">
          <div className="absolute inset-3 rounded-md border border-dashed border-white/15" />
          <ScanLine size={28} className="text-ink-muted" />
          {scanning && (
            <div className="absolute inset-x-3 top-3 h-0.5 animate-[scan_0.85s_ease-in-out] bg-accent shadow-[0_0_8px_2px_rgba(32,199,181,0.5)]" />
          )}
          <style>{`
            @keyframes scan {
              0% { top: 12px; }
              50% { top: calc(100% - 16px); }
              100% { top: 12px; }
            }
          `}</style>
        </div>
        <p className="mt-4 text-center text-xs text-ink-muted">
          Camera access is simulated in this prototype.
        </p>
        <button
          onClick={handleUseDemo}
          disabled={scanning}
          className="mt-4 w-full rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-base-bg transition-fast hover:bg-accent-dim disabled:opacity-60"
        >
          {scanning ? "Scanning…" : "Use Demo Patient"}
        </button>
      </div>
    </Modal>
  );
}
