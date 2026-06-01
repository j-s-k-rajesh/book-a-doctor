import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  Stethoscope,
  CalendarDays,
  Menu,
  X,
} from "lucide-react";

const AdminLayout = ({ children }) => {
  const [open, setOpen] = useState(false);

  const links = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: Users,
    },
    {
      name: "Doctors",
      path: "/admin/doctors",
      icon: Stethoscope,
    },
    {
      name: "Appointments",
      path: "/admin/appointments",
      icon: CalendarDays,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Mobile Header */}
      <div className="lg:hidden border-b border-slate-800 p-4 flex justify-between items-center">
        <h1 className="font-bold text-xl">
          Admin Panel
        </h1>

        <button
          onClick={() => setOpen(!open)}
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
            Admin
          </h2>

          <nav className="space-y-3">
            {links.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `
                    flex items-center gap-3

                    px-4 py-3

                    rounded-2xl

                    transition-all

                    ${
                      isActive
                        ? "bg-lime-900/20 border border-lime-900/30 text-emerald-400"
                        : "text-slate-400 hover:bg-slate-800"
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

        {/* Content */}
        <main className="flex-1 p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;