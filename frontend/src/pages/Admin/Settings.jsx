import React, { useState } from "react";

export default function AdminSettings() {
  const [instName, setInstName] = useState("SCAAMS University");
  const [session, setSession] = useState("2025-26");
  const [contactEmail, setContactEmail] = useState("support@scaams.com");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold gradient-text mb-6">
        System Settings
      </h1>

      <div className="glass-card space-y-5">
        
        <div>
          <label className="font-medium text-sm text-slate-600">Institute Name</label>
          <input
            type="text"
            className="input mt-1"
            value={instName}
            onChange={(e) => setInstName(e.target.value)}
          />
        </div>

        <div>
          <label className="font-medium text-sm text-slate-600">Academic Session</label>
          <input
            type="text"
            className="input mt-1"
            value={session}
            onChange={(e) => setSession(e.target.value)}
          />
        </div>

        <div>
          <label className="font-medium text-sm text-slate-600">Contact Email</label>
          <input
            type="email"
            className="input mt-1"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />
        </div>

        <button className="btn btn-primary mt-2 w-full">Save Settings</button>
      </div>
    </div>
  );
}
