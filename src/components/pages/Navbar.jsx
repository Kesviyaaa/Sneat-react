import React, { useState, useRef, useEffect } from "react";
import "../css/navbar.css";


const Navbar = ({collapsed}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);
  const [themeOpen, setThemeOpen] = useState(false);
  const themeRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (themeRef.current && !themeRef.current.contains(e.target)) {
        setThemeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Function to change theme
  const handleThemeChange = (theme) => {
    const body = document.body;
    body.classList.remove("theme-light", "theme-dark", "theme-system");
    if (theme === "system") {
      body.classList.add("theme-system");
    } else if (theme === "light") {
      body.classList.add("theme-light");
    } else {
      body.classList.add("theme-dark");
    }
  };

  return (
    <nav
      className={`layout-navbar navbar navbar-expand-xl align-items-center bg-navbar-theme ${
        collapsed ? "sidebar-collapsed" : "sidebar-expanded"
      }`}
    >
      {/* Left menu toggle */}
      <div className="layout-menu-toggle navbar-nav align-items-xl-center me-4 me-xl-0 d-xl-none">
        <a className="nav-item nav-link px-0 me-xl-6" href="#">
          <i className="icon-base bx bx-menu icon-md"></i>
        </a>
      </div>

      {/* Navbar right */}
      <div
        className="navbar-nav-right d-flex align-items-center justify-content-end"
        id="navbar-collapse"
      >
        {/* Search */}
        <div className="navbar-nav align-items-center">
          <div className="nav-item navbar-search-wrapper mb-0">
            <a
              className="nav-item nav-link search-toggler d-flex align-items-center px-0"
              href="#"
            >
              <i className="bx bx-search bx-sm text-muted"></i>
              <span className="d-none d-md-inline-block text-muted ms-2">
                Search [Ctrl+K]
              </span>
            </a>
          </div>
        </div>

        <ul className="navbar-nav flex-row align-items-center ms-md-auto">
          {/* Language dropdown */}
          <li
            className={`nav-item dropdown-language dropdown me-2 me-xl-0 ${
              langOpen ? "show" : ""
            }`}
            ref={langRef}
          >
            <a
              className="nav-link dropdown-toggle hide-arrow"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setLangOpen(!langOpen);
              }}
            >
              <i className="icon-base bx bx-globe icon-md"></i>
            </a>
            <ul
              className={`dropdown-menu dropdown-menu-end ${
                langOpen ? "show" : ""
              }`}
            >
              <li>
                <button className="dropdown-item">English</button>
              </li>
              <li>
                <button className="dropdown-item">French</button>
              </li>
              <li>
                <button className="dropdown-item">Arabic</button>
              </li>
              <li>
                <button className="dropdown-item">German</button>
              </li>
            </ul>
          </li>

          {/* Theme switcher */}
          <li
            className={`nav-item dropdown-style-switcher dropdown me-2 me-xl-0 ${
              themeOpen ? "show" : ""
            }`}
            ref={themeRef}
          >
            <a
              className="nav-link dropdown-toggle hide-arrow"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setThemeOpen(!themeOpen);
              }}
            >
              <i className="bx bx-sun bx-sm"></i>
            </a>
            <ul
              className={`dropdown-menu dropdown-menu-end ${
                themeOpen ? "show" : ""
              }`}
            >
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleThemeChange("light")}
                >
                  ☀️ Light
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleThemeChange("dark")}
                >
                  🌙 Dark
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleThemeChange("system")}
                >
                  💻 System
                </button>
              </li>
            </ul>
          </li>
      

      <li className="nav-item dropdown-shortcuts navbar-dropdown dropdown me-2 me-xl-0">
        <a className="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
          <i className="icon-base bx bx-grid-alt icon-md"></i>
        </a>
        <div className="dropdown-menu dropdown-menu-end p-0">
          <div className="dropdown-menu-header border-bottom">
            <div className="dropdown-header d-flex align-items-center py-3">
              <h6 className="mb-0 me-auto">Shortcuts</h6>
              <a href="javascript:void(0)" className="dropdown-shortcuts-add py-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Add shortcuts"><i className="icon-base bx bx-plus-circle text-heading"></i></a>
            </div>
          </div>
          <div className="dropdown-shortcuts-list scrollable-container">
            <div className="row row-bordered overflow-visible g-0">
              <div className="dropdown-shortcuts-item col">
                <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                  <i className="icon-base bx bx-calendar icon-26px text-heading"></i>
                </span>
                <a href="app-calendar.html" className="stretched-link">Calendar</a>
                <small>Appointments</small>
              </div>
              <div className="dropdown-shortcuts-item col">
                <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                  <i className="icon-base bx bx-food-menu icon-26px text-heading"></i>
                </span>
                <a href="app-invoice-list.html" className="stretched-link">Invoice App</a>
                <small>Manage Accounts</small>
              </div>
            </div>
            <div className="row row-bordered overflow-visible g-0">
              <div className="dropdown-shortcuts-item col">
                <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                  <i className="icon-base bx bx-user icon-26px text-heading"></i>
                </span>
                <a href="app-user-list.html" className="stretched-link">User App</a>
                <small>Manage Users</small>
              </div>
              <div className="dropdown-shortcuts-item col">
                <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                  <i className="icon-base bx bx-check-shield icon-26px text-heading"></i>
                </span>
                <a href="app-access-roles.html" className="stretched-link">Role Management</a>
                <small>Permission</small>
              </div>
            </div>
            <div className="row row-bordered overflow-visible g-0">
              <div className="dropdown-shortcuts-item col">
                <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                  <i className="icon-base bx bx-pie-chart-alt-2 icon-26px text-heading"></i>
                </span>
                <a href="index.html" className="stretched-link">Dashboard</a>
                <small>User Dashboard</small>
              </div>
              <div className="dropdown-shortcuts-item col">
                <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                  <i className="icon-base bx bx-cog icon-26px text-heading"></i>
                </span>
                <a href="pages-account-settings-account.html" className="stretched-link">Setting</a>
                <small>Account Settings</small>
              </div>
            </div>
            <div className="row row-bordered overflow-visible g-0">
              <div className="dropdown-shortcuts-item col">
                <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                  <i className="icon-base bx bx-help-circle icon-26px text-heading"></i>
                </span>
                <a href="pages-faq.html" className="stretched-link">FAQs</a>
                <small>FAQs & Articles</small>
              </div>
              <div className="dropdown-shortcuts-item col">
                <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                  <i className="icon-base bx bx-window-open icon-26px text-heading"></i>
                </span>
                <a href="modal-examples.html" className="stretched-link">Modals</a>
                <small>Useful Popups</small>
              </div>
            </div>
          </div>
        </div>
      </li>

      <li className="nav-item dropdown-notifications navbar-dropdown dropdown me-3 me-xl-2">
        <a className="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
          <span className="position-relative">
            <i className="icon-base bx bx-bell icon-md"></i>
            <span className="badge rounded-pill bg-danger badge-dot badge-notifications border"></span>
          </span>
        </a>
        <ul className="dropdown-menu dropdown-menu-end p-0">
          <li className="dropdown-menu-header border-bottom">
            <div className="dropdown-header d-flex align-items-center py-3">
              <h6 className="mb-0 me-auto">Notification</h6>
              <div className="d-flex align-items-center h6 mb-0">
                <span className="badge bg-label-primary me-2">8 New</span>
                <a href="javascript:void(0)" className="dropdown-notifications-all p-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Mark all as read"><i className="icon-base bx bx-envelope-open text-heading"></i></a>
              </div>
            </div>
          </li>
          <li className="dropdown-notifications-list scrollable-container">
            <ul className="list-group list-group-flush">
              <li className="list-group-item list-group-item-action dropdown-notifications-item">
                <div className="d-flex">
                  <div className="flex-shrink-0 me-3">
                    <div className="avatar">
                      <img src="../../assets/img/avatars/1.png" alt="User Avatar" className="rounded-circle" />
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="small mb-0">Congratulation Lettie 🎉</h6>
                    <small className="mb-1 d-block text-body">Won the monthly best seller gold badge</small>
                    <small className="text-body-secondary">1h ago</small>
                  </div>
                  <div className="flex-shrink-0 dropdown-notifications-actions">
                    <a href="javascript:void(0)" className="dropdown-notifications-read"><span className="badge badge-dot"></span></a>
                    <a href="javascript:void(0)" className="dropdown-notifications-archive"><span className="icon-base bx bx-x"></span></a>
                  </div>
                </div>
              </li>
              <li className="list-group-item list-group-item-action dropdown-notifications-item">
                <div className="d-flex">
                  <div className="flex-shrink-0 me-3">
                    <div className="avatar">
                      <span className="avatar-initial rounded-circle bg-label-danger">CF</span>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="small mb-0">Charles Franklin</h6>
                    <small className="mb-1 d-block text-body">Accepted your connection</small>
                    <small className="text-body-secondary">12hr ago</small>
                  </div>
                  <div className="flex-shrink-0 dropdown-notifications-actions">
                    <a href="javascript:void(0)" className="dropdown-notifications-read"><span className="badge badge-dot"></span></a>
                    <a href="javascript:void(0)" className="dropdown-notifications-archive"><span className="icon-base bx bx-x"></span></a>
                  </div>
                </div>
              </li>
              <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                <div className="d-flex">
                  <div className="flex-shrink-0 me-3">
                    <div className="avatar">
                      <img src="../../assets/img/avatars/2.png" alt="User" className="rounded-circle" />
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="small mb-0">New Message ✉️</h6>
                    <small className="mb-1 d-block text-body">You have new message from Natalie</small>
                    <small className="text-body-secondary">1h ago</small>
                  </div>
                  <div className="flex-shrink-0 dropdown-notifications-actions">
                    <a href="javascript:void(0)" className="dropdown-notifications-read"><span className="badge badge-dot"></span></a>
                    <a href="javascript:void(0)" className="dropdown-notifications-archive"><span className="icon-base bx bx-x"></span></a>
                  </div>
                </div>
              </li>
              <li className="list-group-item list-group-item-action dropdown-notifications-item">
                <div className="d-flex">
                  <div className="flex-shrink-0 me-3">
                    <div className="avatar">
                      <span className="avatar-initial rounded-circle bg-label-success"><i className="icon-base bx bx-cart"></i></span>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="small mb-0">Whoo! You have new order 🛒</h6>
                    <small className="mb-1 d-block text-body">ACME Inc. made new order $1,154</small>
                    <small className="text-body-secondary">1 day ago</small>
                  </div>
                  <div className="flex-shrink-0 dropdown-notifications-actions">
                    <a href="javascript:void(0)" className="dropdown-notifications-read"><span className="badge badge-dot"></span></a>
                    <a href="javascript:void(0)" className="dropdown-notifications-archive"><span className="icon-base bx bx-x"></span></a>
                  </div>
                </div>
              </li>
              <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                <div className="d-flex">
                  <div className="flex-shrink-0 me-3">
                    <div className="avatar">
                      <img src="../../assets/img/avatars/9.png" alt="avatar" className="rounded-circle" />
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="small mb-0">Application has been approved 🚀</h6>
                    <small className="mb-1 d-block text-body">Your ABC project application has been approved.</small>
                    <small className="text-body-secondary">2 days ago</small>
                  </div>
                  <div className="flex-shrink-0 dropdown-notifications-actions">
                    <a href="javascript:void(0)" className="dropdown-notifications-read"><span className="badge badge-dot"></span></a>
                    <a href="javascript:void(0)" className="dropdown-notifications-archive"><span className="icon-base bx bx-x"></span></a>
                  </div>
                </div>
              </li>
              <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                <div className="d-flex">
                  <div className="flex-shrink-0 me-3">
                    <div className="avatar">
                      <span className="avatar-initial rounded-circle bg-label-success"><i className="icon-base bx bx-pie-chart-alt"></i></span>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="small mb-0">Monthly report is generated</h6>
                    <small className="mb-1 d-block text-body">July monthly financial report is generated </small>
                    <small className="text-body-secondary">3 days ago</small>
                  </div>
                  <div className="flex-shrink-0 dropdown-notifications-actions">
                    <a href="javascript:void(0)" className="dropdown-notifications-read"><span className="badge badge-dot"></span></a>
                    <a href="javascript:void(0)" className="dropdown-notifications-archive"><span className="icon-base bx bx-x"></span></a>
                  </div>
                </div>
              </li>
              <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                <div className="d-flex">
                  <div className="flex-shrink-0 me-3">
                    <div className="avatar">
                      <img src="../../assets/img/avatars/5.png" alt="avatar" className="rounded-circle" />
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="small mb-0">Send connection request</h6>
                    <small className="mb-1 d-block text-body">Peter sent you connection request</small>
                    <small className="text-body-secondary">4 days ago</small>
                  </div>
                  <div className="flex-shrink-0 dropdown-notifications-actions">
                    <a href="javascript:void(0)" className="dropdown-notifications-read"><span className="badge badge-dot"></span></a>
                    <a href="javascript:void(0)" className="dropdown-notifications-archive"><span className="icon-base bx bx-x"></span></a>
                  </div>
                </div>
              </li>
              <li className="list-group-item list-group-item-action dropdown-notifications-item">
                <div className="d-flex">
                  <div className="flex-shrink-0 me-3">
                    <div className="avatar">
                      <img src="../../assets/img/avatars/6.png" alt="avatar" className="rounded-circle" />
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="small mb-0">New message from Jane</h6>
                    <small className="mb-1 d-block text-body">Your have new message from Jane</small>
                    <small className="text-body-secondary">5 days ago</small>
                  </div>
                  <div className="flex-shrink-0 dropdown-notifications-actions">
                    <a href="javascript:void(0)" className="dropdown-notifications-read"><span className="badge badge-dot"></span></a>
                    <a href="javascript:void(0)" className="dropdown-notifications-archive"><span className="icon-base bx bx-x"></span></a>
                  </div>
                </div>
              </li>
              <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                <div className="d-flex">
                  <div className="flex-shrink-0 me-3">
                    <div className="avatar">
                      <span className="avatar-initial rounded-circle bg-label-warning"><i className="icon-base bx bx-error"></i></span>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="small mb-0">CPU is running high</h6>
                    <small className="mb-1 d-block text-body">CPU Utilization Percent is currently at 88.63%,</small>
                    <small className="text-body-secondary">5 days ago</small>
                  </div>
                  <div className="flex-shrink-0 dropdown-notifications-actions">
                    <a href="javascript:void(0)" className="dropdown-notifications-read"><span className="badge badge-dot"></span></a>
                    <a href="javascript:void(0)" className="dropdown-notifications-archive"><span className="icon-base bx bx-x"></span></a>
                  </div>
                </div>
              </li>
            </ul>
          </li>
          <li className="border-top">
            <div className="d-grid p-4">
              <a className="btn btn-primary btn-sm d-flex" href="javascript:void(0);">
                <small className="align-middle">View all notifications</small>
              </a>
            </div>
          </li>
        </ul>
      </li>
      <li className="nav-item navbar-dropdown dropdown-user dropdown">
        <a className="nav-link dropdown-toggle hide-arrow p-0" href="javascript:void(0);" data-bs-toggle="dropdown">
          <div className="avatar avatar-online">
            <img src="../../assets/img/avatars/1.png" alt="avatar" className="rounded-circle" />
          </div>
        </a>
        <ul className="dropdown-menu dropdown-menu-end">
          <li>
            <a className="dropdown-item" href="pages-account-settings-account.html">
              <div className="d-flex">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar avatar-online">
                    <img src="../../assets/img/avatars/1.png" alt="avatar" className="w-px-40 h-auto rounded-circle" />
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-0">John Doe</h6>
                  <small className="text-body-secondary">Admin</small>
                </div>
              </div>
            </a>
          </li>
          <li>
            <div className="dropdown-divider my-1"></div>
          </li>
          <li>
            <a className="dropdown-item" href="pages-profile-user.html"> <i className="icon-base bx bx-user icon-md me-3"></i><span>My Profile</span> </a>
          </li>
          <li>
            <a className="dropdown-item" href="pages-account-settings-account.html"> <i className="icon-base bx bx-cog icon-md me-3"></i><span>Settings</span> </a>
          </li>
          <li>
            <a className="dropdown-item" href="pages-account-settings-billing.html">
              <span className="d-flex align-items-center align-middle">
                <i className="flex-shrink-0 icon-base bx bx-credit-card icon-md me-3"></i><span className="flex-grow-1 align-middle">Billing Plan</span>
                <span className="flex-shrink-0 badge rounded-pill bg-danger">4</span>
              </span>
            </a>
          </li>
          <li>
            <div className="dropdown-divider my-1"></div>
          </li>
          <li>
            <a className="dropdown-item" href="pages-pricing.html"> <i className="icon-base bx bx-dollar icon-md me-3"></i><span>Pricing</span> </a>
          </li>
          <li>
            <a className="dropdown-item" href="pages-faq.html"> <i className="icon-base bx bx-help-circle icon-md me-3"></i><span>FAQ</span> </a>
          </li>
          <li>
            <div className="dropdown-divider my-1"></div>
          </li>
          <li>
            <a className="dropdown-item" href="auth-login-cover.html" target="_blank"> <i className="icon-base bx bx-power-off icon-md me-3"></i><span>Log Out</span> </a>
          </li>
        </ul>
      </li>
    
  </ul>
</div>

</nav>

  );
};

export default Navbar;