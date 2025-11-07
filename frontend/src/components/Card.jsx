import React from "react";

export default function Card({ title, value, icon }) {
  return (
    <div className="card animate-fade-in flex justify-between items-center">
      <div>
        <p className="text-sm text-[var(--muted)]">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      {icon}
    </div>
  );
}
