import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [doctorSession, setDoctorSession] = useLocalStorage("meditrace_doctor_session", null);
  const [patientSession, setPatientSession] = useLocalStorage("meditrace_patient_session", null);

  const loginDoctor = (doctor) => setDoctorSession(doctor);
  const logoutDoctor = () => setDoctorSession(null);
  const loginPatient = (patient) => setPatientSession({ id: patient.id, patientId: patient.patientId, name: patient.name });
  const logoutPatient = () => setPatientSession(null);

  return (
    <AuthContext.Provider
      value={{ doctorSession, patientSession, loginDoctor, logoutDoctor, loginPatient, logoutPatient }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
