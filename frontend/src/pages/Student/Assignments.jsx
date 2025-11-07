import React from "react";
import { FileText } from "lucide-react";

export default function Assignments() {
  const assignments = [
    { title: "Math Assignment", due: "2025-01-21", status: "Pending" },
    { title: "Physics Lab Report", due: "2025-01-18", status: "Submitted" },
  ];

  return (
    <div>
      <h1 className="section-title">Assignments</h1>

      <div className="space-y-4">

        {assignments.map((a, i) => (
          <div
            key={i}
            className="card-soft p-5 flex items-center justify-between shadow-soft card-hover"
          >
            <div className="flex items-center gap-4">
              <FileText className="text-[#7C3AED] neon-icon" size={28} />
              <div>
                <h2 className="text-lg font-semibold text-[#4C1D95]">{a.title}</h2>
                <p className="text-sm text-slate-500">Due: {a.due}</p>
              </div>
            </div>

            <span
              className={`px-3 py-1 text-xs rounded-lg ${
                a.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {a.status}
            </span>
          </div>
        ))}

      </div>
    </div>
  );
}
