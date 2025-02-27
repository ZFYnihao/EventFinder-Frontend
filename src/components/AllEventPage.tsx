import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { mockEvents } from "../api/MockEventData"; 
import styles from "./AllEventPage.module.css"; 
import { EventDataInterface } from "../types/EventData";

// Function to format date
const formatDate = (inputDate: string): string => {
    const date = new Date(inputDate);
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
};









const AllEventPage: React.FC = () => {
    const [events, setEvents] = useState<EventDataInterface[]>([]);
    const [searchText, setSearchText] = useState("");
    const [filterDate, setFilterDate] = useState<string>("");
    const [sortKey, setSortKey] = useState<"name" | "date" | "attendees">("name");

    useEffect(() => {
        setEvents(mockEvents);
    }, []);

    // sort logic
    const filteredEvents = events.filter(event => 
        event.name.toLowerCase().includes(searchText.toLowerCase()) &&
        (filterDate === "" ||new Date(event.startDateTime.replace(" ", "T")).toISOString().split("T")[0] === filterDate)  //change the format for date
    ).sort((a, b) => {
        if (sortKey === "name") return a.name.localeCompare(b.name);
        if (sortKey === "date") return new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime();
        return b.attendees - a.attendees;
    });


    return (
        <div className={`container ${styles.pageContainer}`}>
            {/* search*/}
            <div className={`row mb-4 ${styles.searchRow}`}>
                <div className="col-md-6">
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="form-control"
                    />
                </div>

                <div className="col-md-6 d-flex justify-content-end gap-3">
                    <input
                        type="date"
                        value={filterDate ? new Date(filterDate).toISOString().split("T")[0] : ""}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className="form-control"
                        lang="en"
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
                    <span className={styles.eventDate}>Date</span>
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
                                <span className={styles.eventDate}>{formatDate(event.startDateTime)}</span>
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
