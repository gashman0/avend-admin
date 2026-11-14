
import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./components/sections/Sidebar";
import AdminHeader from "./components/sections/AdminHeader";



type AdminLayoutProps = {
  adminName?: string;
  onLogout?: () => void;
  isLoggingOut?: boolean;
};

const LoggedInLayout = ({
  adminName = "Administrator",
  onLogout,
  isLoggingOut = false,
}: AdminLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#15181E]">
      {/* Sidebar */}
      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        onLogout={onLogout}
        isLoggingOut={isLoggingOut}
      />

      {/* Main content */}
      <main className="min-h-screen min-w-0 md:ml-64">
        {/* Header */}
        <AdminHeader
          adminName={adminName}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        {/* Page content */}
        <div className="min-w-0 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default LoggedInLayout;
