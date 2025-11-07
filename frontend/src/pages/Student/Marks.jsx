import React from "react";

export default function Marks() {
  const subjects = [
    { name: "Mathematics", marks: 88 },
    { name: "Operating Systems", marks: 92 },
    { name: "DAA", marks: 80 },
    { name: "DBMS", marks: 85 },
  ];

  return (
    <div>
      <h1 className="section-title">Marks</h1>

      <div className="space-y-4">
        {subjects.map((subj, i) => (
          <div key={i} className="card-soft p-5 bg-gradient-to-br from-[#F6F1FF] to-[#EDE6FF]">

            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-[#4C1D95]">{subj.name}</h2>
              <span className="text-xl font-bold text-[#6D28D9]">{subj.marks}%</span>
            </div>

            <div className="w-full bg-slate-200 rounded-full h-2 mt-4">
              <div
                className="h-2 rounded-full bg-[#A78BFA]"
                style={{ width: `${subj.marks}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
