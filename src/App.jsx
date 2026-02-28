import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="layout-wrapper layout-content-navbar layout-menu-collapsed">
      <div className="layout-container">

        <Sidebar />

        <div className="layout-page">
          <Navbar />

          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
            </div>

            <Footer />
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;