import React from "react";
import { User, Mail, Phone } from "lucide-react";

export default function Profile() {
  return (
    <div>
      <h1 className="section-title">Personal Details</h1>

      <div className="card-soft p-6 space-y-4">

        <div className="flex items-center gap-4">
          <User className="text-[#7C3AED]" size={26} />
          <p className="font-semibold text-[#4C1D95]">John Doe</p>
        </div>

        <div className="flex items-center gap-4">
          <Mail className="text-[#7C3AED]" size={26} />
          <p className="text-slate-600">john@student.com</p>
        </div>

        <div className="flex items-center gap-4">
          <Phone className="text-[#7C3AED]" size={26} />
          <p className="text-slate-600">+91 9876543210</p>
        </div>

      </div>
    </div>
  );
}
