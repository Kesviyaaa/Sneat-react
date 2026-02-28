const Footer = () => {
    const year = new Date().getFullYear();
  
    return (
      <footer className="content-footer footer bg-footer-theme">
        <div className="container-xxl">
          <div className="footer-container d-flex align-items-center justify-content-between py-4 flex-md-row flex-column">
            
            <div className="mb-2 mb-md-0">
              © {year}, made with ❤️ by{" "}
              <a
                href="https://themeselection.com"
                target="_blank"
                rel="noreferrer"
                className="footer-link"
              >
                ThemeSelection
              </a>
            </div>
  
            <div className="d-none d-lg-inline-block">
              <a
                href="https://themeselection.com/license/"
                className="footer-link me-4"
                target="_blank"
                rel="noreferrer"
              >
                License
              </a>
  
              <a
                href="https://themeselection.com"
                className="footer-link me-4"
                target="_blank"
                rel="noreferrer"
              >
                More Themes
              </a>
  
              <a
                href="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/documentation/"
                className="footer-link me-6"
                target="_blank"
                rel="noreferrer"
              >
                Documentation
              </a>
  
              <a
                href="https://themeselection.com/support/"
                className="footer-link d-none d-sm-inline-block"
                target="_blank"
                rel="noreferrer"
              >
                Support
              </a>
            </div>
  
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;