import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LoginSuccess from "./pages/LoginSuccess";
import { AuthProvider } from "./context/AuthContext";


export default function App() {
  return (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login-success" element={<LoginSuccess />} />
      </Routes>
    </Router>
  </AuthProvider>
  );
}