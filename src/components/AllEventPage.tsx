import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./AllEventPage.module.css"; 
import { AllEvent } from "../types/Event";
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

const AllEventPage: React.FC = () => {
    const [events, setEvents] = useState<AllEvent[]>([]);
    const [loading, setLoading] = useState(false); // loading state
    const [searchText, setSearchText] = useState("");
    const [filterStartDate, setFilterStartDate] = useState<string>("");
    const [filterEndDate, setFilterEndDate] = useState<string>("");

    // State for sorting
    const [sortKey, setSortKey] = useState<"name" | "startDate" | "endDate" | "attendees">("name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    // State for pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10; // Each page displays 10 items

    // For user information:
    const { state } = useInfo();
    const token = state.user?.token || "";

    // For manual page input
    const [pageInput, setPageInput] = useState<string>("");

    useEffect(() => {
        if (!token) {
            console.log("No token found. Skipping fetchEvents call.");
            return;
        }

        const fetchEvents = async () => {
            try {
                setLoading(true); // Start loading
                const response = await getAllEvents(token); // API call
                console.log("Fetched events here!!!:", response);
        
                // array here
                if (Array.isArray(response.events)) {
                    setEvents(response.events);
                } else {
                    console.error("Unexpected response format:", response);
                    setEvents([]);
                }
            } catch (error) {
                console.error("Failed to fetch events:", error);
            } finally {
                setLoading(false); // End loading (success or fail)
            }
        };
        
        fetchEvents();
    }, [token]);

    // Filter events by search text and date range
    const filteredEvents = events.filter(event => {
        const eventStartDate = new Date(event.startdatetime.replace(" ", "T")).toISOString().split("T")[0];
        const eventEndDate = new Date(event.enddatetime.replace(" ", "T")).toISOString().split("T")[0];

        return (
            event.name.toLowerCase().includes(searchText.toLowerCase()) &&
            (filterStartDate === "" || filterStartDate <= eventEndDate) &&   //date logic,show all satisfy inside
            (filterEndDate === "" || filterEndDate >= eventStartDate)
        );
    });

    // Handle sorting
    const sortedEvents = [...filteredEvents].sort((a, b) => {
        let compareValue = 0;

        switch (sortKey) {
            case "name":
                compareValue = a.name.localeCompare(b.name);
                break;
            case "startDate":
                compareValue = new Date(a.startdatetime).getTime() - new Date(b.startdatetime).getTime();
                break;
            case "endDate":
                compareValue = new Date(a.enddatetime).getTime() - new Date(b.enddatetime).getTime();
                break;
            case "attendees":
                compareValue = a.noOfAttendees - b.noOfAttendees;
                break;
            default:
                compareValue = 0;
                break;
        }

        return sortOrder === "asc" ? compareValue : -compareValue;
    });

    // Pagination calculation
    const totalPages = Math.ceil(sortedEvents.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedEvents = sortedEvents.slice(startIndex, endIndex);

    // Function to handle header click sorting
    const handleSort = (key: "name" | "startDate" | "endDate" | "attendees") => {
        if (sortKey === key) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortOrder("asc");
        }
    };

    // Function to handle page changes
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    // Function to handle manual page input
    const handleManualPageChange = () => {
        const pageNumber = parseInt(pageInput, 10);
        if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
        setPageInput("");
    };

    // Helper to render sort icon
    const renderSortIcon = (key: "name" | "startDate" | "endDate" | "attendees") => {
        if (sortKey !== key) {
            // Not sorted by this column -> show double arrow
            return <i className="ms-1 bi bi-caret-up-down"></i>;
        }
        // Sorted by this column -> show single arrow up or down
        return sortOrder === "asc" ? (
            <i className="ms-1 bi bi-caret-up-fill"></i>
        ) : (
            <i className="ms-1 bi bi-caret-down-fill"></i>
        );
    };

    // If loading, show spinner or "Loading..."
    if (loading) {
        return (
            <div className="container">
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
                    {/* You can replace this with a spinner of your choice */}
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    // If not loading, render the page
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
                </div>
            </div>

            <div className={`list-group shadow-sm ${styles.eventList}`}>
                {/* file list head (table header) */}
                <div
                    className={`list-group-item ${styles.eventHeader}`}
                    style={{ textAlign: "center" }}
                >
                    {/* Click each column header to sort */}
                    <span
                        className={styles.eventName}
                        style={{ cursor: "pointer", textAlign: "center" }}
                        onClick={() => handleSort("name")}
                    >
                        Event Name
                        {renderSortIcon("name")}
                    </span>
                    <span
                        className={styles.eventDate}
                        style={{ cursor: "pointer", textAlign: "center" }}
                        onClick={() => handleSort("startDate")}
                    >
                        Start Date
                        {renderSortIcon("startDate")}
                    </span>
                    <span
                        className={styles.eventDate}
                        style={{ cursor: "pointer", textAlign: "center" }}
                        onClick={() => handleSort("endDate")}
                    >
                        End Date
                        {renderSortIcon("endDate")}
                    </span>
                    <span
                        className={styles.eventAttendees}
                        style={{ cursor: "pointer", textAlign: "center" }}
                        onClick={() => handleSort("attendees")}
                    >
                        # Attending
                        {renderSortIcon("attendees")}
                    </span>
                </div>

                {/* file list*/}
                <div>
                    {paginatedEvents.length > 0 ? (
                        paginatedEvents.map(event => (
                            <div key={event.id} className={`list-group-item ${styles.eventItem}`}>
                                <Link
                                    to="/event-detail"
                                    state={{ event }} // Pass the entire event object
                                    className={`text-primary fw-bold text-decoration-none ${styles.eventName}`}
                                >
                                    {event.name}
                                </Link>
                                <span className={styles.eventDate}>{formatDate(event.startdatetime)}</span>
                                <span className={styles.eventDate}>{formatDate(event.enddatetime)}</span>
                                <span className={`badge bg-danger ${styles.eventAttendees} ${styles.attendanceBadge}`}>
                                    {event.noOfAttendees} Attending
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-muted">No events found</p>
                    )}
                </div>
            </div>

            {/* Pagination controls: arrow + page numbers + arrow + page input */}
            <div className="d-flex justify-content-center align-items-center mt-3 gap-2">
                <ul className="pagination m-0">
                    {/* Previous arrow */}
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage - 1)}
                            aria-label="Previous"
                        >
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>

                    {/* Page numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                        <li
                            key={pageNum}
                            className={`page-item ${pageNum === currentPage ? "active" : ""}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(pageNum)}
                            >
                                {pageNum}
                            </button>
                        </li>
                    ))}

                    {/* Next arrow */}
                    <li className={`page-item ${currentPage === totalPages || totalPages === 0 ? "disabled" : ""}`}>
                        <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage + 1)}
                            aria-label="Next"
                        >
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </li>
                </ul>

                {/* Manual page input + "Go" button */}
                <div className="input-group" style={{ width: "120px" }}>
                    <input
                        type="number"
                        className="form-control"
                        value={pageInput}
                        onChange={(e) => setPageInput(e.target.value)}
                        placeholder="Page #"
                        min="1"
                        max={totalPages}
                    />
                    <button
                        className="btn btn-secondary"
                        onClick={handleManualPageChange}
                    >
                        Go
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllEventPage;
