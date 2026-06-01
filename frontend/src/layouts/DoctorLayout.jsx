import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  CalendarDays,
  User,
  Menu,
  X,
} from "lucide-react";

const DoctorLayout = ({ children }) => {
  const [open, setOpen] = useState(false);

  const links = [
    {
      name: "Dashboard",
      path: "/doctor/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: CalendarDays,
    },
    {
      name: "Profile",
      path: "/doctor/profile",
      icon: User,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Mobile Header */}
      <div className="lg:hidden border-b border-slate-800 p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">
          Doctor Panel
        </h1>

        <button
          onClick={() => setOpen(!open)}
          className="text-white"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:static
            top-0 left-0

            h-screen
            w-72

            bg-slate-900
            border-r border-slate-800

            p-6

            transition-transform duration-300

            ${
              open
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }
          `}
        >
          <h2 className="text-2xl font-bold mb-10">
            Doctor Panel
          </h2>

          <nav className="space-y-3">
            {links.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `
                    flex items-center gap-3

                    px-4 py-3

                    rounded-2xl

                    transition-all duration-300

                    ${
                      isActive
                        ? "bg-lime-900/20 border border-lime-900/30 text-emerald-400"
                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    }
                  `
                  }
                >
                  <Icon size={20} />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </aside>

        {/* Overlay */}
        {open && (
          <div
            onClick={() => setOpen(false)}
            className="
              lg:hidden

              fixed inset-0

              bg-black/50
              z-[-1]
            "
          />
        )}

        {/* Content */}
        <main className="flex-1 p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DoctorLayout;