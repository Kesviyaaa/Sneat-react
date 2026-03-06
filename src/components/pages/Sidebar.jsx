import { useState, useEffect } from "react";
import logo from "../../assets/sneat.svg";
import "../css/sidebar.css";
import { Link, useLocation } from "react-router-dom";
import "boxicons/css/boxicons.min.css";

const Sidebar = ({ collapsed, toggleSidebar, setWrapperHover }) => {
  const location = useLocation();

  // menu state
  const [hovered, setHovered] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  // active dashboard
  const isDashboardActive = location.pathname === "/analytics";

  // open dashboard menu automatically
  useEffect(() => {
    if (isDashboardActive) {
      setOpenMenu("dashboards");
    }
  }, [location.pathname]);

  // open datatable menu automatically
  useEffect(() => {
    if (location.pathname.startsWith("/tables-datatables")) {
      setOpenMenu("datatable");
    }
  }, [location.pathname]);

  // hover expand sidebar
  const handleMouseEnter = () => {
    if (collapsed) {
      setHovered(true);
      setWrapperHover(true);
    }
  };

  const handleMouseLeave = () => {
    if (collapsed) {
      setHovered(false);
      setWrapperHover(false);
    }
  };

  return (
    
    <aside
    id="layout-menu"
    style={{ position: "fixed" }}
    className={`layout-menu menu-vertical menu ${
      collapsed ? "layout-menu-collapsed" : ""
    } ${collapsed && hovered ? "hovered" : ""}`}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
  >

    {/* 🔷 TOGGLE BUTTON — moved OUTSIDE brand */}
    <a
      href="#!"
      onClick={(e) => {
        e.preventDefault();
      
        setWrapperHover(false);
        setHovered(false);
      
        setTimeout(() => {
          toggleSidebar();
        }, 0);
      }}
      style={{
        position: "absolute",
        top: "20px",
        right: "0",
        transform: "translate(50%, 0)", // ⭐ sticks to sidebar edge
        zIndex: 1001,
        backgroundColor: "#696cff",
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        cursor: "pointer",
        textDecoration: "none",
        border: "3px solid #f5f5f9",

        opacity: collapsed && !hovered ? 0 : 1,
        pointerEvents: collapsed && !hovered ? "none" : "auto",
        transition: "opacity 0.2s ease"
      }}
    >
      <i
        className={`bx ${
          !collapsed
            ? "bx-chevron-left"
            : hovered
            ? "bx-chevron-right"
            : ""
        }`}
        style={{ color: "#fff", fontSize: "18px" }}
      ></i>
    </a>

    {/* 🔷 BRAND */}
    <div className="app-brand demo">
      <a href="#!" className="app-brand-link text-decoration-none">
        <span className="app-brand-logo demo">
          <img src={logo} alt="Sneat logo" className="sidebar-logo" />
        </span>

        <span className="app-brand-text demo menu-text fw-bold ms-2">
          Sneat
        </span>
      </a>
    </div>

    <div className="menu-inner-shadow"></div>

      {/* Menu Items */}
      <ul className="menu-inner py-1">
      <li
          className={`menu-item 
            ${openMenu === "dashboards" ? "open" : ""} 
            ${location.pathname === "/analytics" ? "active" : ""}`}
        >
          <a
            href="#"
            className="menu-link menu-toggle text-decoration-none"
            onClick={(e) => {
              e.preventDefault();
              setOpenMenu(openMenu === "dashboards" ? null : "dashboards");
            }}
          >
            <i className="menu-icon icon-base bx bx-home-smile"></i>
            <div className="menu-text">Dashboards</div>
          </a>

          <ul className="menu-sub">
            <li className={`menu-item ${location.pathname === "/analytics" ? "active" : ""}`}>
              <Link to="/analytics" className="menu-link text-decoration-none">
                <div className="menu-text">Analytics</div>
              </Link>
            </li>
          </ul>
        </li>


  {/* DataTable */}
<li
  className={`menu-item 
    ${openMenu === "datatable" ? "open" : ""} 
    ${location.pathname === "/tables-datatables-advanced" ? "active" : ""}`}
>
  <a
    href="#"
    className="menu-link menu-toggle text-decoration-none"
    onClick={(e) => {
      e.preventDefault();
      setOpenMenu(openMenu === "datatable" ? null : "datatable");
    }}
  >
    <i className="menu-icon icon-base bx bx-table"></i>
    <div className="menu-text">DataTable</div>
  </a>

  <ul className="menu-sub">
    <li
      className={`menu-item ${
        location.pathname === "/tables-datatables-advanced" ? "active" : ""
      }`}
    >
      <Link
        to="/tables-datatables-advanced"
        className="menu-link text-decoration-none"
      >
        <div className="menu-text">Advanced</div>
      </Link>
    </li>
  </ul>
</li>

        </ul>
    </aside>
  );
};

export default Sidebar;