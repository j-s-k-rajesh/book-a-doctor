import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getUsers,
  getDoctors,
  getAppointments,
} from "../../api/adminApi";


const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    doctors: 0,
    appointments: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [users, doctors, appointments] =
        await Promise.all([
          getUsers(),
          getDoctors(),
          getAppointments(),
        ]);

      setStats({
        users: Array.isArray(users)
          ? users.length
          : 0,

        doctors: Array.isArray(doctors)
          ? doctors.length
          : 0,
        
        appointments: Array.isArray(appointments)
          ? appointments.length
          : 0,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const cards = [
    {
      title: "Users",
      value: stats.users,
    },
    {
      title: "Doctors",
      value: stats.doctors,
    },
    {
      title: "Appointments",
      value: stats.appointments,
    },
  ];

  return (
    <AdminLayout>
      <div>
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="text-slate-400 mt-2">
          Welcome back Admin.
        </p>

        <div
          className="
            mt-10

            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3

            gap-6
          "
        >
          {cards.map((card) => (
            <div
              key={card.title}
              className="
                bg-slate-900
                border border-slate-800

                rounded-3xl

                p-8
              "
            >
              <p className="text-slate-400">
                {card.title}
              </p>

              <h2 className="text-5xl font-bold mt-3 text-emerald-400">
                {card.value}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;