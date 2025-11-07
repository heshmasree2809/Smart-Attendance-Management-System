import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Routes, Route } from "react-router-dom";

import FacultyDashboard from "../pages/Faculty/Dashboard";
import GenerateQR from "../pages/Faculty/GenerateQR";
import AttendanceList from "../pages/Faculty/AttendanceList";
import FacultyAssignments from "../pages/Faculty/Assignments";
import AssignmentCreate from "../pages/Faculty/AssignmentCreate";
import AssignmentSubmissions from "../pages/Faculty/AssignmentSubmissions";

export default function FacultyLayout() {
  const links = [
  { path: "/faculty/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { path: "/faculty/generate-qr", label: "Generate QR", icon: "QrCode" },
  { path: "/faculty/attendance-list", label: "Attendance List", icon: "ClipboardList" },
  { path: "/faculty/view-attendance", label: "View Attendance", icon: "List" },   // ✅ NEW
  { path: "/faculty/assignments", label: "Assignments", icon: "BookOpenCheck" },
  { path: "/faculty/marks-entry", label: "Marks Entry", icon: "FileSpreadsheet" },
  { path: "/faculty/profile", label: "Profile", icon: "User" },
  { path: "/faculty/settings", label: "Settings", icon: "Settings" },
];


  return (
    <div className="flex">
      <Sidebar links={links} />

      <div className="flex-1">
        <Navbar role="Faculty" />
        <div className="section">
          <Routes>
            <Route path="dashboard" element={<FacultyDashboard />} />
            <Route path="generate-qr" element={<GenerateQR />} />
            <Route path="attendance-list" element={<AttendanceList />} />
            <Route path="view-attendance" element={<ViewAttendance />} />
            <Route path="assignments" element={<FacultyAssignments />} />
            <Route path="assignments/create" element={<AssignmentCreate />} />
            <Route path="assignments/submissions" element={<AssignmentSubmissions />} />
            {/* Default */}
            <Route index element={<FacultyDashboard />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
