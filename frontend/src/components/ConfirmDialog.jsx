import React from "react";

export default function ConfirmDialog({ open, message, onCancel, onConfirm }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 p-4">
      <div className="bg-white rounded-2xl shadow-soft border border-[#E9D5FF] w-full max-w-md animate-pop p-6">
        <p className="text-slate-700">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
          <button className="btn bg-[#A78BFA] text-white" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
