import React from "react";

export default function IDCard() {
  return (
    <div className="flex justify-center">
      <div className="card-soft p-6 max-w-xs text-center bg-gradient-to-br from-[#EFE5FF] to-[#F6F0FF]">

        <img
          src="https://i.pravatar.cc/150"
          alt="Student"
          className="w-28 h-28 rounded-full mx-auto mb-4 shadow-soft"
        />

        <h2 className="text-xl font-bold text-[#4C1D95]">John Doe</h2>
        <p className="text-slate-500 text-sm">Roll No: 23CS01</p>

        <div className="mt-4 text-sm space-y-1">
          <p>Department: CSE</p>
          <p>Year: 3rd Year</p>
        </div>

      </div>
    </div>
  );
}
