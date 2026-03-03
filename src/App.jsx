import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";import Navbar from "./components/pages/Navbar";
import Sidebar from "./components/pages/Sidebar";
import Footer from "./components/pages/Footer";
import DataTablesAdvanced from "./components/pages/DataTablesAdvanced";

// Pages
import Analytics from "./components/pages/Analytics";
// import other pages later: Dashboard, CRM, etc.

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Router>
      <div
        className={`layout-wrapper layout-content-navbar ${
          collapsed ? "layout-menu-collapsed" : ""
        }`}
      >
        <div className="layout-container">
          {/* Sidebar */}
          <Sidebar
            collapsed={collapsed}
            toggleSidebar={() => setCollapsed(!collapsed)}
          />

          {/* Main page */}
          <div className="layout-page">
          <Navbar collapsed={collapsed} />
            {/* Content wrapper */}
            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                <Routes>
                  {/* Redirect "/" to analytics page */}
                  <Route path="/" element={<Navigate to="/analytics" />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/tables-datatables-advanced" element={<DataTablesAdvanced />} />
                  {/* Add more routes as needed */}
                </Routes>
              </div>

              {/* Footer */}
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
