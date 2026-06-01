import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getAppointments,
  deleteAppointment,
} from "../../api/adminApi";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await getAppointments();

      setAppointments(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this appointment?"
    );

    if (!confirmDelete) return;

    try {
      await deleteAppointment(id);

      toast.success("Appointment deleted");

      fetchAppointments();
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
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
      <AdminLayout>
        <p>Loading appointments...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        <h1 className="text-4xl font-bold">
          Appointments
        </h1>

        <p className="text-slate-400 mt-2">
          Manage all appointments.
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
                    Doctor
                  </th>

                  <th className="p-4">
                    Specialization
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
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {appointments.map(
                  (appointment) => (
                    <tr
                      key={appointment._id}
                      className="
                        border-b border-slate-800
                      "
                    >
                      <td className="p-4">
                        {appointment.patientId?.name || "-"}
                      </td>

                      <td className="p-4">
                        {appointment.doctorId?.userId?.name || "-"}
                      </td>

                      <td className="p-4">
                        {appointment.doctorId?.specialization || "-"}
                      </td>

                      <td className="p-4">
                        {appointment.appointmentDate?.startsWith("+")
                          ? "Invalid Date"
                          : new Date(
                            appointment.appointmentDate
                          ).toLocaleDateString()
                        }
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
                        <button
                          onClick={() =>
                            handleDelete(
                              appointment._id
                            )
                          }
                          className="
                            px-4 py-2

                            rounded-xl

                            bg-red-500/10
                            text-red-400

                            hover:bg-red-500/20

                            transition-all
                          "
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {appointments.length === 0 && (
            <div className="p-8 text-center text-slate-400">
              No appointments found.
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Appointments;