import { useInfo } from "../UserInfo";

function AdminApplyPage() {
    const { state } = useInfo();
    console.log(state);
    return (
      <main className="d-flex flex-column align-items-center justify-content-center p-4" style={{ height: 'calc(100vh - 64px)' }}>
        <h1 className="fs-2 fw-bold text-primary mb-3">Admin Interest Form</h1>
        <p className="text-center text-secondary mb-3">In order to be able to post your events here we first have to approve you to be a site admin.</p>
        <p className="text-center text-secondary mb-3">Please press the Apply button below, fill out the Admin application form and submit your application</p>
        <button className="btn btn-primary mt-3" >
          Apply!
        </button>
        <br></br>
        <p className="text-center text-secondary mb-3">Once we review your request we will approve you and reply to your email so make sure to keep an eye out! </p>

      </main>
    );
  }

export default AdminApplyPage