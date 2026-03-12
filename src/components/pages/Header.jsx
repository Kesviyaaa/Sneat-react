const Navbar = () => {
  return (
    <nav>
      {/* Mobile menu toggle */}
      <div className="layout-menu-toggle navbar-nav align-items-xl-center me-4 me-xl-0 d-xl-none">
        <a className="nav-item nav-link px-0 me-xl-6" href="#">
          <i className="icon-base bx bx-menu icon-md"></i>
        </a>
      </div>

      <div
        className="navbar-nav-right d-flex align-items-center justify-content-end"
        id="navbar-collapse"
      >
        {/* Search */}
        <div className="navbar-nav align-items-center">
          <div className="nav-item d-flex align-items-center">
            <i className="bx bx-search fs-4 lh-0"></i>
            <input
              type="text"
              className="form-control border-0 shadow-none ps-2"
              placeholder="Search[Ctrl+K]"
              aria-label="Search..."
            />
          </div>
        </div>

        {/* Right side icons */}
        <ul className="navbar-nav flex-row align-items-center ms-md-auto">
          {/* Language */}
          <li className="nav-item dropdown-language dropdown me-2 me-xl-0">
            <a
              className="nav-link dropdown-toggle hide-arrow"
              href="#"
              data-bs-toggle="dropdown"
            >
              <i className="icon-base bx bx-globe icon-md"></i>
            </a>

            <ul className="dropdown-menu dropdown-menu-end">
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

          {/* Theme Switcher */}
          <li className="nav-item dropdown me-2 me-xl-0">
            <a
              className="nav-link dropdown-toggle hide-arrow"
              href="#"
              data-bs-toggle="dropdown"
            >
              <i className="icon-base bx bx-sun icon-md theme-icon-active"></i>
            </a>

            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <button className="dropdown-item active">Light</button>
              </li>
              <li>
                <button className="dropdown-item">Dark</button>
              </li>
              <li>
                <button className="dropdown-item">System</button>
              </li>
            </ul>
          </li>

          {/* Notifications */}
          <li className="nav-item dropdown-notifications navbar-dropdown dropdown me-3 me-xl-2">
            <a
              className="nav-link dropdown-toggle hide-arrow"
              href="#"
              data-bs-toggle="dropdown"
            >
              <span className="position-relative">
                <i className="icon-base bx bx-bell icon-md"></i>
                <span className="badge rounded-pill bg-danger badge-dot badge-notifications border"></span>
              </span>
            </a>
          </li>

          {/* User */}
          <li className="nav-item navbar-dropdown dropdown-user dropdown">
            <a
              className="nav-link dropdown-toggle hide-arrow p-0"
              href="#"
              data-bs-toggle="dropdown"
            >
              <div className="avatar avatar-online">
                <img
                  src="/assets/img/avatars/1.png"
                  alt="user"
                  className="rounded-circle"
                />
              </div>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
