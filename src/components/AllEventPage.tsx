import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import { mockEvents } from "../api/MockEventData"; 
import styles from "./AllEventPage.module.css"; 
import { Event } from "../types/Event";


import { getAllEvents } from "../api/EventApi"; // Connect to EventApi

import { useInfo } from "../UserInfo"; // get user info

// Function to format date
const formatDate = (inputDate: string): string => {
    const date = new Date(inputDate);
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
};





interface ExtendedEvent extends Event {
    attendees: number; //set for attendees
  }
  





const AllEventPage: React.FC = () => {
    const [events, setEvents] = useState<ExtendedEvent[]>([]);
    const [searchText, setSearchText] = useState("");
    const [filterStartDate, setFilterStartDate] = useState<string>("");
    const [filterEndDate, setFilterEndDate] = useState<string>("");
    const [sortKey, setSortKey] = useState<"name" | "date" | "attendees">("name");

    //for user information:
    const { state } = useInfo();
    const token = state.user?.token || "";

    //useEffect(() => {
        //setEvents(mockEvents);
    //}, []);

    useEffect(() => {
        const fetchEvents = async () => {
          try {
            const response = await getAllEvents(token); // Event[]
            console.log("Fetched events here!!!:", response);
      
            // array here
            if (Array.isArray(response.events)) {
                const withAttendees = response.events.map(evt => ({
                ...evt,
                attendees: 0
                }));
                console.log("setEvents with attendees 0!!!");
                setEvents(withAttendees);

            } else {
                console.error("Unexpected response format:", response);
                setEvents([]);
            }


          } catch (error) {
            console.error("Failed to fetch events:", error);
          }
        };
        fetchEvents();
      }, []);




    // filter
    const filteredEvents = events.filter(event => {
        const eventStartDate = new Date(event.startdatetime.replace(" ", "T")).toISOString().split("T")[0];      //change date format
        const eventEndDate = new Date(event.enddatetime.replace(" ", "T")).toISOString().split("T")[0];  
    
        return (
            event.name.toLowerCase().includes(searchText.toLowerCase()) &&
            (filterStartDate === "" || filterStartDate <= eventEndDate) &&                        //date range
            (filterEndDate === "" || filterEndDate >= eventStartDate)
        );

    }).sort((a, b) => {     //sort
        if (sortKey === "name") return a.name.localeCompare(b.name);
        if (sortKey === "date") return new Date(a.startdatetime).getTime() - new Date(b.startdatetime).getTime();
        return b.attendees - a.attendees;
    });


    return (
        <div className={`container ${styles.pageContainer}`}>
            {/* search row*/}
            <div className={`row mb-4 ${styles.searchRow}`}>
                
                <div className="col-md-5">
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="form-control"
                    />
                </div>

                {/* filter UI*/}
                <div className="col-md-7 d-flex align-items-center justify-content-end gap-3">
                    <span className="fw-bold text-muted">Start</span>

                    <input
                        type="date"
                        value={filterStartDate ? new Date(filterStartDate).toISOString().split("T")[0] : ""}
                        onChange={(e) => setFilterStartDate(e.target.value)}
                        className="form-control"
                        lang="en"
                        placeholder="Choose Start Date"
                    />

                    <span className="fw-bold text-muted">End</span>
                    <input
                        type="date"
                        value={filterEndDate ? new Date(filterEndDate).toISOString().split("T")[0] : ""}
                        onChange={(e) => setFilterEndDate(e.target.value)}
                        className="form-control"
                        lang="en"
                        placeholder="Choose End Date"
                    />

                    <select
                        onChange={(e) => setSortKey(e.target.value as "name" | "date" | "attendees")}
                        className="form-select"
                    >
                        <option value="name">Event Name</option>
                        <option value="date">Date</option>
                        <option value="attendees"># Attending</option>
                    </select>
                </div>
            </div>


            <div className={`list-group shadow-sm ${styles.eventList}`}>
                {/* file list head */}
                <div className={`list-group-item ${styles.eventHeader}`}>
                    <span className={styles.eventName}>Event Name</span>
                    <span className={styles.eventDate}>Start Date</span>
                    <span className={styles.eventDate}>End Date</span>
                    <span className={styles.eventAttendees}># Attending</span>
                </div>

                {/* file list*/}
                <div style={{ overflowY: "auto", maxHeight: "40vh" }}>
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map(event => (
                            <div key={event.id} className={`list-group-item ${styles.eventItem}`}>
                                <Link to={`/event/${event.id}`} className={`text-primary fw-bold text-decoration-none ${styles.eventName}`}>
                                    {event.name}
                                </Link>
                                <span className={styles.eventDate}>{formatDate(event.startdatetime)}</span>
                                <span className={styles.eventDate}>{formatDate(event.enddatetime)}</span>
                                <span className={`badge bg-danger ${styles.eventAttendees} ${styles.attendanceBadge}`}>
                                    {event.attendees} Attending
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-muted">No events found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllEventPage;
