import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Routes, Route } from "react-router-dom";

import AdminDashboard from "../pages/Admin/Dashboard";
import ManageUsers from "../pages/Admin/ManageUsers";
import Departments from "../pages/Admin/Departments";
import Courses from "../pages/Admin/Courses";
import Notices from "../pages/Admin/Notices";
import Logs from "../pages/Admin/Logs";
import AdminSettings from "../pages/Admin/Settings";

export default function AdminLayout() {
  const links = [
    { path: "/admin/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
    { path: "/admin/manage-users", label: "Manage Users", icon: "Users" },
    { path: "/admin/departments", label: "Departments", icon: "Building2" },
    { path: "/admin/courses", label: "Courses", icon: "BookOpen" },
    { path: "/admin/notices", label: "Notices", icon: "Megaphone" },
    { path: "/admin/logs", label: "Logs", icon: "ListChecks" },
    { path: "/admin/settings", label: "Settings", icon: "Settings" },
  ];

  return (
    <div className="flex">
      <Sidebar links={links} />
      
      <div className="flex-1">
        <Navbar role="Admin" />

        <div className="section">
          <Routes>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="manage-users" element={<ManageUsers />} />
            <Route path="departments" element={<Departments />} />
            <Route path="courses" element={<Courses />} />
            <Route path="notices" element={<Notices />} />
            <Route path="logs" element={<Logs />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route index element={<AdminDashboard />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
