import { useEffect, useState } from "react";

import DoctorLayout from "../../layouts/DoctorLayout";
import { getAppointments } from "../../api/appointmentApi";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    completed: 0,
  });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const response =
        await getAppointments();

      const appointments =
        response.data || [];

      const doctorAppointments =
        appointments.filter(
          (appointment) =>
            appointment.doctorEmail ===
            user.email
        );

      setStats({
        total:
          doctorAppointments.length,

        pending:
          doctorAppointments.filter(
            (a) =>
              a.status === "pending"
          ).length,

        approved:
          doctorAppointments.filter(
            (a) =>
              a.status === "approved"
          ).length,

        completed:
          doctorAppointments.filter(
            (a) =>
              a.status === "completed"
          ).length,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DoctorLayout>
        <p>Loading...</p>
      </DoctorLayout>
    );
  }

  const cards = [
    {
      title: "Total Appointments",
      value: stats.total,
    },
    {
      title: "Pending",
      value: stats.pending,
    },
    {
      title: "Approved",
      value: stats.approved,
    },
    {
      title: "Completed",
      value: stats.completed,
    },
  ];

  return (
    <DoctorLayout>
      <div>
        <h1 className="text-4xl font-bold">
          Doctor Dashboard
        </h1>

        <p className="text-slate-400 mt-2">
          Overview of your appointments.
        </p>

        <div
          className="
            mt-10

            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4

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
    </DoctorLayout>
  );
};

export default Dashboard;