import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiHome,
  FiUsers,
  FiCalendar,
  FiLogOut,
} from "react-icons/fi";

import { Stethoscope } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `
    flex items-center gap-2
    px-3 py-2

    rounded-xl

    border

    transition-all duration-300

    ${
      isActive
        ? "bg-lime-900/20 border-lime-900/30 text-emerald-400"
        : "border-transparent text-slate-300 hover:bg-slate-800 hover:text-white"
    }
  `;

  return (
    <nav
      className="
        sticky top-0 z-50

        border-b border-slate-800

        bg-slate-950/80
        backdrop-blur-xl
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-18 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div
              className="
                h-11 w-11

                rounded-2xl

                bg-lime-900/20
                border border-lime-900/30

                flex items-center justify-center

                transition-all duration-300

                hover:border-emerald-400/40
                hover:scale-105
              "
            >
              <Stethoscope
                size={22}
                className="text-emerald-400"
              />
            </div>

            <div>
              <h1
                className="
                  font-bold
                  text-xl
                  tracking-tight
                  text-white
                "
              >
                DocBook
              </h1>

              <p className="text-xs text-slate-500">
                Healthcare Platform
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-3">
            <NavLink
              to="/"
              className={navLinkClass}
            >
              <FiHome />
              Home
            </NavLink>

            <NavLink
              to="/doctors"
              className={navLinkClass}
            >
              <FiUsers />
              Doctors
            </NavLink>

            <NavLink
              to="/my-appointments"
              className={navLinkClass}
            >
              <FiCalendar />
              Appointments
            </NavLink>
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-slate-500">
                Welcome back
              </p>

              <p className="font-medium text-emerald-400">
                {user?.name}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="
                flex items-center gap-2

                px-4 py-2

                rounded-xl

                bg-slate-900
                border border-slate-700

                text-white

                hover:border-red-500
                hover:bg-red-500/10

                transition-all duration-300
              "
            >
              <FiLogOut />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="
              md:hidden

              text-white
              text-2xl

              p-2

              rounded-xl

              hover:bg-slate-800

              transition-all
            "
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            className="
              md:hidden

              py-4

              border-t border-slate-800
            "
          >
            <div className="flex flex-col gap-3">
              <NavLink
                to="/"
                className={navLinkClass}
                onClick={() => setIsOpen(false)}
              >
                <FiHome />
                Home
              </NavLink>

              <NavLink
                to="/doctors"
                className={navLinkClass}
                onClick={() => setIsOpen(false)}
              >
                <FiUsers />
                Doctors
              </NavLink>

              <NavLink
                to="/my-appointments"
                className={navLinkClass}
                onClick={() => setIsOpen(false)}
              >
                <FiCalendar />
                Appointments
              </NavLink>

              <div
                className="
                  pt-4 mt-2

                  border-t border-slate-800
                "
              >
                <p className="text-xs text-slate-500">
                  Welcome back
                </p>

                <p className="text-emerald-400 font-medium mb-4">
                  {user?.name}
                </p>

                <button
                  onClick={handleLogout}
                  className="
                    w-full

                    flex items-center justify-center gap-2

                    px-4 py-3

                    rounded-2xl

                    bg-slate-900
                    border border-slate-700

                    text-white

                    hover:border-red-500
                    hover:bg-red-500/10

                    transition-all duration-300
                  "
                >
                  <FiLogOut />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;