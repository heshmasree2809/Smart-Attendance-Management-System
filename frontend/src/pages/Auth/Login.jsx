import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const submit = (e) => {
    e.preventDefault();

    const user = { role, email };
    localStorage.setItem("scaams_user", JSON.stringify(user));

    toast.success(`${role.toUpperCase()} Login Successful ✅`);
    navigate(`/${role}/dashboard`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-[#F5F3FF] via-[#EDE9FE] to-[#F3E8FF] p-4">

      {/* Glass Card */}
      <form
        onSubmit={submit}
        className="glass-card w-full max-w-md animate-pop"
      >
        <h1 className="text-4xl font-semibold text-center text-[#4C1D95] mb-3"
            style={{ fontFamily: "Poppins" }}>
          Welcome Back
        </h1>
        <p className="text-center text-[#6B21A8] mb-6">
          Login to your SCAAMS Portal
        </p>

        <div className="space-y-4">

          <input
            type="email"
            className="input"
            placeholder="Enter Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="input"
            placeholder="Enter Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Role Selector */}
          <select
            className="input"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="admin">Admin</option>
          </select>

          <button className="btn-primary w-full mt-2 py-3 text-base rounded-xl">
            Login
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-[#6B21A8] mt-6">
          Don't have an account?{" "}
          <span className="text-[#4C1D95] font-medium cursor-pointer hover:underline">
            Contact Admin
          </span>
        </p>
      </form>
    </div>
  );
}
