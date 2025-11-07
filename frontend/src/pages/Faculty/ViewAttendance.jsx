import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { CalendarDays, User } from "lucide-react";

export default function ViewAttendance() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    API.get("/faculty/attendance")
      .then((res) => setRecords(res.data || []))
      .catch(() => setRecords([]));
  }, []);

  return (
    <div>
      <h1 className="section-title">Marked Attendance</h1>

      <div className="card-soft mt-4">

        {records.length === 0 && (
          <p className="text-center text-slate-500 py-5">
            No attendance marked yet.
          </p>
        )}

        <table className="table-modern w-full mt-3">
          <thead>
            <tr>
              <th>Date</th>
              <th>Student</th>
              <th>Reg Number</th>
              <th>Period</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {records.map((a, i) => (
              <tr key={i}>
                <td>{a.date}</td>
                <td className="flex items-center gap-2">
                  <User size={18} className="text-[#7C3AED]" />
                  {a.name}
                </td>
                <td>{a.regNo}</td>
                <td>{a.period}</td>
                <td className="font-semibold text-green-600">
                  {a.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
