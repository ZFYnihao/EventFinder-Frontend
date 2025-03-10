import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import { MemoryRouter, Route, Routes } from "react-router-dom";
import EventDetailsPage from "../components/EventDetailsPage";
import { mockEvents } from "../api/MockEventData";

// Helper function to render the component with a specific route
const renderWithRoute = (route: string) => {
    return render(
        <MemoryRouter initialEntries={[route]}>
            <Routes>
                <Route path="/event/:id" element={<EventDetailsPage />} />
            </Routes>
        </MemoryRouter>
    );
};

describe("EventDetailsPage Component", () => {
    test("renders event details correctly", () => {
        const testEvent = mockEvents[0]; // Get the first mock event
        renderWithRoute(`/event/${testEvent.id}`);

        // Check that event name, description, and host are displayed
        expect(screen.getByText(testEvent.name)).toBeInTheDocument();
        expect(screen.getByText(`Posted by ${testEvent.hostId}`)).toBeInTheDocument();
        expect(screen.getByText(testEvent.desc)).toBeInTheDocument();

        // Check date and time
        expect(
          screen.getByText((content) => content.includes(testEvent.startDateTime))
        ).toBeInTheDocument();
      
        expect(
          screen.getByText((content) => content.includes(testEvent.endDateTime))
        ).toBeInTheDocument();
      
        // Check register button
        expect(screen.getByRole("button", { name: /register for event/i })).toBeInTheDocument();
    });

    test("displays 'event does not exist' message for invalid event ID", () => {
        renderWithRoute("/event/9999"); // Invalid ID

        expect(
            screen.getByText("This event does not exist. Please return to the 'All Events' page.")
        ).toBeInTheDocument();
    });

    test("handles empty friends list correctly", () => {
        const testEvent = { ...mockEvents[0], friends: [] }; // Modify event with no friends
        renderWithRoute(`/event/${testEvent.id}`);

        expect(screen.getByText("Friends Attending")).toBeInTheDocument();
        expect(screen.queryByRole("listitem")).not.toBeInTheDocument(); // No friends should be listed
    });
});
