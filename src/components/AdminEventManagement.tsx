import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminEventManagement.css";
import { mockEvents } from "../api/MockEventData"; 


//Function to format date
const formatDate = (inputDate: string):string => {
  const date = new Date(inputDate);
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};


const EventManagement = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="title">Admin Event Management</h1>
      <div className="button-container">
        <button 
          className="create-button"
          onClick={() => navigate("/create-event")}
        >
          Create Event <img src="src\assets\plus_icon.png" alt="plus icon" className="button-icon" />
        </button>
      </div>

      <div className="table-container">
        <table className="event-table">
          <thead>
            <tr>
              {/* <th>#</th> */}
              <th>Event Name</th>
              <th> Date </th>
              <th>  Action </th>
            </tr>
          </thead>
          <tbody>
            {mockEvents.map((event) => (
              <tr key={event.id}>
                {/* <td>{event.id}</td> */}
                <td>{event.name}</td>
                <td>{formatDate(event.startDateTime)}</td>
                <td className="action-buttons">
                  <button className="action-button">Update</button>
                  <button className="action-button">Delete</button>
                  <button className="action-button">Download Registrations <img src="src\assets\download_icon.png" alt="Download icon" className="button-icon" /> </button>
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
