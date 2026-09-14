import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Plus, NotebookPen } from "lucide-react";
import TopBar from "../components/TopBar";
import NoteCard from "../components/NoteCard";
import AddNoteModal from "../components/AddNoteModal";
import EmptyState from "../components/EmptyState";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { useToast } from "../context/ToastContext";

export default function PatientNotes() {
  const { onMenuClick } = useOutletContext();
  const { patientSession } = useAuth();
  const { getSelfLogsForPatient, addSelfLog } = useData();
  const { showToast } = useToast();
  const [addOpen, setAddOpen] = useState(false);

  const logs = getSelfLogsForPatient(patientSession.id);

  const handleSave = ({ note, date }) => {
    addSelfLog(patientSession.id, { note, date });
    setAddOpen(false);
    showToast("Note added.", "success");
  };

  return (
    <>
      <TopBar
        title="My Notes"
        subtitle="Personal, not part of your official medical record"
        onMenuClick={onMenuClick}
        right={
          <button
            onClick={() => setAddOpen(true)}
            className="flex items-center gap-1.5 rounded-md bg-accent px-3 py-2 text-xs font-medium text-base-bg transition-fast hover:bg-accent-dim"
          >
            <Plus size={14} strokeWidth={2.5} />
            Add Note
          </button>
        }
      />
      <main className="flex-1 px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-3xl animate-fade-in">
          {logs.length === 0 ? (
            <EmptyState icon={NotebookPen} title="No notes yet" message="Log how you're feeling between visits — only you can see this." />
          ) : (
            <div className="space-y-2.5">
              {logs.map((log) => (
                <NoteCard key={log.id} log={log} />
              ))}
            </div>
          )}
        </div>
      </main>
      <AddNoteModal open={addOpen} onClose={() => setAddOpen(false)} onSave={handleSave} />
    </>
  );
}
