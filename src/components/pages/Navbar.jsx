import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";

const Navbar = ({ collapsed, hovered }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);
  const [themeOpen, setThemeOpen] = useState(false);
  const themeRef = useRef(null);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const shortcutsRef = useRef(null);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);
  const [userOpen, setUserOpen] = useState(false);
  const userRef = useRef(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [results, setResults] = useState([]);
  const searchInputRef = useRef(null);
  const [theme, setTheme] = useState("light");
  

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


const notifications = [
  {
    title: "Congratulation Lettie 🎉",
    description: "Won the monthly best seller gold badge",
    time: "1h ago",
    avatar: "../../assets/img/avatars/1.png",
  },
  {
    title: "Charles Franklin",
    description: "Accepted your connection",
    time: "12hr ago",
    initials: "CF",
    avatarClass: "bg-label-danger",
  },
  {
    title: "New Message ✉️",
    description: "You have new message from Natalie",
    time: "1h ago",
    avatar: "../../assets/img/avatars/2.png",
  },
  {
    title: "Whoo! You have new order 🛒",
    description: "ACME Inc. made new order $1,154",
    time: "1 day ago",
    initials: "AC",
    avatarClass: "bg-label-success",
  },
  {
    title: "Application has been approved 🚀",
    description: "Your ABC project application has been approved.",
    time: "2 days ago",
    avatar: "../../assets/img/avatars/9.png",
  },
  {
    title: "Monthly report is generated",
    description: "July monthly financial report is generated",
    time: "3 days ago",
    initials: "MR",
    avatarClass: "bg-label-success",
  },
];

const toggleNotif = (e) => {
  e.preventDefault();
  setNotifOpen(!notifOpen);
};

// Close dropdown when clicking outside
useEffect(() => {
  const handleClickOutside = (event) => {
    if (notifRef.current && !notifRef.current.contains(event.target)) {
      setNotifOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
      if (themeRef.current && !themeRef.current.contains(e.target)) {
        setThemeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (shortcutsRef.current && !shortcutsRef.current.contains(e.target)) {
        setShortcutsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleThemeChange = (mode) => {
    const html = document.documentElement;
  
    html.classList.remove("light-style", "dark-style");
  
    if (mode === "dark") {
      html.classList.add("dark-style");
    } else {
      html.classList.add("light-style");
    }
  
    localStorage.setItem("theme", mode);
    setTheme(mode);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    const html = document.documentElement;
  
    html.classList.remove("light-style", "dark-style");
  
    if (savedTheme === "dark") {
      html.classList.add("dark-style");
    } else {
      html.classList.add("light-style");
    }
  
    setTheme(savedTheme);
  }, []);
  

  


  const pages = [
    {
      name: "Dashboard Analytics",
      path: "/analytics",
      category: "DASHBOARDS",
      icon: "bx bx-home-circle"
    },
    {
      name: "DataTable Advanced",
      path: "/tables-datatables-advanced",
      category: "TABLES",
      icon: "bx bx-table"
    }
  ];


  useEffect(() => {
    const handleKey = (e) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
  
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };
  
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const handleSearch = (value) => {
    setSearchQuery(value);
  
    const filtered = pages.filter((p) =>
      p.name.toLowerCase().includes(value.toLowerCase())
    );
  
    setResults(filtered);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
  
      // CTRL + K → open search
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
  
      // ESC → close search
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
  
    };
  
    document.addEventListener("keydown", handleKeyDown);
  
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);


  useEffect(() => {
    if (searchOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [searchOpen]);
  




  return (
    
    <nav
      className={`layout-navbar navbar ${
        collapsed ? "sidebar-collapsed" : "sidebar-expanded"
      } ${hovered ? "sidebar-hovered" : ""}`}
    >
      {/* Left menu toggle */}
      <div className="layout-menu-toggle navbar-nav align-items-center me-4 me-xl-0 d-xl-none">
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
            onClick={(e) => {
              e.preventDefault();
              setSearchOpen(true);
            }}
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
    <i
  className={`bx bx-sm ${
    theme === "dark"
      ? "bx-moon"
      : theme === "light"
      ? "bx-sun"
      : "bx-laptop"
  }`}
></i>
  </a>
  <ul
    className={`dropdown-menu dropdown-menu-end ${
      themeOpen ? "show" : ""
    }`}
  >
    <li>
      <button
        className="dropdown-item d-flex align-items-center"
        onClick={() => handleThemeChange("light")}
      >
        <i className="bx bx-sun me-2"></i>
        <span>Light</span>
      </button>
    </li>
    <li>
      <button
        className="dropdown-item d-flex align-items-center"
        onClick={() => handleThemeChange("dark")}
      >
        <i className="bx bx-moon me-2"></i>
        <span>Dark</span>
      </button>
    </li>
    <li>
      <button
        className="dropdown-item d-flex align-items-center"
        onClick={() => handleThemeChange("system")}
      >
        <i className="bx bx-laptop me-2"></i>
        <span>System</span>
      </button>
    </li>
  </ul>
</li>
      

          <li
  className={`nav-item dropdown-shortcuts navbar-dropdown dropdown me-2 me-xl-0 ${
    shortcutsOpen ? "show" : ""
  }`}
  ref={shortcutsRef}
>
  <a
    className="nav-link dropdown-toggle hide-arrow"
    href="#"
    onClick={(e) => {
      e.preventDefault();
      setShortcutsOpen(!shortcutsOpen);
    }}
  >
    <i className="icon-base bx bx-grid-alt icon-md"></i>
  </a>

  <div className={`dropdown-menu dropdown-menu-end p-3 ${shortcutsOpen ? "show" : ""}`}>
    <div className="dropdown-menu-header border-bottom mb-2 d-flex justify-content-between align-items-center">
      <h6 className="mb-0">Shortcuts</h6>
      <a href="#" className="text-muted" title="Add shortcuts">
        <i className="icon-base bx bx-plus-circle"></i>
      </a>
    </div>

    <div className="shortcuts-grid">
      {[
        { icon: "bx-calendar", label: "Calendar" },
        { icon: "bx-food-menu", label: "Invoice" },
        { icon: "bx-user", label: "Users" },
        { icon: "bx-check-shield", label: "Roles" },
        { icon: "bx-pie-chart-alt-2", label: "Dashboard" },
        { icon: "bx-cog", label: "Settings" },
        { icon: "bx-help-circle", label: "FAQs" },
        { icon: "bx-window-open", label: "Modals" },
      ].map((item, i) => (
        <div key={i} className="shortcut-item">
          <div className="shortcut-icon">
            <i className={`icon-base bx ${item.icon} icon-26px text-heading`}></i>
          </div>
          <span className="shortcut-label">{item.label}</span>
        </div>
      ))}
    </div>
  </div>
</li>

<li
      className={`nav-item dropdown-notifications navbar-dropdown dropdown me-3 me-xl-2 ${
        notifOpen ? "show" : ""
      }`}
      ref={notifRef}
    >
      <a
        className="nav-link dropdown-toggle hide-arrow"
        href="#"
        onClick={toggleNotif}
      >
        <span className="position-relative">
          <i className="icon-base bx bx-bell icon-md"></i>
          <span className="badge rounded-pill bg-danger badge-dot badge-notifications border"></span>
        </span>
      </a>

      <ul
        className={`dropdown-menu dropdown-menu-end p-0 ${
          notifOpen ? "show" : ""
        }`}
      >
        {/* Header */}
        <li className="dropdown-menu-header border-bottom">
          <div className="dropdown-header d-flex align-items-center py-3">
            <h6 className="mb-0 me-auto">Notification</h6>
            <div className="d-flex align-items-center h6 mb-0">
              <span className="badge bg-label-primary me-2">
                {notifications.length} New
              </span>
              <a
                href="#"
                className="dropdown-notifications-all p-2"
                title="Mark all as read"
              >
                <i className="icon-base bx bx-envelope-open text-heading"></i>
              </a>
            </div>
          </div>
        </li>

        {/* Notifications List */}
        <li className="dropdown-notifications-list scrollable-container">
          <ul className="list-group list-group-flush">
            {notifications.map((item, idx) => (
              <li
                key={idx}
                className="list-group-item list-group-item-action dropdown-notifications-item"
              >
                <div className="d-flex">
                  <div className="flex-shrink-0 me-3">
                    <div className="avatar">
                      {item.avatar ? (
                        <img
                          src={item.avatar}
                          alt="User Avatar"
                          className="rounded-circle"
                        />
                      ) : (
                        <span
                          className={`avatar-initial rounded-circle ${
                            item.avatarClass || "bg-label-secondary"
                          }`}
                        >
                          {item.initials}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="small mb-0">{item.title}</h6>
                    <small className="mb-1 d-block text-body">
                      {item.description}
                    </small>
                    <small className="text-body-secondary">{item.time}</small>
                  </div>
                  <div className="flex-shrink-0 dropdown-notifications-actions">
                    <a href="#" className="dropdown-notifications-read">
                      <span className="badge badge-dot"></span>
                    </a>
                    <a href="#" className="dropdown-notifications-archive">
                      <span className="icon-base bx bx-x"></span>
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </li>

        {/* Footer */}
        <li className="dropdown-notifications-footer border-top">
          <div className="d-grid p-2">
            <a className="btn btn-primary btn-sm d-flex justify-content-center" href="#">
              <small className="align-middle">View all notifications</small>
            </a>
          </div>
        </li>
      </ul>
    </li>
    <li
  className={`nav-item navbar-dropdown dropdown-user dropdown ${userOpen ? "show" : ""}`}
  ref={userRef}
>
  <a
    className="nav-link dropdown-toggle hide-arrow p-0"
    href="#"
    onClick={(e) => {
      e.preventDefault();
      setUserOpen(!userOpen);
    }}
  >
    <div className="avatar avatar-online">
      <img
        src="../../assets/img/avatars/1.png"
        alt="avatar"
        className="rounded-circle"
      />
    </div>
  </a>
  <ul className={`dropdown-menu dropdown-menu-end ${userOpen ? "show" : ""}`}>
    <li>
      <a className="dropdown-item" href="pages-account-settings-account.html">
        <div className="d-flex">
          <div className="flex-shrink-0 me-3">
            <div className="avatar avatar-online">
              <img
                src="../../assets/img/avatars/1.png"
                alt="avatar"
                className="w-px-40 h-auto rounded-circle"
              />
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
      <a className="dropdown-item" href="pages-profile-user.html">
        <i className="icon-base bx bx-user icon-md me-3"></i>
        <span>My Profile</span>
      </a>
    </li>
    <li>
      <a className="dropdown-item" href="pages-account-settings-account.html">
        <i className="icon-base bx bx-cog icon-md me-3"></i>
        <span>Settings</span>
      </a>
    </li>
    <li>
      <a className="dropdown-item" href="pages-account-settings-billing.html">
        <span className="d-flex align-items-center align-middle">
          <i className="flex-shrink-0 icon-base bx bx-credit-card icon-md me-3"></i>
          <span className="flex-grow-1 align-middle">Billing Plan</span>
          <span className="flex-shrink-0 badge rounded-pill bg-danger">4</span>
        </span>
      </a>
    </li>
    <li>
      <div className="dropdown-divider my-1"></div>
    </li>
    <li>
      <a className="dropdown-item" href="pages-pricing.html">
        <i className="icon-base bx bx-dollar icon-md me-3"></i>
        <span>Pricing</span>
      </a>
    </li>
    <li>
      <a className="dropdown-item" href="pages-faq.html">
        <i className="icon-base bx bx-help-circle icon-md me-3"></i>
        <span>FAQ</span>
      </a>
    </li>
    <li>
      <div className="dropdown-divider my-1"></div>
    </li>
    <li>
      <a
        className="dropdown-item"
        href="auth-login-cover.html"
        target="_blank"
      >
        <i className="icon-base bx bx-power-off icon-md me-3"></i>
        <span>Log Out</span>
      </a>
    </li>
  </ul>
</li>
    
  </ul>
</div>

{searchOpen && (
  <div className="search-modal-overlay">
    <div className="search-modal">

    <div className="search-header">
    <i className="bx bx-search"></i>

    <input
      ref={searchInputRef}
      type="text"
      placeholder="Search[Ctrl+K]"
      value={searchQuery}
      onChange={(e) => handleSearch(e.target.value)}
      autoFocus
    />

    <div className="search-actions">
      <span className="esc">esc</span>

      <span
        className="search-close"
        onClick={() => setSearchOpen(false)}
      >
        x
      </span>
    </div>
  </div>

  <div className="search-results">

{/* DEFAULT VIEW */}
{searchQuery === "" && (
  <div className="search-default">

    <div className="search-group">
      <div className="search-group-title">POPULAR SEARCHES</div>

      <Link
        to="/analytics"
        className="search-result-item"
        onClick={() => setSearchOpen(false)}
      >
        <i className="bx bx-home-circle"></i>
        <span>Analytics</span>
      </Link>
    </div>

    <div className="search-group">
      <div className="search-group-title">TABLES</div>

      <Link
        to="/tables-datatables-advanced"
        className="search-result-item"
        onClick={() => setSearchOpen(false)}
      >
        <i className="bx bx-table"></i>
        <span>Advanced</span>
      </Link>
    </div>

  </div>
)}

{/* SEARCH RESULTS */}
{searchQuery !== "" && results.length === 0 && (
  <div className="search-empty">
    No results found
    <small>Try searching for analytics or tables</small>
  </div>
)}

{searchQuery !== "" &&
  results.map((item, i) => (
    <Link
      key={i}
      to={item.path}
      className="search-result-item"
      onClick={() => setSearchOpen(false)}
    >
      <i className={item.icon}></i>
      <div>
        <div className="search-category">{item.category}</div>
        <div className="search-name">{item.name}</div>
      </div>
    </Link>
  ))}
</div>

    </div>
  </div>
)}

</nav>



  );
};

export default Navbar;