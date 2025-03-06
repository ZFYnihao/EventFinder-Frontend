import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AllEventPage from "../components/AllEventPage";
import { mockEvents } from "../api/MockEventData";

describe("AllEventPage Component", () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <AllEventPage />
            </BrowserRouter>
        );
    });

    test("renders search input and filter controls", () => {
        expect(screen.getByPlaceholderText("Search events...")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Choose Start Date")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Choose End Date")).toBeInTheDocument();
        expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    test("displays events from mock data", () => {
        mockEvents.forEach((event) => {
            expect(screen.getByText(event.name)).toBeInTheDocument();
        });
    });

    test("filters events based on search input", () => {
        const searchInput = screen.getByPlaceholderText("Search events...");
        
        fireEvent.change(searchInput, { target: { value: "Sample Event 1" } });
        
        expect(screen.getByText("Sample Event 1")).toBeInTheDocument();
        expect(screen.queryByText("Sample Event 2")).not.toBeInTheDocument();
    });

    test("filters events based on start and end date", () => {
        const startDateInput = screen.getByPlaceholderText("Choose Start Date");
        const endDateInput = screen.getByPlaceholderText("Choose End Date");

        fireEvent.change(startDateInput, { target: { value: "2025-03-01" } });
        fireEvent.change(endDateInput, { target: { value: "2025-03-10" } });

        mockEvents.forEach((event) => {
            const eventStartDate = new Date(event.startDateTime).toISOString().split("T")[0];
            const eventEndDate = new Date(event.endDateTime).toISOString().split("T")[0];

            if ((eventStartDate >= "2025-03-01" && eventStartDate <= "2025-03-10") ||
                (eventEndDate >= "2025-03-01" && eventEndDate <= "2025-03-10")) {
                expect(screen.getByText(event.name)).toBeInTheDocument();
            } else {
                expect(screen.queryByText(event.name)).not.toBeInTheDocument();
            }
        });
    });

    test("sorts events by name", () => {
        const sortDropdown = screen.getByRole("combobox");
        fireEvent.change(sortDropdown, { target: { value: "name" } });

        const eventNames = screen.getAllByText(/Event/i).map((el) => el.textContent);
        const sortedNames = [...eventNames].sort((a, b) => a!.localeCompare(b!));

        expect(eventNames).toEqual(sortedNames);
    });

    test("sorts events by date", () => {
        const sortDropdown = screen.getByRole("combobox");
        fireEvent.change(sortDropdown, { target: { value: "date" } });
    
        // Get all elements containing date text
        const dateElements = screen.getAllByTestId("event-start-date"); 
    
        // Extract and convert Start Dates only
        const eventDates = dateElements
            .map(el => new Date(el.textContent!))
            .map(date => date.toISOString()); // Convert to a comparable format
    
        // Manually sort the extracted dates for validation
        const sortedDates = [...eventDates].sort(); // ISO format sorts naturally
    
        expect(eventDates).toEqual(sortedDates);
    });
    
    test("sorts events by attendees", () => {
        const sortDropdown = screen.getByRole("combobox");
        fireEvent.change(sortDropdown, { target: { value: "attendees" } });

        const attendees = screen.getAllByText(/Attending/).map((el) =>
            parseInt(el.textContent!.split(" ")[0], 10)
        );
        const sortedAttendees = [...attendees].sort((a, b) => b - a);

        expect(attendees).toEqual(sortedAttendees);
    });

    test("displays 'No events found' when search results are empty", () => {
        const searchInput = screen.getByPlaceholderText("Search events...");
        fireEvent.change(searchInput, { target: { value: "Nonexistent Event" } });

        expect(screen.getByText("No events found")).toBeInTheDocument();
    });

    test("navigates to event page on event name click", () => {
        const eventLink = screen.getByText(mockEvents[0].name);
        expect(eventLink).toHaveAttribute("href", `/event/${mockEvents[0].id}`);
    });
});
