import React from "react";

export default function Logs() {
  const rows = [
    { ts: "2025-11-06 10:01", action: "User Created", detail: "faculty002" },
    { ts: "2025-11-06 10:05", action: "Course Added", detail: "CSE201 - OS" },
  ];
  return (
    <div>
      <h1 className="section-title">System Logs</h1>
      <div className="card-soft p-0 overflow-hidden">
        <table className="table-modern w-full">
          <thead><tr><th>Time</th><th>Action</th><th>Details</th></tr></thead>
          <tbody>
            {rows.map((r,i)=>(
              <tr key={i}><td className="p-3">{r.ts}</td><td className="p-3">{r.action}</td><td className="p-3">{r.detail}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
