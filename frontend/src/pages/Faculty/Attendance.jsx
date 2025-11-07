import React from "react";

export default function FacultyAttendance() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Mark Attendance</h1>

      <div className="card p-6">
        <p className="text-[var(--muted)] mb-4">
          Click the button below to generate a QR code for students.
        </p>

        <button className="btn btn-primary">Generate QR Code</button>
      </div>
    </div>
  );
}
