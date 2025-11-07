import React, { useState } from "react";

export default function AssignmentCreate() {
  const [file, setFile] = useState(null);

  return (
    <div>
      <h1 className="section-title">Create Assignment</h1>

      <div className="card-soft p-7 space-y-5 bg-gradient-to-br from-[#F4EFFE] to-[#EDE4FF]">

        {/* Title */}
        <div>
          <label className="font-semibold text-[#4C1D95]">Title</label>
          <input
            type="text"
            className="input mt-1"
            placeholder="Enter assignment title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold text-[#4C1D95]">Description</label>
          <textarea
            className="input mt-1 h-32"
            placeholder="Enter assignment instructions"
          ></textarea>
        </div>

        {/* File Upload */}
        <div>
          <label className="font-semibold text-[#4C1D95]">Upload File</label>
          <input
            type="file"
            className="input mt-1"
            onChange={(e) => setFile(e.target.files[0])}
          />

          {file && (
            <p className="text-sm text-slate-600 mt-2">
              ✅ Selected: <b>{file.name}</b>
            </p>
          )}
        </div>

        {/* Due Date */}
        <div>
          <label className="font-semibold text-[#4C1D95]">Due Date</label>
          <input type="date" className="input mt-1" />
        </div>

        {/* Submit */}
        <button className="btn bg-[#A78BFA] text-white px-6 py-2 rounded-xl w-full">
          Create Assignment
        </button>
      </div>
    </div>
  );
}
