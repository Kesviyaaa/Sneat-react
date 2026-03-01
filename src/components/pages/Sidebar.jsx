import React from "react";
import logo from "../../assets/logo.png";
import "../css/sidebar.css";
import { useState } from "react";

const Sidebar = ({ toggleSidebar }) => {
  const toggleMenu = (e) => {
    e.preventDefault();
    const parent = e.currentTarget.closest(".menu-item");
    parent.classList.toggle("open");
  };
  const [openMenu, setOpenMenu] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [openSubSubMenu, setOpenSubSubMenu] = useState(null);

  
  
  return (
    <aside id="layout-menu" className="layout-menu menu-vertical menu">
      {/* App Brand / Logo */}
      <div className="app-brand demo">
        <a href="index.html" className="app-brand-link text-decoration-none"> 
          <span className="app-brand-logo demo">
            <span className="text-primary">
              {/* SVG Logo */}
              <span className="app-brand-logo demo">
              <img src={logo} alt="Sneat logo" height="90" width="80" /></span>
            </span>
          </span>
          <span className="app-brand-text demo menu-text fw-bold ms-2">Sneat</span>
        </a>

        <a
          href="javascript:void(0);"
          className="layout-menu-toggle menu-link text-large ms-auto"
          onClick={(e) => {
    e.preventDefault();
    toggleSidebar();
  }}
        >
          <i className="icon-base bx bx-chevron-left"></i>
        </a>
      </div>

      <div className="menu-inner-shadow"></div>

      {/* Menu Items */}
      <ul className="menu-inner py-1">
        {/* Dashboards */}
        <li className={`menu-item ${openMenu === "dashboards" ? "open" : ""}`}>
        <a
  href="#"
  className="menu-link menu-toggle text-decoration-none"
  aria-expanded={openMenu === "dashboards"}
  onClick={(e) => {
    e.preventDefault();
    setOpenMenu(openMenu === "dashboards" ? null : "dashboards");
  }}
>
            <i className="menu-icon icon-base bx bx-home-smile text-decoration-none"></i>
            <div className="menu-text">Dashboards</div>
            <div className="badge text-bg-danger rounded-pill ms-auto px-3 py-2 fs-6">5</div>
          </a>
          <ul className="menu-sub">
            <li className="menu-item">
              <a href="dashboards-analytics.html" className="menu-link text-decoration-none">
                <div className="menu-text">Analytics</div>
              </a>
            </li>
            <li className="menu-item">
              <a href="dashboards-crm.html" className="menu-link text-decoration-none">
                <div className="menu-text">CRM</div>
              </a>
            </li>
            <li className="menu-item active">
              <a href="app-ecommerce-dashboard.html" className="menu-link text-decoration-none">
                <div className="menu-text">eCommerce</div>
              </a>
            </li>
            <li className="menu-item">
              <a href="app-logistics-dashboard.html" className="menu-link text-decoration-none">
                <div className="menu-text">Logistics</div>
              </a>
            </li>
            <li className="menu-item">
              <a href="app-academy-dashboard.html" className="menu-link text-decoration-none">
                <div className="menu-text">Academy</div>
              </a>
            </li>
          </ul>
        </li>
        
        <li className={`menu-item ${openMenu === "layouts" ? "open" : ""}`}>
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
              <li className="menu-item">
                <a href="layouts-collapsed-menu.html" className="menu-link text-decoration-none">
                  <div className="menu-text">Collapsed menu</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="layouts-content-navbar.html" className="menu-link text-decoration-none">
                  <div className="menu-text">Content navbar</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="layouts-content-navbar-with-sidebar.html" className="menu-link text-decoration-none">
                  <div className="menu-text">Content nav + Sidebar</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="../horizontal-menu-template/" className="menu-link text-decoration-none" target="_blank" rel="noreferrer">
                  <div className="menu-text">Horizontal</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="layouts-without-menu.html" className="menu-link text-decoration-none">
                  <div className="menu-text">Without menu</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="layouts-without-navbar.html" className="menu-link text-decoration-none">
                  <div className="menu-text">Without navbar</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="layouts-fluid.html" className="menu-link text-decoration-none">
                  <div className="menu-text">Fluid</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="layouts-container.html" className="menu-link text-decoration-none">
                  <div className="menu-text">Container</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="layouts-blank.html" className="menu-link text-decoration-none">
                  <div className="menu-text">Blank</div>
                </a>
              </li>
            </ul>
          </li>

      {/* Front Pages */}
      <li className={`menu-item ${openMenu === "front-pages" ? "open" : ""}`}>
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
          <li className="menu-item">
            <a href="../front-pages/landing-page.html" className="menu-link text-decoration-none" target="_blank">
              <div className="menu-text">Landing</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="../front-pages/pricing-page.html" className="menu-link text-decoration-none" target="_blank">
              <div className="menu-text">Pricing</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="../front-pages/payment-page.html" className="menu-link text-decoration-none" target="_blank">
              <div className="menu-text">Payment</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="../front-pages/checkout-page.html" className="menu-link text-decoration-none" target="_blank">
              <div className="menu-text">Checkout</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="../front-pages/help-center-landing.html" className="menu-link text-decoration-none" target="_blank">
              <div className="menu-text">Help Center</div>
            </a>
          </li>
        </ul>
      </li>

      {/* Apps & Pages */}
      <li className="menu-header small">
        <span className="menu-header-text" data-i18n="Apps & Pages">Apps &amp; Pages</span>
      </li>
      <li className="menu-item">
        <a href="app-email.html" className="menu-link text-decoration-none">
          <i className="menu-icon icon-base bx bx-envelope"></i>
          <div className="menu-text">Email</div>
        </a>
      </li>
      <li className="menu-item">
        <a href="app-chat.html" className="menu-link text-decoration-none">
          <i className="menu-icon icon-base bx bx-chat"></i>
          <div className="menu-text">Chat</div>
        </a>
      </li>
      <li className="menu-item">
        <a href="app-calendar.html" className="menu-link text-decoration-none">
          <i className="menu-icon icon-base bx bx-calendar"></i>
          <div className="menu-text">Calendar</div>
        </a>
      </li>
      <li className="menu-item">
        <a href="app-kanban.html" className="menu-link text-decoration-none">
          <i className="menu-icon icon-base bx bx-grid"></i>
          <div className="menu-text">Kanban</div>
        </a>
      </li>
      {/* e-commerce-app menu start */}
      <li className={`menu-item ${openMenu === "e-commerce" ? "open" : ""}`}>
      <a
              href="#"
              className="menu-link menu-toggle text-decoration-none"
              aria-expanded={openMenu === "e-commerce"}
              onClick={(e) => {
                e.preventDefault();
                setOpenMenu(openMenu === "e-commerce" ? null : "e-commerce");
              }}
            >
          <i className="menu-icon icon-base bx bx-store"></i>
          <div className="menu-text">eCommerce</div>
        </a>
        <ul className="menu-sub">
          <li className="menu-item">
            <a href="app-ecommerce-dashboard.html" className="menu-link text-decoration-none">
              <div className="menu-text">Dashboard</div>
            </a>
          </li>
          <li className={`menu-item ${openSubMenu === "products" ? "open" : ""}`}>
              <a
                href="#"
                className="menu-link menu-toggle text-decoration-none"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenSubMenu(openSubMenu === "products" ? null : "products");
                  setOpenSubSubMenu(null);
                }}
              >
                <div className="menu-text">Products</div>
              </a>
            <ul className="menu-sub">
              <li className="menu-item">
                <a href="app-ecommerce-product-list.html" className="menu-link text-decoration-none">
                  <div className="menu-text">Product List</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="app-ecommerce-product-add.html" className="menu-link text-decoration-none">
                  <div className="menu-text">Add Product</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="app-ecommerce-category-list.html" className="menu-link text-decoration-none">
                  <div className="menu-text">Category List</div>
                </a>
              </li>
            </ul>
          </li>
          <li className={`menu-item ${openSubMenu === "order" ? "open" : ""}`}>
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
              <li className="menu-item">
                <a href="app-ecommerce-order-list.html" className="menu-link text-decoration-none">
                  <div className="menu-text">Order List</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="app-ecommerce-order-details.html" className="menu-link text-decoration-none">
                  <div className="menu-text">Order Details</div>
                </a>
              </li>
            </ul>
          </li>
          <li className={`menu-item ${openSubMenu === "customer" ? "open" : ""}`}>
            <a
              href="#"
              className="menu-link menu-toggle text-decoration-none"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                setOpenSubMenu(openSubMenu === "customer" ? null : "customer");
                setOpenSubSubMenu(null); // ✅ important reset
              }}
            >
              <div className="menu-text">Customer</div>
            </a>
            <ul className="menu-sub">
              <li className="menu-item">
                <a href="app-ecommerce-customer-all.html" className="menu-link text-decoration-none ">
                  <div className="menu-text">All Customers</div>
                </a>
              </li>
              <li className={`menu-item ${openSubSubMenu === "customer-details" ? "open" : ""}`}>
                <a
                  href="#"
                  className="menu-link menu-toggle text-decoration-none"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    setOpenSubSubMenu(prev =>
                      prev === "customer-details" ? null : "customer-details"
                    );
                  }}
                >
                  <div className="menu-text">Customer Details</div>
                </a>
                <ul className="menu-sub">
                  <li className="menu-item">
                    <a href="app-ecommerce-customer-details-overview.html" className="menu-link text-decoration-none">
                      <div className="menu-text">Overview</div>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="app-ecommerce-customer-details-security.html" className="menu-link text-decoration-none">
                      <div className="menu-text">Security</div>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="app-ecommerce-customer-details-billing.html" className="menu-link text-decoration-none">
                      <div className="menu-text">Address & Billing</div>
                    </a>
                  </li>
                  <li className="menu-item">
                    <a href="app-ecommerce-customer-details-notifications.html" className="menu-link text-decoration-none">
                      <div className="menu-text">Notifications</div>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="menu-item">
            <a href="app-ecommerce-manage-reviews.html" className="menu-link text-decoration-none">
              <div className="menu-text">Manage Reviews</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="app-ecommerce-referral.html" className="menu-link text-decoration-none">
              <div className="menu-text">Referrals</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="javascript:void(0);" className="menu-link menu-toggle text-decoration-none">
              <div className="menu-text">Settings</div>
            </a>
            <ul className="menu-sub">
              <li className="menu-item">
                <a href="app-ecommerce-settings-detail.html" className="menu-link">
                  <div className="menu-text">Store Details</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="app-ecommerce-settings-payments.html" className="menu-link">
                  <div className="menu-text">Payments</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="app-ecommerce-settings-checkout.html" className="menu-link">
                  <div className="menu-text">Checkout</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="app-ecommerce-settings-shipping.html" className="menu-link">
                  <div className="menu-text">Shipping & Delivery</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="app-ecommerce-settings-locations.html" className="menu-link">
                  <div className="menu-text">Locations</div>
                </a>
              </li>
              <li className="menu-item">
                <a href="app-ecommerce-settings-notifications.html" className="menu-link">
                  <div className="menu-text">Notifications</div>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      {/* e-commerce-app menu end */}
      {/* Academy menu start */}
        <li className={`menu-item ${openMenu === "academy" ? "open" : ""}`}>
          <a
            href="#"
            className="menu-link menu-toggle text-decoration-none"
            aria-expanded={openMenu === "academy"}
            onClick={(e) => {
              e.preventDefault();
              setOpenMenu(openMenu === "academy" ? null : "academy");
              setOpenSubMenu(null); // optional but recommended
              setOpenSubSubMenu(null); // optional but recommended
            }}
          >
            <i className="menu-icon icon-base bx bx-book-open"></i>
            <div className="menu-text">Academy</div>
          </a>

          <ul className="menu-sub">
            <li className="menu-item">
              <a href="app-academy-dashboard.html" className="menu-link text-decoration-none">
                <div className="menu-text">Dashboard</div>
              </a>
            </li>
            <li className="menu-item">
              <a href="app-academy-course.html" className="menu-link text-decoration-none">
                <div className="menu-text">My Course</div>
              </a>
            </li>
            <li className="menu-item">
              <a href="app-academy-course-details.html" className="menu-link text-decoration-none">
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
          <li className="menu-item">
            <a href="cards-analytics.html" className="menu-link text-decoration-none">
              <div className="menu-text">Analytics</div>
            </a>
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
            <a href="tables-datatables-advanced.html" className="menu-link text-decoration-none">
              <div className="menu-text">Advanced</div>
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