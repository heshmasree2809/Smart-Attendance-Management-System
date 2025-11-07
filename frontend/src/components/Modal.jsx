import React from "react";

export default function Modal({ open, title, onClose, children, footer }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 p-4">
      <div className="bg-white rounded-2xl shadow-soft border border-[#E9D5FF] w-full max-w-lg animate-pop">
        <div className="p-5 border-b border-[#E9D5FF]">
          <h3 className="text-lg font-semibold text-[#4C1D95]">{title}</h3>
        </div>
        <div className="p-5">{children}</div>
        <div className="p-4 border-t border-[#E9D5FF] flex justify-end gap-2">
          {footer}
          <button className="btn btn-ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
