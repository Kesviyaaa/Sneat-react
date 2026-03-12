import "../../App.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      {/* Footer */}
      <footer className="footer">
        <div className="container-fluid">
          <div className="row">
            {/* Left */}
            <div className="col-md-4 col-12 footer-color">
              {year} © All Rights Reserved by Infologia Technologies
            </div>

            {/* Center */}
            <div className="col-md-4 col-12 footer-color text-center">
              <a
                href="/Termsandconditions.aspx"
                target="_blank"
                rel="noreferrer"
                className="footer-link-custom"
              >
                Terms & Conditions
              </a>
              {" | "}
              <a
                href="/privacypolicy.aspx"
                target="_blank"
                rel="noreferrer"
                className="footer-link-custom"
              >
                Privacy Policy
              </a>
            </div>

            {/* Right */}
            <div className="col-md-4 col-12 footer-color text-md-end text-center">
              Design & Developed by{" "}
              <a
                href="https://infologia.in/"
                target="_blank"
                rel="noreferrer"
                className="footer-link-custom"
              >
                Infologia Technologies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
