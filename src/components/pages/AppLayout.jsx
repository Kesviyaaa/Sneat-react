import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const AppLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="layout-wrapper">
      {/* Sidebar gets state + toggle */}
      <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />

      {/* Navbar adjusts layout based on sidebar */}
      <Navbar sidebarCollapsed={sidebarCollapsed} />

      {/* Main content */}
      <div className="layout-page">
        {children}
      </div>
    </div>
  );
};

export default AppLayout;