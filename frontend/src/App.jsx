import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import AdminLayout from "./layouts/AdminLayout";
import FacultyLayout from "./layouts/FacultyLayout";
import StudentLayout from "./layouts/StudentLayout";

// (Optional: you don't need GenerateQR here if FacultyLayout defines it)

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin */}
      <Route path="/admin/*" element={<AdminLayout />} />

      {/* Faculty (nested routes go inside FacultyLayout) */}
      <Route path="/faculty/*" element={<FacultyLayout />} />

      {/* Student */}
      <Route path="/student/*" element={<StudentLayout />} />
    </Routes>
  );
}
