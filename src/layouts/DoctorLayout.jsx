import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, CalendarClock, BarChart3, Settings } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { useToast } from "../context/ToastContext";

const NAV_ITEMS = [
  { to: "/doctor/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/doctor/patients", label: "Patients", icon: Users },
  { to: "/doctor/appointments", label: "Appointments", icon: CalendarClock },
  { to: "/doctor/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/doctor/settings", label: "Settings", icon: Settings },
];

export default function DoctorLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { doctorSession, logoutDoctor } = useAuth();
  const { resetDemoData } = useData();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutDoctor();
    navigate("/doctor/login");
  };

  const handleReset = () => {
    resetDemoData();
    showToast("Demo data has been reset.", "info");
  };

  return (
    <div className="flex min-h-screen bg-base-bg">
      <Sidebar
        navItems={NAV_ITEMS}
        roleLabel="Doctor"
        name={doctorSession?.name}
        subLabel={doctorSession?.hospital}
        avatarSeed={doctorSession?.doctorId}
        onLogout={handleLogout}
        onReset={handleReset}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div className="flex min-h-screen flex-1 flex-col min-w-0">
        <Outlet context={{ onMenuClick: () => setMobileOpen(true) }} />
      </div>
    </div>
  );
}
