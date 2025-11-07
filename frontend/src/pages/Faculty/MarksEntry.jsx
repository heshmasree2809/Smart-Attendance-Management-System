import React, { useState } from "react";

export default function MarksEntry() {
  const [marks, setMarks] = useState({
    name: "",
    subject: "",
    internal: "",
    external: "",
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Marks Entry</h1>

      <div className="card p-6 space-y-4">
        <input className="input" placeholder="Student Name" />
        <input className="input" placeholder="Subject" />
        <input className="input" placeholder="Internal Marks" />
        <input className="input" placeholder="External Marks" />

        <button className="btn btn-primary w-full">Submit Marks</button>
      </div>
    </div>
  );
}
