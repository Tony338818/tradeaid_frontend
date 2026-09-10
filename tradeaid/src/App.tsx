import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/login";
import LandingPage from "./pages/landing_page";
import Dashboard from "./pages/dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/register" element={<LoginPage />} />
      <Route path="/login" element={<Navigate to="/register" replace />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
