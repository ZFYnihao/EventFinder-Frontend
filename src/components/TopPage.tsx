import React from "react"
import Login from "../components/login";
import 'bootstrap/dist/css/bootstrap.css'
import UcsdLogo from '../assets/ucsd-logo.png';

function TopPage() {
    return (
      <header className="d-flex justify-content-between align-items-center bg-white px-4 py-2 shadow-sm" style={{ height: '64px' }}>
        <div className="d-flex align-items-center">
          <img src={UcsdLogo} alt="UCSD Logo" height="60" className="me-2" />
          <span className="fs-4 fw-bold text-primary">Event Finder</span>
        </div>
        <div className="d-flex align-items-center gap-3">
          <a href="/events" className="text-primary text-decoration-none">View all Events</a>
          <Login></Login>
        </div>
      </header>
    );
  }

export default TopPage