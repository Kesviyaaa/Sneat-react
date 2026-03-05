import { useState, useEffect } from "react";import logo from "../../assets/sneat.svg";
import "../css/sidebar.css";
import { Link, useLocation } from "react-router-dom";
import "boxicons/css/boxicons.min.css";

const Sidebar = ({ collapsed, toggleSidebar, setWrapperHover }) => {
  const location = useLocation();

  // ✅ STATE FIRST
  const [hovered, setHovered] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [openSubSubMenu, setOpenSubSubMenu] = useState(null);
  

  // ✅ THEN computed values
  const isDashboardActive =
  location.pathname === "/analytics" ||
  location.pathname === "/crm" ||
  location.pathname === "/ecommerce" ||  // only exact match
  location.pathname === "/logistics" ||
  location.pathname === "/academy";

  useEffect(() => {
  if (isDashboardActive) setOpenMenu("dashboards");
  else if (isLayoutsActive) setOpenMenu("layouts");
  else if (isFrontPagesActive) setOpenMenu("front-pages");
  else if (isEcommerceActive) setOpenMenu("e-commerce");
}, [location.pathname]);

  const isLayoutsActive =
  location.pathname.startsWith("/layouts/collapsed-menu") ||
  location.pathname.startsWith("/layouts/content-navbar") ||
  location.pathname.startsWith("/layouts/content-navbar-sidebar") ||
  location.pathname.startsWith("/layouts/without-menu") ||
  location.pathname.startsWith("/layouts/without-navbar") ||
  location.pathname.startsWith("/layouts/fluid") ||
  location.pathname.startsWith("/layouts/container") ||
  location.pathname.startsWith("/layouts/blank");

  useEffect(() => {
    if (isLayoutsActive) {
      setOpenMenu("layouts");
    }
  }, [location.pathname]);


  const isFrontPagesActive =
  location.pathname.startsWith("/landing") ||
  location.pathname.startsWith("/pricing") ||
  location.pathname.startsWith("/payment") ||
  location.pathname.startsWith("/checkout") ||
  location.pathname.startsWith("/help-center");

  useEffect(() => {
    if (isFrontPagesActive) {
      setOpenMenu("front-pages");
    }
  }, [location.pathname]);




  const isEcommerceActive =
  location.pathname.startsWith("/ecommerce/dashboard") ||
  location.pathname.startsWith("/product") ||
  location.pathname.startsWith("/order") ||
  location.pathname.startsWith("/customer") ||
  location.pathname.startsWith("/reviews") ||
  location.pathname.startsWith("/referral") ||
  location.pathname.startsWith("/settings");

  const isProductsActive = location.pathname.startsWith("/product");
  const isOrderActive = location.pathname.startsWith("/order");
  const isCustomerActive = location.pathname.startsWith("/customer");
  const isCustomerDetailsActive = location.pathname.startsWith("/customer/details");
  const isSettingsActive = location.pathname.startsWith("/settings");

  useEffect(() => {
    if (isEcommerceActive) setOpenMenu("e-commerce");
    if (isProductsActive) setOpenSubMenu("products");
    if (isOrderActive) setOpenSubMenu("order");
    if (isCustomerActive) setOpenSubMenu("customer");
    if (isCustomerDetailsActive) setOpenSubSubMenu("customer-details");
    if (isSettingsActive) setOpenSubMenu("settings");
  }, [location.pathname]);



  const isStoreDetails = location.pathname === "/settings/store-details";
  const isPayments = location.pathname === "/settings/payments";
  const isCheckout = location.pathname === "/settings/checkout";
  const isShipping = location.pathname === "/settings/shipping";
  const isLocations = location.pathname === "/settings/locations";
  const isNotifications = location.pathname === "/settings/notifications";

  useEffect(() => {
    if (isSettingsActive) {
      setOpenMenu("e-commerce");       // open eCommerce
      setOpenSubMenu("settings");      // open Settings submenu
    }
  }, [location.pathname]);


  const [activeAcademyItem, setActiveAcademyItem] = useState(null);
  

  
  






















  // ✅ Hover to temporarily expand
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
        toggleSidebar();
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
        {/* Dashboards */}
        <li
  className={`menu-item 
    ${openMenu === "dashboards" ? "open" : ""} 
    ${isDashboardActive ? "active" : ""}`}
>
  <a
    href="#"
    className="menu-link menu-toggle text-decoration-none"
    aria-expanded={openMenu === "dashboards"}
    onClick={(e) => {
      e.preventDefault();
      setOpenMenu(openMenu === "dashboards" ? null : "dashboards");
    }}
  >
    <i className="menu-icon icon-base bx bx-home-smile"></i>
    <div className="menu-text">Dashboards</div>
    <div className="badge text-bg-danger rounded-pill ms-auto">5</div>
  </a>

  <ul className="menu-sub">
    
    <li className={`menu-item ${location.pathname === "/analytics" ? "active" : ""}`}>
      <Link to="/analytics" className="menu-link text-decoration-none">
        <div className="menu-text">Analytics</div>
      </Link>
    </li>

    <li className={`menu-item ${location.pathname === "/crm" ? "active" : ""}`}>
      <Link to="/crm" className="menu-link text-decoration-none">
        <div className="menu-text">CRM</div>
      </Link>
    </li>

    <li className={`menu-item ${location.pathname === "/ecommerce" ? "active" : ""}`}>
      <Link to="/ecommerce" className="menu-link text-decoration-none">
        <div className="menu-text">eCommerce</div>
      </Link>
    </li>

    <li className={`menu-item ${location.pathname === "/logistics" ? "active" : ""}`}>
      <Link to="/logistics" className="menu-link text-decoration-none">
        <div className="menu-text">Logistics</div>
      </Link>
    </li>

    <li className={`menu-item ${location.pathname === "/academy" ? "active" : ""}`}>
      <Link to="/academy" className="menu-link text-decoration-none">
        <div className="menu-text">Academy</div>
      </Link>
    </li>

  </ul>
</li>
        
<li
  className={`menu-item 
    ${openMenu === "layouts" ? "open" : ""} 
    ${isLayoutsActive ? "active" : ""}`}
>
  <a
    href="#"
    className="menu-link menu-toggle text-decoration-none"
    aria-expanded={openMenu === "layouts"}
    onClick={(e) => {
      e.preventDefault();
      setOpenMenu(openMenu === "layouts" ? null : "layouts");
    }}
  >
    <i className="menu-icon icon-base bx bx-layout"></i>
    <div className="menu-text">Layouts</div>
  </a>

  <ul className="menu-sub">

    <li className={`menu-item ${location.pathname === "/collapsed-menu" ? "active" : ""}`}>
      <Link to="/collapsed-menu" className="menu-link text-decoration-none">
        <div className="menu-text">Collapsed menu</div>
      </Link>
    </li>

    <li className={`menu-item ${location.pathname === "/content-navbar" ? "active" : ""}`}>
      <Link to="/content-navbar" className="menu-link text-decoration-none">
        <div className="menu-text">Content navbar</div>
      </Link>
    </li>

    <li className={`menu-item ${location.pathname === "/content-navbar-sidebar" ? "active" : ""}`}>
      <Link to="/content-navbar-sidebar" className="menu-link text-decoration-none">
        <div className="menu-text">Content nav + Sidebar</div>
      </Link>
    </li>

    <li className={`menu-item ${location.pathname === "/without-menu" ? "active" : ""}`}>
      <Link to="/without-menu" className="menu-link text-decoration-none">
        <div className="menu-text">Without menu</div>
      </Link>
    </li>

    <li className={`menu-item ${location.pathname === "/without-navbar" ? "active" : ""}`}>
      <Link to="/without-navbar" className="menu-link text-decoration-none">
        <div className="menu-text">Without navbar</div>
      </Link>
    </li>

    <li className={`menu-item ${location.pathname === "/fluid" ? "active" : ""}`}>
      <Link to="/fluid" className="menu-link text-decoration-none">
        <div className="menu-text">Fluid</div>
      </Link>
    </li>

    <li className={`menu-item ${location.pathname === "/container" ? "active" : ""}`}>
      <Link to="/container" className="menu-link text-decoration-none">
        <div className="menu-text">Container</div>
      </Link>
    </li>

    <li className={`menu-item ${location.pathname === "/blank" ? "active" : ""}`}>
      <Link to="/blank" className="menu-link text-decoration-none">
        <div className="menu-text">Blank</div>
      </Link>
    </li>

  </ul>
</li>

      {/* Front Pages */}
      <li
  className={`menu-item 
    ${openMenu === "front-pages" ? "open" : ""} 
    ${isFrontPagesActive ? "active" : ""}`}
>
  <a
    href="#"
    className="menu-link menu-toggle text-decoration-none"
    aria-expanded={openMenu === "front-pages"}
    onClick={(e) => {
      e.preventDefault();
      setOpenMenu(openMenu === "front-pages" ? null : "front-pages");
    }}
  >
    <i className="menu-icon icon-base bx bx-store"></i>
    <div className="menu-text">Front Pages</div>
  </a>

  <ul className="menu-sub">

    <li className={`menu-item ${location.pathname === "/landing" ? "active" : ""}`}>
      <Link to="/landing" className="menu-link text-decoration-none">
        <div className="menu-text">Landing</div>
      </Link>
    </li>

    <li className={`menu-item ${location.pathname === "/pricing" ? "active" : ""}`}>
      <Link to="/pricing" className="menu-link text-decoration-none">
        <div className="menu-text">Pricing</div>
      </Link>
    </li>

    <li className={`menu-item ${location.pathname === "/payment" ? "active" : ""}`}>
      <Link to="/payment" className="menu-link text-decoration-none">
        <div className="menu-text">Payment</div>
      </Link>
    </li>

    <li className={`menu-item ${location.pathname === "/checkout" ? "active" : ""}`}>
      <Link to="/checkout" className="menu-link text-decoration-none">
        <div className="menu-text">Checkout</div>
      </Link>
    </li>

    <li className={`menu-item ${location.pathname === "/help-center" ? "active" : ""}`}>
      <Link to="/help-center" className="menu-link text-decoration-none">
        <div className="menu-text">Help Center</div>
      </Link>
    </li>

  </ul>
</li>

      {/* Apps & Pages */}
      <li className="menu-header small">
        <span className="menu-header-text" data-i18n="Apps & Pages">Apps &amp; Pages</span>
      </li>
      <li className={`menu-item ${location.pathname === "/email" ? "active" : ""}`}>
  <Link to="/email" className="menu-link text-decoration-none">
    <i className="menu-icon icon-base bx bx-envelope"></i>
    <div className="menu-text">Email</div>
  </Link>
</li>

<li className={`menu-item ${location.pathname === "/chat" ? "active" : ""}`}>
  <Link to="/chat" className="menu-link text-decoration-none">
    <i className="menu-icon icon-base bx bx-chat"></i>
    <div className="menu-text">Chat</div>
  </Link>
</li>

<li className={`menu-item ${location.pathname === "/calendar" ? "active" : ""}`}>
  <Link to="/calendar" className="menu-link text-decoration-none">
    <i className="menu-icon icon-base bx bx-calendar"></i>
    <div className="menu-text">Calendar</div>
  </Link>
</li>

<li className={`menu-item ${location.pathname === "/kanban" ? "active" : ""}`}>
  <Link to="/kanban" className="menu-link text-decoration-none">
    <i className="menu-icon icon-base bx bx-grid"></i>
    <div className="menu-text">Kanban</div>
  </Link>
</li>
      {/* e-commerce-app menu start */}
      <li
        className={`menu-item 
          ${openMenu === "e-commerce" ? "open" : ""} 
          ${isEcommerceActive ? "active" : ""}`}
      >
        <a
          href="#"
          className="menu-link menu-toggle text-decoration-none"
          onClick={(e) => {
            e.preventDefault();
            setOpenMenu(openMenu === "e-commerce" ? null : "e-commerce");
          }}
        >
          <i className="menu-icon icon-base bx bx-store"></i>
          <div className="menu-text">eCommerce</div>
        </a>

        <ul className="menu-sub">
        <li className={`menu-item ${location.pathname === "/ecommerce/dashboard" ? "active" : ""}`}>
          <Link to="/ecommerce/dashboard" className="menu-link text-decoration-none">
            <div className="menu-text">Dashboard</div>
          </Link>
        </li>
        <li
            className={`menu-item 
              ${openSubMenu === "products" ? "open" : ""} 
              ${isProductsActive ? "active" : ""}`}
          >
            <a
              href="#"
              className="menu-link menu-toggle text-decoration-none"
              onClick={(e) => {
                e.preventDefault();
                setOpenSubMenu(openSubMenu === "products" ? null : "products");
              }}
            >
              <div className="menu-text">Products</div>
            </a>

            <ul className="menu-sub">
              <li className={`menu-item ${location.pathname === "/product/list" ? "active" : ""}`}>
                <Link to="/product/list" className="menu-link text-decoration-none">
                  <div className="menu-text">Product List</div>
                </Link>
              </li>

              <li className={`menu-item ${location.pathname === "/product/add" ? "active" : ""}`}>
                <Link to="/product/add" className="menu-link text-decoration-none">
                  <div className="menu-text">Add Product</div>
                </Link>
              </li>

              <li className={`menu-item ${location.pathname === "/product/category" ? "active" : ""}`}>
                <Link to="/product/category" className="menu-link text-decoration-none">
                  <div className="menu-text">Category List</div>
                </Link>
              </li>
            </ul>
          </li>
          <li
            className={`menu-item 
              ${openSubMenu === "order" ? "open" : ""} 
              ${isOrderActive ? "active" : ""}`}
          >
            <a
              href="#"
              className="menu-link menu-toggle text-decoration-none"
              onClick={(e) => {
                e.preventDefault();
                setOpenSubMenu(openSubMenu === "order" ? null : "order");
              }}
            >
              <div className="menu-text">Order</div>
            </a>

            <ul className="menu-sub">
              <li className={`menu-item ${location.pathname === "/order/list" ? "active" : ""}`}>
                <Link to="/order/list" className="menu-link text-decoration-none">
                  <div className="menu-text">Order List</div>
                </Link>
              </li>

              <li className={`menu-item ${location.pathname === "/order/details" ? "active" : ""}`}>
                <Link to="/order/details" className="menu-link text-decoration-none">
                  <div className="menu-text">Order Details</div>
                </Link>
              </li>
            </ul>
          </li>
          <li
            className={`menu-item 
              ${openSubMenu === "customer" ? "open" : ""} 
              ${isCustomerActive ? "active" : ""}`}
          >
            <a
              href="#"
              className="menu-link menu-toggle text-decoration-none"
              onClick={(e) => {
                e.preventDefault();
                setOpenSubMenu(openSubMenu === "customer" ? null : "customer");
              }}
            >
              <div className="menu-text">Customer</div>
            </a>

            <ul className="menu-sub">

              <li className={`menu-item ${location.pathname === "/customer/all" ? "active" : ""}`}>
                <Link to="/customer/all" className="menu-link text-decoration-none">
                  <div className="menu-text">All Customers</div>
                </Link>
              </li>

              <li
                className={`menu-item 
                  ${openSubSubMenu === "customer-details" ? "open" : ""} 
                  ${isCustomerDetailsActive ? "active" : ""}`}
              >
                <a
                  href="#"
                  className="menu-link menu-toggle text-decoration-none"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenSubSubMenu(
                      openSubSubMenu === "customer-details" ? null : "customer-details"
                    );
                  }}
                >
                  <div className="menu-text">Customer Details</div>
                </a>

                <ul className="menu-sub">
                  <li className={`menu-item ${location.pathname === "/customer/details/overview" ? "active" : ""}`}>
                    <Link to="/customer/details/overview" className="menu-link text-decoration-none">
                      <div className="menu-text">Overview</div>
                    </Link>
                  </li>

                  <li className={`menu-item ${location.pathname === "/customer/details/security" ? "active" : ""}`}>
                    <Link to="/customer/details/security" className="menu-link text-decoration-none">
                      <div className="menu-text">Security</div>
                    </Link>
                  </li>

                  <li className={`menu-item ${location.pathname === "/customer/details/billing" ? "active" : ""}`}>
                    <Link to="/customer/details/billing" className="menu-link text-decoration-none">
                      <div className="menu-text">Address & Billing</div>
                    </Link>
                  </li>

                  <li className={`menu-item ${location.pathname === "/customer/details/notifications" ? "active" : ""}`}>
                    <Link to="/customer/details/notifications" className="menu-link text-decoration-none">
                      <div className="menu-text">Notifications</div>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className={`menu-item ${location.pathname === "/reviews" ? "active" : ""}`}>
            <Link to="/reviews" className="menu-link text-decoration-none">
              <div className="menu-text">Manage Reviews</div>
            </Link>
          </li>

          <li className={`menu-item ${location.pathname === "/referral" ? "active" : ""}`}>
            <Link to="/referral" className="menu-link text-decoration-none">
              <div className="menu-text">Referrals</div>
            </Link>
          </li>
          <li
              className={`menu-item 
                ${openSubMenu === "settings" ? "open" : ""} 
                ${isSettingsActive ? "active" : ""}`}
            >
              <a
                href="#"
                className="menu-link menu-toggle text-decoration-none"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenSubMenu(openSubMenu === "settings" ? null : "settings");
                }}
              >
                <div className="menu-text">Settings</div>
              </a>

              <ul className="menu-sub">

                <li className={`menu-item ${isStoreDetails ? "active" : ""}`}>
                  <Link to="/settings/store-details" className="menu-link text-decoration-none">
                    <div className="menu-text">Store Details</div>
                  </Link>
                </li>

                <li className={`menu-item ${isPayments ? "active" : ""}`}>
                  <Link to="/settings/payments" className="menu-link text-decoration-none">
                    <div className="menu-text">Payments</div>
                  </Link>
                </li>

                <li className={`menu-item ${isCheckout ? "active" : ""}`}>
                  <Link to="/settings/checkout" className="menu-link text-decoration-none">
                    <div className="menu-text">Checkout</div>
                  </Link>
                </li>

                <li className={`menu-item ${isShipping ? "active" : ""}`}>
                  <Link to="/settings/shipping" className="menu-link text-decoration-none">
                    <div className="menu-text">Shipping & Delivery</div>
                  </Link>
                </li>

                <li className={`menu-item ${isLocations ? "active" : ""}`}>
                  <Link to="/settings/locations" className="menu-link text-decoration-none">
                    <div className="menu-text">Locations</div>
                  </Link>
                </li>

                <li className={`menu-item ${isNotifications ? "active" : ""}`}>
                  <Link to="/settings/notifications" className="menu-link text-decoration-none">
                    <div className="menu-text">Notifications</div>
                  </Link>
                </li>

              </ul>
            </li>
        </ul>
      </li>
      {/* e-commerce-app menu end */}
      {/* Academy menu start */}
      <li
  className={`menu-item 
    ${openMenu === "academy" ? "open" : ""} 
    ${activeAcademyItem ? "active" : ""}`}
>
  <a
    href="#"
    className="menu-link menu-toggle text-decoration-none"
    onClick={(e) => {
      e.preventDefault();
      setOpenMenu(openMenu === "academy" ? null : "academy");
      setActiveAcademyItem(null); // optional reset
    }}
  >
    <i className="menu-icon icon-base bx bx-book-open"></i>
    <div className="menu-text">Academy</div>
  </a>

  <ul className="menu-sub">

    <li
      className={`menu-item ${activeAcademyItem === "dashboard" ? "active" : ""}`}
      onClick={() => setActiveAcademyItem("dashboard")}
    >
      <a href="#" className="menu-link text-decoration-none">
        <div className="menu-text">Dashboard</div>
      </a>
    </li>

    <li
      className={`menu-item ${activeAcademyItem === "course" ? "active" : ""}`}
      onClick={() => setActiveAcademyItem("course")}
    >
      <a href="#" className="menu-link text-decoration-none">
        <div className="menu-text">My Course</div>
      </a>
    </li>

    <li
      className={`menu-item ${activeAcademyItem === "course-details" ? "active" : ""}`}
      onClick={() => setActiveAcademyItem("course-details")}
    >
      <a href="#" className="menu-link text-decoration-none">
        <div className="menu-text">Course Details</div>
      </a>
    </li>

  </ul>
</li>
        {/* Academy menu end */}
      {/* Logistics menu start */}
      <li className={`menu-item ${openMenu === "logistics" ? "open" : ""}`}>
        <a
          href="#"
          className="menu-link menu-toggle text-decoration-none"
          aria-expanded={openMenu === "logistics"}
          onClick={(e) => {
            e.preventDefault();
            setOpenMenu(openMenu === "logistics" ? null : "logistics");
          }}
        >
          <i className="menu-icon icon-base bx bx-car"></i>
          <div className="menu-text">Logistics</div>
        </a>

        <ul className="menu-sub">
          <li className="menu-item">
            <a href="app-logistics-dashboard.html" className="menu-link text-decoration-none">
              <div className="menu-text">Dashboard</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="app-logistics-fleet.html" className="menu-link text-decoration-none">
              <div className="menu-text">Fleet</div>
            </a>
          </li>
        </ul>
      </li>
      {/* Logistics menu end */}
      {/* Invoice menu start */}
      <li className={`menu-item ${openMenu === "invoice" ? "open" : ""}`}>
        <a
          href="#"
          className="menu-link menu-toggle text-decoration-none"
          aria-expanded={openMenu === "invoice"}
          onClick={(e) => {
            e.preventDefault();
            setOpenMenu(openMenu === "invoice" ? null : "invoice");
          }}
        >
          <i className="menu-icon icon-base bx bx-food-menu"></i>
          <div className="menu-text">Invoice</div>
        </a>

        <ul className="menu-sub">
          <li className="menu-item">
            <a href="app-invoice-list.html" className="menu-link text-decoration-none">
              <div className="menu-text">List</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="app-invoice-preview.html" className="menu-link text-decoration-none">
              <div className="menu-text">Preview</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="app-invoice-edit.html" className="menu-link text-decoration-none">
              <div className="menu-text">Edit</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="app-invoice-add.html" className="menu-link text-decoration-none">
              <div className="menu-text">Add</div>
            </a>
          </li>
        </ul>
      </li>
      {/* Invoice menu end */}
      {/* Users menu start */}
      <li className={`menu-item ${openMenu === "users" ? "open" : ""}`}>
        <a
          href="#"
          className="menu-link menu-toggle text-decoration-none"
          aria-expanded={openMenu === "users"}
          onClick={(e) => {
            e.preventDefault();
            setOpenMenu(openMenu === "users" ? null : "users");
          }}
        >
          <i className="menu-icon icon-base bx bx-user"></i>
          <div className="menu-text">Users</div>
        </a>

        <ul className="menu-sub">
          <li className="menu-item">
            <a href="app-user-list.html" className="menu-link text-decoration-none">
              <div className="menu-text">List</div>
            </a>
          </li>

          {/* View submenu */}
          <li className={`menu-item ${openSubMenu === "users-view" ? "open" : ""}`}>
            <a
              href="#"
              className="menu-link menu-toggle text-decoration-none"
              aria-expanded={openSubMenu === "users-view"}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation(); // 🔥 IMPORTANT for nested menus
                setOpenSubMenu(openSubMenu === "users-view" ? null : "users-view");
              }}
            >
              <div className="menu-text">View</div>
            </a>

            <ul className="menu-sub">
              <li className="menu-item">
                <a href="app-user-view-account.html" className="menu-link text-decoration-none">
                  <div className="menu-text">Account</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="app-user-view-security.html" className="menu-link text-decoration-none">
                  <div className="menu-text">Security</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="app-user-view-billing.html" className="menu-link text-decoration-none">
                  <div className="menu-text">Billing & Plans</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="app-user-view-notifications.html" className="menu-link text-decoration-none">
                  <div className="menu-text">Notifications</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="app-user-view-connections.html" className="menu-link text-decoration-none">
                  <div className="menu-text">Connections</div>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      {/* Users menu end */}
      <li className={`menu-item ${openMenu === "roles" ? "open" : ""}`}>
          <a
            href="#"
            className="menu-link menu-toggle text-decoration-none"
            aria-expanded={openMenu === "roles"}
            onClick={(e) => {
              e.preventDefault();
              setOpenMenu(openMenu === "roles" ? null : "roles");
            }}
          >
            <i className="menu-icon icon-base bx bx-check-shield"></i>
            <div className="menu-text">Roles & Permissions</div>
          </a>

          <ul className="menu-sub">
            <li className="menu-item">
              <a href="app-access-roles.html" className="menu-link text-decoration-none">
                <div className="menu-text">Roles</div>
              </a>
            </li>
            <li className="menu-item">
              <a href="app-access-permission.html" className="menu-link text-decoration-none">
                <div className="menu-text">Permission</div>
              </a>
            </li>
          </ul>
        </li>
        <li className={`menu-item ${openMenu === "pages" ? "open" : ""}`}>
  <a
    href="#"
    className="menu-link menu-toggle text-decoration-none"
    aria-expanded={openMenu === "pages"}
    onClick={(e) => {
      e.preventDefault();
      setOpenMenu(openMenu === "pages" ? null : "pages");
    }}
  >
    <i className="menu-icon icon-base bx bx-dock-top"></i>
    <div className="menu-text">Pages</div>
  </a>

  <ul className="menu-sub">

    {/* User Profile */}
      <li className={`menu-item ${openSubMenu === "user-profile" ? "open" : ""}`}>
        <a
          href="#"
          className="menu-link menu-toggle text-decoration-none"
          onClick={(e) => {
            e.preventDefault();
            setOpenSubMenu(
              openSubMenu === "user-profile" ? null : "user-profile"
            );
          }}
        >
          <div className="menu-text">User Profile</div>
        </a>

      <ul className="menu-sub">
        <li className="menu-item">
          <a href="pages-profile-user.html" className="menu-link text-decoration-none">
            <div className="menu-text">Profile</div>
          </a>
        </li>
        <li className="menu-item">
          <a href="pages-profile-teams.html" className="menu-link text-decoration-none">
            <div className="menu-text">Teams</div>
          </a>
        </li>
        <li className="menu-item">
          <a href="pages-profile-projects.html" className="menu-link text-decoration-none">
            <div className="menu-text">Projects</div>
          </a>
        </li>
        <li className="menu-item">
          <a href="pages-profile-connections.html" className="menu-link text-decoration-none">
            <div className="menu-text">Connections</div>
          </a>
        </li>
      </ul>
    </li>

    {/* Account Settings */}
    <li className={`menu-item ${openSubMenu === "account-settings" ? "open" : ""}`}>
      <a
        href="#"
        className="menu-link menu-toggle text-decoration-none"
        onClick={(e) => {
          e.preventDefault();
          setOpenSubMenu(
            openSubMenu === "account-settings" ? null : "account-settings"
          );
        }}
      >
        <div className="menu-text">Account Settings</div>
      </a>

      <ul className="menu-sub">
        <li className="menu-item">
          <a href="pages-account-settings-account.html" className="menu-link text-decoration-none">
            <div className="menu-text">Account</div>
          </a>
        </li>
        <li className="menu-item">
          <a href="pages-account-settings-security.html" className="menu-link text-decoration-none">
            <div className="menu-text">Security</div>
          </a>
        </li>
        <li className="menu-item">
          <a href="pages-account-settings-billing.html" className="menu-link text-decoration-none">
            <div className="menu-text">Billing & Plans</div>
          </a>
        </li>
        <li className="menu-item">
          <a href="pages-account-settings-notifications.html" className="menu-link text-decoration-none">
            <div className="menu-text">Notifications</div>
          </a>
        </li>
        <li className="menu-item">
          <a href="pages-account-settings-connections.html" className="menu-link text-decoration-none">
            <div className="menu-text">Connections</div>
          </a>
        </li>
      </ul>
    </li>

    {/* Simple links */}
    <li className="menu-item">
      <a href="pages-faq.html" className="menu-link text-decoration-none">
        <div className="menu-text">FAQ</div>
      </a>
    </li>

    <li className="menu-item">
      <a href="pages-pricing.html" className="menu-link text-decoration-none">
        <div className="menu-text">Pricing</div>
      </a>
    </li>

    {/* Misc */}
    <li className={`menu-item ${openSubMenu === "misc" ? "open" : ""}`}>
      <a
        href="#"
        className="menu-link menu-toggle text-decoration-none"
        onClick={(e) => {
          e.preventDefault();
          setOpenSubMenu(
            openSubMenu === "misc" ? null : "misc"
          );
        }}
      >
        <div className="menu-text">Misc</div>
      </a>

      <ul className="menu-sub">
        <li className="menu-item">
          <a href="pages-misc-error.html" className="menu-link text-decoration-none" target="_blank">
            <div className="menu-text">Error</div>
          </a>
        </li>
        <li className="menu-item">
          <a href="pages-misc-under-maintenance.html" className="menu-link text-decoration-none" target="_blank">
            <div className="menu-text">Under Maintenance</div>
          </a>
        </li>
        <li className="menu-item">
          <a href="pages-misc-comingsoon.html" className="menu-link text-decoration-none" target="_blank">
            <div className="menu-text">Coming Soon</div>
          </a>
        </li>
        <li className="menu-item">
          <a href="pages-misc-not-authorized.html" className="menu-link text-decoration-none" target="_blank">
            <div className="menu-text">Not Authorized</div>
          </a>
        </li>
      </ul>
    </li>

  </ul>
</li>




      <li className={`menu-item ${openMenu === "auth" ? "open" : ""}`}>
        <a
          href="#"
          className="menu-link menu-toggle text-decoration-none"
          onClick={(e) => {
            e.preventDefault();
            setOpenMenu(openMenu === "auth" ? null : "auth");
          }}
        >
          <i className="menu-icon icon-base bx bx-lock-open-alt"></i>
          <div className="menu-text">Authentications</div>
        </a>
        <ul className="menu-sub">
        <li className={`menu-item ${openSubMenu === "login" ? "open" : ""}`}>
            <a
              href="#"
              className="menu-link menu-toggle text-decoration-none"
              onClick={(e) => {
                e.preventDefault();
                setOpenSubMenu(openSubMenu === "login" ? null : "login");
              }}
            >
              <div className="menu-text">Login</div>
            </a>

            <ul className="menu-sub">
              <li className="menu-item">
                <a href="auth-login-basic.html" className="menu-link text-decoration-none" target="_blank">
                  <div className="menu-text">Basic</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="auth-login-cover.html" className="menu-link text-decoration-none" target="_blank">
                  <div className="menu-text">Cover</div>
                </a>
              </li>
            </ul>
          </li>
          <li className={`menu-item ${openSubMenu === "register" ? "open" : ""}`}>
            <a
              href="#"
              className="menu-link menu-toggle text-decoration-none"
              onClick={(e) => {
                e.preventDefault();
                setOpenSubMenu(openSubMenu === "register" ? null : "register");
              }}
            >
              <div className="menu-text">Register</div>
            </a>
            <ul className="menu-sub">
              <li className="menu-item ">
                <a href="auth-register-basic.html" className="menu-link text-decoration-none" target="_blank">
                  <div className="menu-text">Basic</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="auth-register-cover.html" className="menu-link text-decoration-none" target="_blank">
                  <div className="menu-text">Cover</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="auth-register-multisteps.html" className="menu-link text-decoration-none" target="_blank">
                  <div className="menu-text">Multi-steps</div>
                </a>
              </li>
            </ul>
          </li>
          <li className={`menu-item ${openSubMenu === "verify-email" ? "open" : ""}`}>
            <a
              href="#"
              className="menu-link menu-toggle text-decoration-none"
              onClick={(e) => {
                e.preventDefault();
                setOpenSubMenu(openSubMenu === "verify-email" ? null : "verify-email");
              }}
            >
              <div className="menu-text">Verify Email</div>
            </a>

            <ul className="menu-sub">
              <li className="menu-item">
                <a href="auth-verify-email-basic.html" className="menu-link text-decoration-none" target="_blank">
                  <div className="menu-text">Basic</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="auth-verify-email-cover.html" className="menu-link text-decoration-none" target="_blank">
                  <div className="menu-text">Cover</div>
                </a>
              </li>
            </ul>
          </li>
          <li className={`menu-item ${openSubMenu === "reset-password" ? "open" : ""}`}>
            <a
              href="#"
              className="menu-link menu-toggle text-decoration-none"
              onClick={(e) => {
                e.preventDefault();
                setOpenSubMenu(openSubMenu === "reset-password" ? null : "reset-password");
              }}
            >
              <div className="menu-text">Reset Password</div>
            </a>

            <ul className="menu-sub">
              <li className="menu-item">
                <a href="auth-reset-password-basic.html" className="menu-link text-decoration-none" target="_blank">
                  <div className="menu-text">Basic</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="auth-reset-password-cover.html" className="menu-link text-decoration-none" target="_blank">
                  <div className="menu-text">Cover</div>
                </a>
              </li>
            </ul>
          </li>
          <li className={`menu-item ${openSubMenu === "forgot-password" ? "open" : ""}`}>
            <a
              href="#"
              className="menu-link menu-toggle text-decoration-none"
              onClick={(e) => {
                e.preventDefault();
                setOpenSubMenu(openSubMenu === "forgot-password" ? null : "forgot-password");
              }}
            >
              <div className="menu-text">Forgot Password</div>
            </a>

            <ul className="menu-sub">
              <li className="menu-item">
                <a href="auth-forgot-password-basic.html" className="menu-link text-decoration-none" target="_blank">
                  <div className="menu-text">Basic</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="auth-forgot-password-cover.html" className="menu-link text-decoration-none" target="_blank">
                  <div className="menu-text">Cover</div>
                </a>
              </li>
            </ul>
          </li>
          <li className={`menu-item ${openSubMenu === "two-steps" ? "open" : ""}`}>
            <a
              href="#"
              className="menu-link menu-toggle text-decoration-none"
              onClick={(e) => {
                e.preventDefault();
                setOpenSubMenu(openSubMenu === "two-steps" ? null : "two-steps");
              }}
            >
              <div className="menu-text">Two Steps</div>
            </a>
            <ul className="menu-sub">
              <li className="menu-item">
                <a href="auth-two-steps-basic.html" className="menu-link text-decoration-none" target="_blank">
                  <div className="menu-text">Basic</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="auth-two-steps-cover.html" className="menu-link text-decoration-none" target="_blank">
                  <div className="menu-text">Cover</div>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </li>



      <li className={`menu-item ${openMenu === "wizard-examples" ? "open" : ""}`}>
        <a
          href="#"
          className="menu-link menu-toggle text-decoration-none"
          onClick={(e) => {
            e.preventDefault();
            setOpenMenu(openMenu === "wizard-examples" ? null : "wizard-examples");
          }}
        >
          <i className="menu-icon icon-base bx bx-lock-open-alt"></i>
          <div className="menu-text">Wizard Examples</div>
        </a>
        <ul className="menu-sub">
          <li className="menu-item">
            <a href="wizard-ex-checkout.html" className="menu-link text-decoration-none">
              <div className="menu-text">Checkout</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="wizard-ex-property-listing.html" className="menu-link text-decoration-none">
              <div className="menu-text">Property Listing</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="wizard-ex-create-deal.html" className="menu-link text-decoration-none">
              <div className="menu-text">Create Deal</div>
            </a>
          </li>
        </ul>
      </li>
      <li className="menu-item">
        <a href="modal-examples.html" className="menu-link text-decoration-none">
          <i className="menu-icon icon-base bx bx-window-open"></i>
          <div className="menu-text">Modal Examples</div>
        </a>
      </li>

      {/* Components */}
      <li className="menu-header small">
        <span className="menu-header-text" data-i18n="Components">Components</span>
      </li>
      {/* Cards */}
      <li className={`menu-item ${openMenu === "cards" ? "open" : ""}`}>
        <a
          href="#"
          className="menu-link menu-toggle text-decoration-none"
          onClick={(e) => {
            e.preventDefault();
            setOpenMenu(openMenu === "cards" ? null : "cards");
          }}
        >
          <i className="menu-icon icon-base bx bx-collection"></i>
          <div className="menu-text">Cards</div>
          <div className="badge text-bg-primary rounded-pill ms-auto">6</div>
        </a>
        <ul className="menu-sub">
          <li className="menu-item">
            <a href="cards-basic.html" className="menu-link text-decoration-none">
              <div className="menu-text">Basic</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="cards-advance.html" className="menu-link text-decoration-none">
              <div className="menu-text">Advance</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="cards-statistics.html" className="menu-link text-decoration-none">
              <div className="menu-text">Statistics</div>
            </a>
          </li>
          <li className={`menu-item ${location.pathname === "/analytics" ? "active" : ""}`}>
        <Link to="/analytics" className="menu-link text-decoration-none">
          <i className="menu-icon icon-base bx bx-home-smile"></i>
          <div className="menu-text">Analytics</div>
        </Link>
      </li>
          <li className="menu-item">
            <a href="cards-gamifications.html" className="menu-link text-decoration-none">
              <div className="menu-text">Gamifications</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="cards-actions.html" className="menu-link text-decoration-none">
              <div className="menu-text">Actions</div>
            </a>
          </li>
        </ul>
      </li>
      {/* User interface */}
      <li className={`menu-item ${openMenu === "ui" ? "open" : ""}`}>
        <a
          href="#"
          className="menu-link menu-toggle text-decoration-none"
          onClick={(e) => {
            e.preventDefault();
            setOpenMenu(openMenu === "ui" ? null : "ui");
          }}
        >
          <i className="menu-icon icon-base bx bx-box"></i>
          <div className="menu-text">User interface</div>
        </a>
        <ul className="menu-sub">
          <li className="menu-item">
            <a href="ui-accordion.html" className="menu-link text-decoration-none">
              <div className="menu-text">Accordion</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="ui-alerts.html" className="menu-link text-decoration-none">
              <div className="menu-text">Alerts</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="ui-badges.html" className="menu-link text-decoration-none">
              <div className="menu-text">Badges</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="ui-buttons.html" className="menu-link text-decoration-none">
              <div className="menu-text">Buttons</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="ui-carousel.html" className="menu-link text-decoration-none">
              <div className="menu-text">Carousel</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="ui-collapse.html" className="menu-link text-decoration-none">
              <div className="menu-text">Collapse</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="ui-dropdowns.html" className="menu-link text-decoration-none">
              <div className="menu-text">Dropdowns</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="ui-footer.html" className="menu-link text-decoration-none">
              <div className="menu-text">Footer</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="ui-list-groups.html" className="menu-link text-decoration-none">
              <div className="menu-text">List groups</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="ui-modals.html" className="menu-link text-decoration-none">
              <div className="menu-text">Modals</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="ui-navbar.html" className="menu-link text-decoration-none">
              <div className="menu-text">Navbar</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="ui-offcanvas.html" className="menu-link text-decoration-none">
              <div className="menu-text">Offcanvas</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="ui-pagination-breadcrumbs.html" className="menu-link text-decoration-none">
              <div className="menu-text">Pagination &amp; Breadcrumbs</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="ui-progress.html" className="menu-link text-decoration-none">
              <div className="menu-text">Progress</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="ui-spinners.html" className="menu-link text-decoration-none">
              <div className="menu-text">Spinners</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="ui-tabs-pills.html" className="menu-link text-decoration-none">
              <div className="menu-text">Tabs &amp; Pills</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="ui-toasts.html" className="menu-link text-decoration-none">
              <div className="menu-text">Toasts</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="ui-tooltips-popovers.html" className="menu-link text-decoration-none">
              <div className="menu-text">Tooltips &amp; Popovers</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="ui-typography.html" className="menu-link text-decoration-none">
              <div className="menu-text">Typography</div>
            </a>
          </li>
        </ul>
      </li>

      {/* Extended components */}
      <li className={`menu-item ${openMenu === "ex-ui" ? "open" : ""}`}>
        <a
          href="#"
          className="menu-link menu-toggle text-decoration-none"
          onClick={(e) => {
            e.preventDefault();
            setOpenMenu(openMenu === "ex-ui" ? null : "ex-ui");
          }}
        >
          <i className="menu-icon icon-base bx bx-copy"></i>
          <div className="menu-text">Extended UI</div>
        </a>
        <ul className="menu-sub">
          <li className="menu-item">
            <a href="extended-ui-avatar.html" className="menu-link text-decoration-none">
              <div className="menu-text">Avatar</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="extended-ui-blockui.html" className="menu-link text-decoration-none">
              <div className="menu-text">BlockUI</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="extended-ui-drag-and-drop.html" className="menu-link text-decoration-none">
              <div className="menu-text">Drag &amp; Drop</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="extended-ui-media-player.html" className="menu-link text-decoration-none">
              <div className="menu-text">Media Player</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="extended-ui-perfect-scrollbar.html" className="menu-link text-decoration-none">
              <div className="menu-text">Perfect Scrollbar</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="extended-ui-star-ratings.html" className="menu-link text-decoration-none">
              <div className="menu-text">Star Ratings</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="extended-ui-sweetalert2.html" className="menu-link text-decoration-none">
              <div className="menu-text">SweetAlert2</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="extended-ui-text-divider.html" className="menu-link text-decoration-none">
              <div className="menu-text">Text Divider</div>
            </a>
          </li>
          <li className={`menu-item ${openSubMenu === "timeline" ? "open" : ""}`}>
            <a
              href="#"
              className="menu-link menu-toggle text-decoration-none"
              onClick={(e) => {
                e.preventDefault();
                setOpenSubMenu(openSubMenu === "timeline" ? null : "timeline");
              }}
            >
              <div className="menu-text">Timeline</div>
            </a>
            <ul className="menu-sub">
              <li className="menu-item">
                <a href="extended-ui-timeline-basic.html" className="menu-link text-decoration-none">
                  <div className="menu-text">Basic</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="extended-ui-timeline-fullscreen.html" className="menu-link text-decoration-none">
                  <div className="menu-text">Fullscreen</div>
                </a>
              </li>
            </ul>
          </li>
          <li className="menu-item">
            <a href="extended-ui-tour.html" className="menu-link text-decoration-none">
              <div className="menu-text">Tour</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="extended-ui-treeview.html" className="menu-link text-decoration-none">
              <div className="menu-text">Treeview</div> 
            </a>
          </li>
          <li className="menu-item">
            <a href="extended-ui-misc.html" className="menu-link text-decoration-none">
              <div className="menu-text">Miscellaneous</div>
            </a>
          </li>
        </ul>
      </li>

      {/* Icons */}
      <li className={`menu-item ${openMenu === "icons" ? "open" : ""}`}>
        <a
          href="#"
          className="menu-link menu-toggle text-decoration-none"
          onClick={(e) => {
            e.preventDefault();
            setOpenMenu(openMenu === "icons" ? null : "icons");
          }}
        >
          <i className="menu-icon icon-base bx bx-crown"></i>
          <div className="menu-text">Icons</div>
        </a>
        <ul className="menu-sub">
          <li className="menu-item">
            <a href="icons-boxicons.html" className="menu-link  text-decoration-none">
              <div className="menu-text">Boxicons</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="icons-font-awesome.html" className="menu-link  text-decoration-none">
              <div className="menu-text">Font Awesome</div>
            </a>
          </li>
        </ul>
      </li>

      {/* Forms & Tables */}
      <li className="menu-header small">
        <span className="menu-header-text" data-i18n="Forms & Tables">Forms &amp; Tables</span>
      </li>
      {/* Forms */}
      <li className={`menu-item ${openMenu === "form-elements" ? "open" : ""}`}>
        <a
          href="#"
          className="menu-link menu-toggle text-decoration-none"
          onClick={(e) => {
            e.preventDefault();
            setOpenMenu(openMenu === "form-elements" ? null : "form-elements");
          }}
        >
          <i className="menu-icon icon-base bx bx-detail"></i>
          <div className="menu-text">Form Elements</div>
        </a>
        <ul className="menu-sub">
          <li className="menu-item">
            <a href="forms-basic-inputs.html" className="menu-link text-decoration-none">
              <div className="menu-text">Basic Inputs</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="forms-input-groups.html" className="menu-link text-decoration-none">
              <div className="menu-text">Input groups</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="forms-custom-options.html" className="menu-link text-decoration-none">
              <div className="menu-text">Custom Options</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="forms-editors.html" className="menu-link text-decoration-none">
              <div className="menu-text">Editors</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="forms-file-upload.html" className="menu-link text-decoration-none">
              <div className="menu-text">File Upload</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="forms-pickers.html" className="menu-link text-decoration-none">
              <div className="menu-text">Pickers</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="forms-selects.html" className="menu-link text-decoration-none">
              <div className="menu-text">Select &amp; Tags</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="forms-sliders.html" className="menu-link text-decoration-none">
              <div className="menu-text">Sliders</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="forms-switches.html" className="menu-link text-decoration-none">
              <div className="menu-text">Switches</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="forms-extras.html" className="menu-link text-decoration-none">
              <div className="menu-text">Extras</div>
            </a>
          </li>
        </ul>
      </li>
      <li className={`menu-item ${openMenu === "form-layout" ? "open" : ""}`}>
        <a
          href="#"
          className="menu-link menu-toggle text-decoration-none"
          onClick={(e) => {
            e.preventDefault();
            setOpenMenu(openMenu === "form-layout" ? null : "form-layout");
          }}
        >
          <i className="menu-icon icon-base bx bx-detail"></i>
          <div className="menu-text">Form Layouts</div>
        </a>
        <ul className="menu-sub">
          <li className="menu-item">
            <a href="form-layouts-vertical.html" className="menu-link text-decoration-none">
              <div className="menu-text">Vertical Form</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="form-layouts-horizontal.html" className="menu-link text-decoration-none">
              <div className="menu-text">Horizontal Form</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="form-layouts-sticky.html" className="menu-link text-decoration-none">
              <div className="menu-text">Sticky Actions</div>
            </a>
          </li>
        </ul>
      </li>
      <li className={`menu-item ${openMenu === "form-wizard" ? "open" : ""}`}>
        <a
          href="#"
          className="menu-link menu-toggle text-decoration-none"
          onClick={(e) => {
            e.preventDefault();
            setOpenMenu(openMenu === "form-wizard" ? null : "form-wizard");
          }}
        >
          <i className="menu-icon icon-base bx bx-carousel"></i>
          <div className="menu-text">Form Wizard</div>
        </a>
        <ul className="menu-sub">
          <li className="menu-item">
            <a href="form-wizard-numbered.html" className="menu-link text-decoration-none">
              <div className="menu-text">Numbered</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="form-wizard-icons.html" className="menu-link text-decoration-none">
              <div className="menu-text">Icons</div>
            </a>
          </li>
        </ul>
      </li>
      <li className="menu-item">
        <a href="form-validation.html" className="menu-link text-decoration-none">
          <i className="menu-icon icon-base bx bx-list-check"></i>
          <div className="menu-text">Form Validation</div>
        </a>
      </li>
      {/* Tables */}
      <li className="menu-item">
        <a href="tables-basic.html" className="menu-link text-decoration-none">
          <i className="menu-icon icon-base bx bx-table"></i>
          <div className="menu-text">Tables</div>
        </a>
      </li>
      <li className={`menu-item ${openMenu === "datatables" ? "open" : ""}`}>
        <a
          href="#"
          className="menu-link menu-toggle text-decoration-none"
          onClick={(e) => {
            e.preventDefault();
            setOpenMenu(openMenu === "datatables" ? null : "datatables");
          }}
        >
          <i className="menu-icon icon-base bx bx-grid"></i>
          <div className="menu-text">Datatables</div>
        </a>
        <ul className="menu-sub">
          <li className="menu-item">
            <a href="tables-datatables-basic.html" className="menu-link text-decoration-none">
              <div className="menu-text">Basic</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="/tables-datatables-advanced" className="menu-link text-decoration-none">
              <div>Advanced</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="tables-datatables-extensions.html" className="menu-link text-decoration-none">
              <div className="menu-text">Extensions</div>
            </a>
          </li>
        </ul>
      </li>

      {/* Charts & Maps */}
      <li className="menu-header small">
        <span className="menu-header-text" data-i18n="Charts & Maps">Charts &amp; Maps</span>
      </li>
      <li className={`menu-item ${openMenu === "charts" ? "open" : ""}`}>
        <a
          href="#"
          className="menu-link menu-toggle text-decoration-none"
          onClick={(e) => {
            e.preventDefault();
            setOpenMenu(openMenu === "charts" ? null : "charts");
          }}
        >
          <i className="menu-icon icon-base bx bx-chart"></i>
          <div className="menu-text">Charts</div>
        </a>
        <ul className="menu-sub">
          <li className="menu-item">
            <a href="charts-apex.html" className="menu-link text-decoration-none">
              <div className="menu-text">Apex Charts</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="charts-chartjs.html" className="menu-link text-decoration-none">
              <div className="menu-text">ChartJS</div>
            </a>
          </li>
        </ul>
      </li>
      <li className="menu-item">
        <a href="maps-leaflet.html" className="menu-link text-decoration-none">
          <i className="menu-icon icon-base bx bx-map-alt"></i>
          <div className="menu-text">Leaflet Maps</div>
        </a>
      </li>

      {/* Misc */}
      <li className="menu-header small">
        <span className="menu-header-text" data-i18n="Misc">Misc</span>
      </li>

      {/* Multi Level Menu */}
      <li className={`menu-item ${openMenu === "multi-level" ? "open" : ""}`}>
        <a
          href="#"
          className="menu-link menu-toggle text-decoration-none"
          onClick={(e) => {
            e.preventDefault();
            setOpenMenu(openMenu === "multi-level" ? null : "multi-level");
          }}
        >
          <i className="menu-icon icon-base bx bx-grid"></i>
          <div className="menu-text">Multi Level</div>
        </a>
        <ul className="menu-sub">
        <li className={`menu-item ${openSubMenu === "level2" ? "open" : ""}`}>
            <a
              href="#"
              className="menu-link menu-toggle text-decoration-none"
              onClick={(e) => {
                e.preventDefault();
                setOpenSubMenu(openSubMenu === "level2" ? null : "level2");
              }}
            >
              <div className="menu-text">Level 2</div>
            </a>
            <ul className="menu-sub">
              <li className="menu-item">
                <a href="javascript:void(0)" className="menu-link text-decoration-none">
                  <div className="menu-text">Level 3</div>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li className="menu-item">
        <a href="https://themeselection.com/support/" target="_blank" className="menu-link text-decoration-none">
          <i className="menu-icon icon-base bx bx-support"></i>
          <div className="menu-text">Support</div>
        </a>
      </li>
      <li className="menu-item">
        <a href="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/documentation/" target="_blank" className="menu-link text-decoration-none">
          <i className="menu-icon icon-base bx bx-file"></i>
          <div className="menu-text">Documentation</div>
        </a>
      </li>

        </ul>
    </aside>
  );
};

export default Sidebar;