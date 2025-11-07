import React from "react";

export default function AssignmentSubmissions() {
  const students = [
    { name: "John Doe", file: "john.pdf", marks: "-" },
    { name: "Priya Sharma", file: "priya.pdf", marks: "8/10" },
  ];

  return (
    <div>
      <h1 className="section-title">Submissions</h1>

      <table className="table-modern w-full bg-white rounded-xl shadow-soft">
        <thead>
          <tr>
            <th>Name</th>
            <th>File</th>
            <th>Marks</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s, i) => (
            <tr key={i}>
              <td className="font-semibold text-[#4C1D95]">{s.name}</td>
              <td>
                <a className="text-[#6D28D9] underline" href="#">
                  {s.file}
                </a>
              </td>
              <td>{s.marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
