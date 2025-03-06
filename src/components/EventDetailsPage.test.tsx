import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import EventDetailsPage from "../components/EventDetailsPage";
import "@testing-library/jest-dom";

jest.mock("../api/MockEventData", () => ({
  __esModule: true,
  mockEvents: [
    {
      id: 1,
      name: "Sample Event 1",
      desc: "This is a sample event for testing purposes.",
      regLink: "http://example.com/register",
      startDateTime: "2025-02-20 10:00:00",
      endDateTime: "2025-02-20 12:00:00",
      address: "123 Sample St, Sample City, Country",
      hostId: 1,
      attendees: 5
    }
  ]
}));


describe("EventDetailsPage Component", () => {
  it("renders event details for a valid event ID", async () => {
    render(
      <MemoryRouter initialEntries={["/event/1"]}>
        
        <Routes>
          <Route path="/event/:id" element={<EventDetailsPage />} />
        </Routes>
        
      </MemoryRouter>
    );

    //screen.debug();

    await waitFor(() => {
      expect(screen.getByText("Sample Event 1")).toBeInTheDocument();
      expect(screen.getByText("This is a sample event for testing purposes.")).toBeInTheDocument();
    });
  });
});
