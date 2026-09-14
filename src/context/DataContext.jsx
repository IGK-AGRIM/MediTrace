import { createContext, useContext, useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {
  INITIAL_PATIENTS,
  INITIAL_REPORTS,
  INITIAL_SELF_LOGS,
  INITIAL_ACTIVITY_LOG,
} from "../data/mockData";

const DataContext = createContext(null);

function sortVisitsDesc(visits) {
  return [...visits].sort((a, b) => new Date(b.date) - new Date(a.date));
}

function calculateAge(dob) {
  if (!dob) return null;
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

export function DataProvider({ children }) {
  const [patients, setPatients] = useLocalStorage("meditrace_patients", INITIAL_PATIENTS);
  const [reports, setReports] = useLocalStorage("meditrace_reports", INITIAL_REPORTS);
  const [selfLogs, setSelfLogs] = useLocalStorage("meditrace_selflogs", INITIAL_SELF_LOGS);
  const [activityLog, setActivityLog] = useLocalStorage("meditrace_activity", INITIAL_ACTIVITY_LOG);

  const logActivity = useCallback(
    (message, patientId) => {
      setActivityLog((prev) =>
        [{ id: `act-${Date.now()}`, timestamp: Date.now(), message, patientId }, ...prev].slice(0, 40)
      );
    },
    [setActivityLog]
  );

  const findPatient = useCallback(
    (query) => {
      if (!query) return null;
      const q = query.trim().toLowerCase();
      if (!q) return null;
      return (
        patients.find((p) => p.patientId.toLowerCase() === q) ||
        patients.find((p) => p.name.toLowerCase().includes(q)) ||
        null
      );
    },
    [patients]
  );

  const getPatientById = useCallback(
    (id) => patients.find((p) => p.id === id) || null,
    [patients]
  );

  const getReportsForPatient = useCallback(
    (patientId) => reports.filter((r) => r.patientId === patientId),
    [reports]
  );

  const getSelfLogsForPatient = useCallback(
    (patientId) =>
      selfLogs
        .filter((n) => n.patientId === patientId)
        .sort((a, b) => new Date(b.date) - new Date(a.date)),
    [selfLogs]
  );

  const getActivityForPatient = useCallback(
    (patientId) => activityLog.filter((a) => a.patientId === patientId),
    [activityLog]
  );

  const addVisit = useCallback(
    (patientId, visitData, reportTitles = []) => {
      const timestamp = Date.now();
      const newReports = reportTitles
        .map((t) => t.trim())
        .filter(Boolean)
        .map((title, i) => ({
          id: `rep-${patientId}-${timestamp}-${i}`,
          patientId,
          title,
          date: visitData.date,
          hospital: visitData.hospital,
          doctor: visitData.doctor,
          type: "Report",
          category: "Clinical Notes",
          summary: "Uploaded during this visit.",
        }));

      const newVisit = {
        id: `v-${patientId}-${timestamp}`,
        ...visitData,
        reports: newReports.map((r) => r.id),
      };

      if (newReports.length > 0) {
        setReports((prev) => [...prev, ...newReports]);
      }
      setPatients((prev) =>
        prev.map((p) =>
          p.id === patientId ? { ...p, visits: sortVisitsDesc([newVisit, ...p.visits]) } : p
        )
      );
      const patient = patients.find((p) => p.id === patientId);
      if (patient) logActivity(`${visitData.doctor} added a new visit for ${patient.name}.`, patientId);
      return newVisit;
    },
    [setPatients, setReports, patients, logActivity]
  );

  const generatePatientId = useCallback(() => {
    let id;
    do {
      id = `MT-${Math.floor(10000 + Math.random() * 90000)}`;
    } while (patients.some((p) => p.patientId === id));
    return id;
  }, [patients]);

  const addPatient = useCallback(
    (patientData) => {
      const newPatient = {
        id: `p-${Date.now()}`,
        patientId: patientData.patientId || generatePatientId(),
        name: patientData.name,
        age: calculateAge(patientData.dob) ?? patientData.age ?? null,
        dob: patientData.dob || null,
        gender: patientData.gender,
        bloodGroup: patientData.bloodGroup,
        phone: patientData.phone || "",
        password: patientData.password || "demo1234",
        allergies: patientData.allergies || [],
        conditions: patientData.conditions || [],
        emergencyContact: patientData.emergencyContact || "",
        visits: [],
      };
      setPatients((prev) => [...prev, newPatient]);
      logActivity(`New patient record created for ${newPatient.name}.`, newPatient.id);
      return newPatient;
    },
    [setPatients, generatePatientId, logActivity]
  );

  const addSelfLog = useCallback(
    (patientId, { note, date }) => {
      const newLog = {
        id: `note-${patientId}-${Date.now()}`,
        patientId,
        date: date || new Date().toISOString().slice(0, 10),
        note,
      };
      setSelfLogs((prev) => [newLog, ...prev]);
      return newLog;
    },
    [setSelfLogs]
  );

  const resetDemoData = useCallback(() => {
    setPatients(INITIAL_PATIENTS);
    setReports(INITIAL_REPORTS);
    setSelfLogs(INITIAL_SELF_LOGS);
    setActivityLog(INITIAL_ACTIVITY_LOG);
  }, [setPatients, setReports, setSelfLogs, setActivityLog]);

  const value = {
    patients,
    reports,
    selfLogs,
    activityLog,
    findPatient,
    getPatientById,
    getReportsForPatient,
    getSelfLogsForPatient,
    getActivityForPatient,
    addVisit,
    addPatient,
    addSelfLog,
    generatePatientId,
    resetDemoData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
