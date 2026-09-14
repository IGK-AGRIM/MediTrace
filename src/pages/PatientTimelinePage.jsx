import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import TopBar from "../components/TopBar";
import PatientHeader from "../components/PatientHeader";
import Timeline from "../components/Timeline";
import ReportPreviewModal from "../components/ReportPreviewModal";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";

export default function PatientTimelinePage() {
  const { onMenuClick } = useOutletContext();
  const { patientSession } = useAuth();
  const { getPatientById, getReportsForPatient } = useData();
  const [previewReport, setPreviewReport] = useState(null);

  const patient = getPatientById(patientSession.id);
  const reports = getReportsForPatient(patient.id);
  const latestVisitDate = patient.visits.length
    ? [...patient.visits].sort((a, b) => new Date(b.date) - new Date(a.date))[0].date
    : null;

  return (
    <>
      <TopBar title="Medical Timeline" subtitle="Read-only · assembled across all your care providers" onMenuClick={onMenuClick} />
      <main className="flex-1 px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-3xl animate-fade-in">
          <PatientHeader patient={patient} lastUpdated={latestVisitDate} />
          <div className="mt-8">
            <h3 className="mb-4 text-sm font-semibold text-ink-primary">Medical Journey</h3>
            <Timeline visits={patient.visits} reports={reports} onOpenReport={setPreviewReport} />
          </div>
        </div>
      </main>
      <ReportPreviewModal report={previewReport} patient={patient} onClose={() => setPreviewReport(null)} />
    </>
  );
}
