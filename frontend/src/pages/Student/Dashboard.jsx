import React from "react";
import { BookOpen, CalendarCheck, BarChart2, ClipboardList } from "lucide-react";

export default function StudentDashboard() {
  return (
    <div>

      <h1 className="section-title">Dashboard Overview</h1>

      <div className="dashboard-grid">

        {/* Today's Classes */}
        <div className="card-soft card-hover bg-gradient-to-br from-[#F5E8FF] to-[#F3E8FF]">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-[#4C1D95]">Today's Classes</h2>
            <BookOpen size={26} className="text-[#7C3AED] neon-icon" />
          </div>
          <p className="text-4xl font-bold mt-3 text-[#6D28D9]">4</p>
        </div>

        {/* Attendance */}
        <div className="card-soft card-hover bg-gradient-to-br from-[#F3E8FF] to-[#EDE4FF]">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-[#4C1D95]">Attendance %</h2>
            <CalendarCheck size={26} className="text-[#7C3AED] neon-icon" />
          </div>
          <p className="text-4xl font-bold mt-3 text-[#6D28D9]">82%</p>
        </div>

        {/* Marks */}
        <div className="card-soft card-hover bg-gradient-to-br from-[#F1E7FF] to-[#F8F4FF]">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-[#4C1D95]">Marks</h2>
            <BarChart2 size={26} className="text-[#7C3AED] neon-icon" />
          </div>
          <p className="text-4xl font-bold mt-3 text-[#6D28D9]">78%</p>
        </div>

        {/* Assignments */}
        <div className="card-soft card-hover bg-gradient-to-br from-[#EFE5FF] to-[#F6F0FF]">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-[#4C1D95]">Pending Assignments</h2>
            <ClipboardList size={26} className="text-[#7C3AED] neon-icon" />
          </div>
          <p className="text-4xl font-bold mt-3 text-[#6D28D9]">2</p>
        </div>

      </div>
    </div>
  );
}
