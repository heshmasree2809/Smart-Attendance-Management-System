import React, { useState } from "react";
import { Menu, Sun, Moon, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ role }) {
  const [dark, setDark] = useState(
    document.documentElement.classList.contains("dark")
  );
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-white shadow-soft border-b border-[#E9D5FF] p-4 sticky top-0 z-40">

        <div className="flex justify-between items-center max-w-7xl mx-auto">

          {/* Left */}
          <div className="flex items-center gap-3">
            <button className="lg:hidden btn btn-ghost" onClick={() => setOpen(!open)}>
              <Menu size={22} />
            </button>

            <h1 className="text-2xl font-bold gradient-text tracking-wide">
              SCAAMS
            </h1>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">

            {/* Theme Switch */}
            <button
              onClick={toggleTheme}
              className="btn btn-ghost p-2 rounded-full"
            >
              {dark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="btn btn-ghost flex items-center gap-2"
              >
                <User size={20} />
                <span className="hidden md:block">{role}</span>
              </button>

              {profileOpen && (
                <div className="card-soft absolute right-0 mt-2 w-48 animate-pop p-3">
                  <ul className="text-sm text-slate-700 dark:text-slate-300">
                    <li className="p-2 hover:bg-[#EDE4FF] rounded-lg cursor-pointer">Profile</li>
                    <li className="p-2 hover:bg-[#EDE4FF] rounded-lg cursor-pointer">Settings</li>
                    <li
                      onClick={logout}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg cursor-pointer flex items-center gap-2"
                    >
                      <LogOut size={16} />
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>

          </div>
        </div>
      </nav>

      {/* Lavender gradient divider */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#A78BFA] to-[#C084FC]"></div>
    </>
  );
}
