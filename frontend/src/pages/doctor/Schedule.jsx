import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DoctorLayout from "../../layouts/DoctorLayout";
import { getAppointments } from "../../api/appointmentApi";

const Schedule = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const response =
        await getAppointments();

      const doctorAppointments =
        response.data
          .filter(
            (appointment) =>
              appointment.doctorEmail ===
              user.email
          )
          .sort(
            (a, b) =>
              new Date(a.appointmentDate) -
              new Date(b.appointmentDate)
          );

      setAppointments(
        doctorAppointments
      );
    } catch (error) {
      console.error(error);
      toast.error(
        "Failed to load schedule"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DoctorLayout>
        <p>Loading schedule...</p>
      </DoctorLayout>
    );
  }

  return (
    <DoctorLayout>
      <div>
        <h1 className="text-4xl font-bold">
          Schedule
        </h1>

        <p className="text-slate-400 mt-2">
          Upcoming appointments.
        </p>

        <div className="mt-8 space-y-4">
          {appointments.map(
            (appointment) => (
              <div
                key={appointment._id}
                className="
                  bg-slate-900
                  border border-slate-800
                  rounded-3xl
                  p-6
                "
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {
                        appointment.patientName
                      }
                    </h3>

                    <p className="text-slate-400">
                      {
                        appointment.patientEmail
                      }
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-medium">
                      {new Date(
                        appointment.appointmentDate
                      ).toLocaleDateString()}
                    </p>

                    <p className="text-emerald-400">
                      {
                        appointment.appointmentTime
                      }
                    </p>
                  </div>
                </div>
              </div>
            )
          )}

          {appointments.length ===
            0 && (
            <div
              className="
                bg-slate-900
                border border-slate-800
                rounded-3xl
                p-8
                text-center
                text-slate-400
              "
            >
              No scheduled appointments.
            </div>
          )}
        </div>
      </div>
    </DoctorLayout>
  );
};

export default Schedule;