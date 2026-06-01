import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DoctorLayout from "../../layouts/DoctorLayout";

import {
  getAppointments,
  updateAppointment,
} from "../../api/appointmentApi";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const response =
        await getAppointments();

      const doctorAppointments =
        response.data.filter(
          (appointment) =>
            appointment.doctorEmail ===
            user.email
        );

      setAppointments(
        doctorAppointments
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to load appointments"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (
    id,
    status
  ) => {
    try {
      await updateAppointment(id, {
        status,
      });

      toast.success(
        `Appointment ${status}`
      );

      fetchAppointments();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to update appointment"
      );
    }
  };

  const getStatusClass = (
    status
  ) => {
    switch (
      status?.toLowerCase()
    ) {
      case "approved":
        return "bg-green-500/10 text-green-400 border-green-500/20";

      case "rejected":
        return "bg-red-500/10 text-red-400 border-red-500/20";

      case "completed":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";

      default:
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    }
  };

  if (loading) {
    return (
      <DoctorLayout>
        <p>
          Loading appointments...
        </p>
      </DoctorLayout>
    );
  }

  return (
    <DoctorLayout>
      <div>
        <h1 className="text-4xl font-bold">
          My Appointments
        </h1>

        <p className="text-slate-400 mt-2">
          Manage your appointments.
        </p>

        <div
          className="
            mt-8

            bg-slate-900
            border border-slate-800

            rounded-3xl

            overflow-hidden
          "
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr
                  className="
                    border-b border-slate-800
                    text-left
                  "
                >
                  <th className="p-4">
                    Patient
                  </th>

                  <th className="p-4">
                    Email
                  </th>

                  <th className="p-4">
                    Date
                  </th>

                  <th className="p-4">
                    Time
                  </th>

                  <th className="p-4">
                    Status
                  </th>

                  <th className="p-4">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {appointments.map(
                  (appointment) => (
                    <tr
                      key={
                        appointment._id
                      }
                      className="
                        border-b border-slate-800
                      "
                    >
                      <td className="p-4">
                        {
                          appointment.patientName
                        }
                      </td>

                      <td className="p-4">
                        {
                          appointment.patientEmail
                        }
                      </td>

                      <td className="p-4">
                        {new Date(
                          appointment.appointmentDate
                        ).toLocaleDateString()}
                      </td>

                      <td className="p-4">
                        {
                          appointment.appointmentTime
                        }
                      </td>

                      <td className="p-4">
                        <span
                          className={`
                            px-3 py-1

                            rounded-full
                            border

                            text-sm
                            capitalize

                            ${getStatusClass(
                              appointment.status
                            )}
                          `}
                        >
                          {
                            appointment.status
                          }
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="flex flex-wrap gap-2">
                          {appointment.status ===
                            "pending" && (
                            <>
                              <button
                                onClick={() =>
                                  handleStatusUpdate(
                                    appointment._id,
                                    "approved"
                                  )
                                }
                                className="
                                  px-3 py-2

                                  rounded-xl

                                  bg-green-500/10
                                  text-green-400

                                  hover:bg-green-500/20
                                "
                              >
                                Approve
                              </button>

                              <button
                                onClick={() =>
                                  handleStatusUpdate(
                                    appointment._id,
                                    "rejected"
                                  )
                                }
                                className="
                                  px-3 py-2

                                  rounded-xl

                                  bg-red-500/10
                                  text-red-400

                                  hover:bg-red-500/20
                                "
                              >
                                Reject
                              </button>
                            </>
                          )}

                          {appointment.status ===
                            "approved" && (
                            <button
                              onClick={() =>
                                handleStatusUpdate(
                                  appointment._id,
                                  "completed"
                                )
                              }
                              className="
                                px-3 py-2

                                rounded-xl

                                bg-blue-500/10
                                text-blue-400

                                hover:bg-blue-500/20
                              "
                            >
                              Complete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {appointments.length ===
            0 && (
            <div className="p-8 text-center text-slate-400">
              No appointments
              assigned to you.
            </div>
          )}
        </div>
      </div>
    </DoctorLayout>
  );
};

export default Appointments;