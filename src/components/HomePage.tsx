import Login from "./Login";
import { useInfo } from "../UserInfo";
import { Link } from "react-router-dom";

function MainPage() {
    const { state } = useInfo();
    return (
      <main className="d-flex flex-column align-items-center justify-content-center p-4" style={{ height: 'calc(100vh - 64px)' }}>
        <h1 className="fs-2 fw-bold text-primary mb-3">Welcome to the UCSD Event Finder!</h1>
        <p className="text-center text-secondary mb-3">Here you can find some events offered by clubs and organizations affiliated with UCSD on or near campus.</p>
        {!state.isLogin ? (
          <div className="d-flex flex-column align-items-center text-center">
            <p className="mb-3">Sign up now to see all events!</p>
            <Login />
         </div>
        ) : (
          <div className="d-flex flex-column align-items-center text-center mb-3">
            <p className="fw-bold text-dark fs-5 mb-1">Welcome Back, {state.user?.name}!</p>
            <p className="text-muted small">Enjoy discovering new events at UCSD.</p>
          </div>
        )}
        {state.isLogin && (
          <div className="d-flex flex-column align-items-center text-center">
            <p className="text-muted small">
              Want to post your events here? <a href="/admin-register" className="text-primary text-decoration-underline">Learn more</a>.
            </p>
            <Link to="/profile">
              <button className="btn btn-primary">Go to Profile Page!</button>
            </Link>
          </div>
        )}

      </main>
    );
  }

export default MainPage