import React from "react";

export default function AttendanceList() {
  const students = [
    { name: "John Doe", status: "Present" },
    { name: "Priya Sharma", status: "Absent" },
    { name: "Arun Kumar", status: "Present" }
  ];

  return (
    <div>
      <h1 className="section-title">Attendance List</h1>

      <table className="table-modern w-full bg-white rounded-xl shadow-soft">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s, i) => (
            <tr key={i}>
              <td className="font-semibold text-[#4C1D95]">{s.name}</td>

              <td>
                <span
                  className={`px-3 py-1 text-xs rounded-lg ${
                    s.status === "Present"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {s.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
