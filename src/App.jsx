import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";


function App() {
  const [theme, setTheme] = useState("light"); // light | dark | system
  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (mode) => {
      root.classList.remove("light-style", "dark-style");

      if (mode === "dark") {
        root.classList.add("dark-style");
      } else if (mode === "light") {
        root.classList.add("light-style");
      } else {
        // system
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        root.classList.add(prefersDark ? "dark-style" : "light-style");
      }
    };

    applyTheme(theme);
  }, [theme]);
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <div className="layout-page">
          <Navbar  onThemeChange={setTheme} />

          <div className="content-wrapper">
            {/* your page */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;