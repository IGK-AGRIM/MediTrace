import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Activity, FileText, NotebookPen, UserRound } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

const NAV_ITEMS = [
  { to: "/patient/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/patient/timeline", label: "Medical Timeline", icon: Activity },
  { to: "/patient/reports", label: "Reports", icon: FileText },
  { to: "/patient/notes", label: "My Notes", icon: NotebookPen },
  { to: "/patient/profile", label: "Profile", icon: UserRound },
];

export default function PatientLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { patientSession, logoutPatient } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutPatient();
    navigate("/patient/login");
  };

  return (
    <div className="flex min-h-screen bg-base-bg">
      <Sidebar
        navItems={NAV_ITEMS}
        roleLabel="Patient"
        name={patientSession?.name}
        subLabel={patientSession?.patientId}
        avatarSeed={patientSession?.patientId}
        onLogout={handleLogout}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div className="flex min-h-screen flex-1 flex-col min-w-0">
        <Outlet context={{ onMenuClick: () => setMobileOpen(true) }} />
      </div>
    </div>
  );
}
