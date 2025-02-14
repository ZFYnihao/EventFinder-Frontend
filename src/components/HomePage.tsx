import Login from "../components/login";

function MainPage() {
    return (
      <main className="d-flex flex-column align-items-center justify-content-center p-4" style={{ height: 'calc(100vh - 64px)' }}>
        <h1 className="fs-2 fw-bold text-primary mb-3">Welcome to the UCSD Event Finder!</h1>
        <p className="text-center text-secondary mb-3">Here you can find some events offered by clubs and organizations affiliated with UCSD on or near campus.</p>
        <p className="mb-4">Sign up now to see all events!</p>
        <Login></Login>
        <p className="mt-3 text-muted small">Want to post your events here? <a href="/admin-register" className="text-primary text-decoration-underline">Learn more</a>.</p>
      </main>
    );
  }

export default MainPage