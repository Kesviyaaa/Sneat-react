// App.jsx
import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        
        {/* Sidebar */}
        <Sidebar />

        {/* Main page content */}
        <div className="layout-page">
          {/* Navbar */}
          <Navbar />

          {/* Page content */}
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <h1>Welcome to your Dashboard</h1>
              {/* Add your page components here */}
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;