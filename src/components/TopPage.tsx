import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import UcsdLogo from '../assets/ucsd-logo.png';
import { useInfo } from "../UserInfo";
import { Link, useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import Login from "./Login";

function TopPage() {
    const { state, dispatch } = useInfo();
    const navigate = useNavigate();

    const handleLogout = () => {
        googleLogout();
        dispatch({ type: "LOGOUT" });
        navigate("/");
    };

    return (
        <header className="d-flex justify-content-between align-items-center bg-white px-4 py-2 shadow-sm" style={{ height: '64px' }}>
            {/* Left Section: Logo & Title */}
            <div className="d-flex align-items-center">
                <img src={UcsdLogo} alt="UCSD Logo" height="50" className="me-2" />
                <Link to="/" className="fs-4 fw-bold text-primary text-decoration-none">Event Finder</Link>
            </div>

            {/* Right Section: Navigation & User Menu */}
            <div className="d-flex align-items-center gap-4">
                {state.user?.is_admin ? (
                    <Link to="/admin" className="text-primary text-decoration-none fw-semibold">Event Management</Link>
                ) : (
                    <Link to="/admin-apply" className="text-primary text-decoration-none fw-semibold">Admin Application</Link>
                )}
                <Link to="/all-events" className="text-primary text-decoration-none fw-semibold">View all Events</Link>

                {/* User Profile Dropdown */}
                {state.isLogin ? (
                    <div className="dropdown">
                        <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {state.user?.name}
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li><Link to="/profile" className="dropdown-item">Profile</Link></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <Login></Login>
                )}
            </div>
        </header>
    );
}

export default TopPage;
