import HomePage from "./components/HomePage"
import TopPage from "./components/TopPage"

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage from "./components/ProfilePage";
import { AuthProvider } from "./components/AuthContext";

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
          <TopPage></TopPage>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App