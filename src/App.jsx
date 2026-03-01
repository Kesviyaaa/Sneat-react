import Navbar from "./components/pages/Navbar";
import Sidebar from "./components/pages/Sidebar";
import Footer from "./components/pages/Footer";
import { useState } from "react";

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
        <div
          className={`layout-wrapper layout-content-navbar ${
          collapsed ? "layout-menu-collapsed" : ""
        }`}
>      <div className="layout-container">

        {/* Sidebar goes here */}
        <Sidebar toggleSidebar={() => setCollapsed(!collapsed)} />

        {/* Main page */}
        <div className="layout-page">
          <Navbar />

          {/* Content wrapper */}
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              {/* Your page content goes here */}
            </div>

            {/* Footer */}
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;