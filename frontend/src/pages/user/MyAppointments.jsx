import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";
import Loader from "../../components/common/Loader";
import AppointmentCard from "../../components/appointment/AppointmentCard";

import { getAppointments } from "../../api/appointmentApi";

const MyAppointments = () => {
  const [appointments, setAppointments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response =
        await getAppointments();

      setAppointments(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <Loader />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            My Appointments
          </h1>

          <p className="mt-2 text-slate-400">
            Track all your appointments.
          </p>
        </div>

        {appointments.length === 0 ? (
          <div
            className="
              bg-slate-900
              border border-slate-800

              rounded-3xl

              p-10

              text-center
            "
          >
            No appointments found.
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-6
            "
          >
            {appointments.map(
              (appointment) => (
                <AppointmentCard
                  key={appointment._id}
                  appointment={appointment}
                />
              )
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default MyAppointments;