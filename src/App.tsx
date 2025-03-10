import HomePage from "./components/HomePage"
import TopPage from "./components/TopPage"

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage from "./components/ProfilePage";

import AllEventPage from "./components/AllEventPage";

import EventDetailsPage from "./components/EventDetailsPage"
import AdminEventManagement from "./components/AdminEventManagement"
import AdminApplyPage from "./components/AdminApplyPage";
import CreateEventPage from "./components/CreateEventPage";
import UpdateEventPage from "./components/UpdateEventPage";

import { UserProvider } from "./UserInfo";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
          <div className="d-flex flex-column min-vh-100">
            <TopPage></TopPage>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/all-events" element={<AllEventPage />} />
              <Route path="/event-detail" element={<EventDetailsPage />} />
              <Route path="/admin" element={<AdminEventManagement />} />
              <Route path="/admin-apply" element={<AdminApplyPage />} />
              <Route path="/create-event" element={<CreateEventPage />} />
              <Route path="/update-event" element={<UpdateEventPage />} />
              <Route path="/AdminApplyPage" element={<AdminApplyPage />} />
            </Routes>
          </div>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App