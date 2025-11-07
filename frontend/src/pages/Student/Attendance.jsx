import React from "react";

export default function Attendance() {
  const attendance = [
    { date: "2025-01-11", status: "Present" },
    { date: "2025-01-12", status: "Absent" },
    { date: "2025-01-13", status: "Present" },
  ];

  return (
    <div>
      <h1 className="section-title">Attendance</h1>

      <table className="table-modern w-full bg-white rounded-xl shadow-soft">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {attendance.map((a, i) => (
            <tr key={i}>
              <td>{a.date}</td>
              <td>
                <span
                  className={`px-3 py-1 text-xs rounded-lg ${a.status === "Present"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                    }`}
                >
                  {a.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
