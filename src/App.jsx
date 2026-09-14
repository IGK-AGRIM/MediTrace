import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import ToastStack from "./components/Toast";

import Landing from "./pages/Landing";
import DoctorLogin from "./pages/DoctorLogin";
import PatientLogin from "./pages/PatientLogin";
import DoctorLayout from "./layouts/DoctorLayout";
import PatientLayout from "./layouts/PatientLayout";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorPatients from "./pages/DoctorPatients";
import DoctorPatientProfile from "./pages/DoctorPatientProfile";
import DoctorAppointments from "./pages/DoctorAppointments";
import DoctorAnalytics from "./pages/DoctorAnalytics";
import DoctorSettings from "./pages/DoctorSettings";
import PatientDashboard from "./pages/PatientDashboard";
import PatientTimelinePage from "./pages/PatientTimelinePage";
import PatientReports from "./pages/PatientReports";
import PatientNotes from "./pages/PatientNotes";
import PatientProfilePage from "./pages/PatientProfilePage";

function RequireDoctor({ children }) {
  const { doctorSession } = useAuth();
  return doctorSession ? children : <Navigate to="/doctor/login" replace />;
}

function RequirePatient({ children }) {
  const { patientSession } = useAuth();
  return patientSession ? children : <Navigate to="/patient/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/doctor/login" element={<DoctorLogin />} />
              <Route path="/patient/login" element={<PatientLogin />} />

              <Route
                path="/doctor"
                element={
                  <RequireDoctor>
                    <DoctorLayout />
                  </RequireDoctor>
                }
              >
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<DoctorDashboard />} />
                <Route path="patients" element={<DoctorPatients />} />
                <Route path="patient/:id" element={<DoctorPatientProfile />} />
                <Route path="appointments" element={<DoctorAppointments />} />
                <Route path="analytics" element={<DoctorAnalytics />} />
                <Route path="settings" element={<DoctorSettings />} />
              </Route>

              <Route
                path="/patient"
                element={
                  <RequirePatient>
                    <PatientLayout />
                  </RequirePatient>
                }
              >
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<PatientDashboard />} />
                <Route path="timeline" element={<PatientTimelinePage />} />
                <Route path="reports" element={<PatientReports />} />
                <Route path="notes" element={<PatientNotes />} />
                <Route path="profile" element={<PatientProfilePage />} />
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <ToastStack />
          </BrowserRouter>
        </ToastProvider>
      </DataProvider>
    </AuthProvider>
  );
}
