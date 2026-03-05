import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

import Navbar from "./components/pages/Navbar";
import Sidebar from "./components/pages/Sidebar";
import Footer from "./components/pages/Footer";
import DataTablesAdvanced from "./components/pages/DataTablesAdvanced";
import Analytics from "./components/pages/Analytics";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [wrapperHover, setWrapperHover] = useState(false);

  // ⭐ REQUIRED — toggle function
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    setWrapperHover(false); // reset hover when manually toggled
  };

  return (
    <Router>
      <div
        className={`layout-wrapper layout-content-navbar ${
          collapsed ? "layout-menu-collapsed" : ""
        } ${collapsed && wrapperHover ? "menu-hover" : ""}`}
      >
        <div className="layout-container">
          {/* Sidebar */}
          <Sidebar
            collapsed={collapsed}
            toggleSidebar={toggleSidebar}
            setWrapperHover={setWrapperHover}
          />

          {/* Main page */}
          <div className="layout-page">
          <div className="top-blur"></div>
            <Navbar collapsed={collapsed} />

            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                <Routes>
                  <Route path="/" element={<Navigate to="/analytics" />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route
                    path="/tables-datatables-advanced"
                    element={<DataTablesAdvanced />}
                  />
                </Routes>
              </div>

              <Footer />
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;