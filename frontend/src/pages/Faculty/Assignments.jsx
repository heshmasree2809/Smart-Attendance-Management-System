import React from "react";
import { PlusCircle, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export default function FacultyAssignments() {
  const assignments = [
    { title: "Unit Test 1", submissions: 24 },
    { title: "Lab Manual", submissions: 32 },
  ];

  return (
    <div>
      <h1 className="section-title">Assignments</h1>

      <div className="flex justify-end mb-4">
        <Link
          to="/faculty/assignments/create"
          className="btn bg-[#A78BFA] text-white px-5 py-2 rounded-xl"
        >
          <PlusCircle size={18} />
          Create Assignment
        </Link>
      </div>

      <div className="space-y-4">
        {assignments.map((a, i) => (
          <div key={i} className="card-soft p-5 flex justify-between items-center card-hover">
            <div className="flex items-center gap-4">
              <FileText className="text-[#7C3AED] neon-icon" size={26} />
              <div>
                <h2 className="font-semibold text-[#4C1D95]">{a.title}</h2>
                <p className="text-sm text-slate-500">{a.submissions} submissions</p>
              </div>
            </div>

            <Link
              to="/faculty/assignments/submissions"
              className="text-[#6D28D9] font-semibold hover:underline"
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
