import { useNavigate } from "react-router-dom";
import "./AdminEventManagement.css";
import { useInfo } from "../UserInfo";
import { getAdminEvent, getAdminEventAttendees, deleteEvent } from "../api/EventApi"
import { useEffect, useState } from "react";
import { Event, GetAdminEventResponse } from "../types/Event";

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
  const [events, setEvents] = useState<Array<Event>>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const token = state.user? state.user.token : "";

  useEffect(() => {
          const fetchAdminEvent = async () => {
              if (!state.user?.token) {
                  console.warn("Token is missing. Skipping API call.");
                  return;
              }
      
              try {
                  const response : GetAdminEventResponse = await getAdminEvent(state.user.token);
                  if (Array.isArray(response.events)) {
                      setEvents(response.events);
                  } else {
                      console.error("Unexpected response format:", response);
                      setEvents([]); 
                  }
              } catch (error) {
                  console.error("Failed to get admin event:", error);
                  setEvents([]);
              }
          };
  
          fetchAdminEvent();
      }, [state.user?.token, refreshTrigger]); 

  // Function to handle event deletion with a confirmation prompt
  const handleDelete = async (eventId: number | null, eventName: string) => {
    const confirmed = window.confirm(`Are you sure you want to delete the event "${eventName}"?`);
    if (confirmed) {
      //Placeholder for delete API call
      //window.location.reload()
      try {
        await deleteEvent(token, eventId); 
        setRefreshTrigger((prev) => !prev); 
      } catch (error) {
        console.error("Delete event failed:", error);
      } 
    }
  };
  const handleDownloadCsv = async (eventId: number | null, eventName: string) => {
    if (!state.user?.token) {
      console.warn("Token is missing. Skipping CSV download.");
      return;
    }

    try {
      const csvBlob = await getAdminEventAttendees(state.user.token, eventId);

      const csvUrl = window.URL.createObjectURL(csvBlob);

      const link = document.createElement("a");
      link.href = csvUrl;
      link.setAttribute("download", `${eventName}_attendees.csv`);
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(csvUrl);
    } catch (error) {
      console.error("Failed to download CSV:", error);
    }
  };

  if (!state.user?.is_admin) {
    return <h2>Access Denied. You do not have permission to access this page.</h2>;
  }

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
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.name}</td>
                <td>{formatDate(event.startdatetime)}</td>
                <td className="action-buttons">
                  <button 
                    className="action-button" 
                    data-testid={`update-event-${event.id}`}  
                    onClick={() => navigate(`/update-event`, { state: { event: event } })}
                  >
                    Update <img src="src/assets/edit_icon.png" alt="Edit icon" className="button-icon" /> 
                  </button>
                  <button 
                    className="action-button" 
                    data-testid={`delete-event-${event.id}`}
                    onClick={() => handleDelete(event.id,event.name)}
                  >
                    Delete <img src="src/assets/delete_icon.png" alt="Delete icon" className="button-icon" /> 
                  </button>
                  <button 
                    className="action-button"
                    data-testid={`download-event-${event.id}`}
                    onClick={() => handleDownloadCsv(event.id, event.name)}
                  >
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
