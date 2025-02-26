import 'bootstrap/dist/css/bootstrap.css'
import UcsdLogo from '../assets/ucsd-logo.png';
import Login from "./Login";

import { Link } from "react-router-dom";

function TopPage() {

    return (
      <header className="d-flex justify-content-between align-items-center bg-white px-4 py-2 shadow-sm" style={{ height: '64px' }}>
        <div className="d-flex align-items-center">
          <img src={UcsdLogo} alt="UCSD Logo" height="60" className="me-2" />
          <Link to="/" className="fs-4 fw-bold text-primary" style={{ textDecoration: "none" }}>Event Finder</Link>
        </div>
        <div className="d-flex align-items-center gap-3">
          <Link to="/all-events" className="text-primary text-decoration-none">View all Events</Link>
          <Login></Login>
          {/* {!isProfilePage && <Login />} */}
        </div>
      </header>
    );
  }

export default TopPage