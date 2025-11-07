import React, { useEffect, useState } from "react";
import { adminAPI } from "../../services/api";
import { Users, BookOpen, GraduationCap, Building2 } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    adminAPI.getDashboardStats().then((res) => {
      setStats(res.data);
    });
  }, []);

  if (!stats) return <div className="skeleton-block h-40 rounded-xl"></div>;

  const cards = [
    { label: "Total Students", value: stats.totalStudents, icon: Users },
    { label: "Faculty Members", value: stats.totalFaculty, icon: GraduationCap },
    { label: "Active Courses", value: stats.activeCourses, icon: BookOpen },
    { label: "Departments", value: stats.totalDepartments, icon: Building2 },
  ];

  return (
    <div>
      <h1 className="section-title">Admin Dashboard</h1>

      <div className="dashboard-grid">
        {cards.map((item, i) => {
          const Icon = item.icon;

          return (
            <div
              key={i}
              className="card-soft p-6 bg-gradient-to-br from-[#F4EFFE] to-[#EDE4FF] card-hover animate-fade-in"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <h2 className="text-3xl font-bold text-[#4C1D95] mt-1">
                    {item.value}
                  </h2>
                </div>

                <Icon size={40} className="text-[#7C3AED] neon-icon" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
