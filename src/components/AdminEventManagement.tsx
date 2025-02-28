import { useNavigate } from "react-router-dom";
import "./AdminEventManagement.css";
import { mockEvents } from "../api/MockEventData"; 
import { useInfo } from "../UserInfo";

// Function to format date
const formatDate = (inputDate: string): string => {
  const date = new Date(inputDate);
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};

const EventManagement = () => {
  const navigate = useNavigate();
  const { state } = useInfo();
  if (!state.user?.is_admin) {
    return <h2>Access Denied. You do not have permission to access this page.</h2>;
  }

  // Function to handle event deletion with a confirmation prompt
  const handleDelete = (eventId: number, eventName: string) => {
    const confirmed = window.confirm(`Are you sure you want to delete the event "${eventName}"?`);
  
    if (confirmed) {
      //Placeholder for delete API call
      window.location.reload()
    }
  };

  return (
    <div className="container">
      <h1 className="title">Admin Event Management</h1>
      <div className="button-container">
        <button 
          className="create-button"
          onClick={() => navigate("/create-event")}
        >
          Create Event <img src="src/assets/plus_icon.png" alt="plus icon" className="button-icon" />
        </button>
      </div>

      <div className="table-container">
        <table className="event-table">
          <thead>
            <tr>
              <th>Event Name</th>
              <th> Date </th>
              <th> Action </th>
            </tr>
          </thead>
          <tbody>
            {mockEvents.map((event) => (
              <tr key={event.id}>
                <td>{event.name}</td>
                <td>{formatDate(event.startDateTime)}</td>
                <td className="action-buttons">
                  <button className="action-button" onClick={() => navigate(`/update-event/${event.id}`)}>
                    Update <img src="src/assets/edit_icon.png" alt="Edit icon" className="button-icon" /> 
                  </button>
                  <button 
                    className="action-button" 
                    onClick={() => handleDelete(event.id,event.name)}
                  >
                    Delete <img src="src/assets/delete_icon.png" alt="Delete icon" className="button-icon" /> 
                  </button>
                  <button className="action-button">
                    Download Registrations <img src="src/assets/download_icon.png" alt="Download icon" className="button-icon" /> 
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventManagement;
