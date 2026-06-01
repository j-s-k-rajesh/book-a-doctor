import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getDoctors,
  deleteDoctor,
} from "../../api/adminApi";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const data = await getDoctors();

      setDoctors(data);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this doctor?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoctor(id);

      toast.success("Doctor deleted");

      fetchDoctors();
    } catch (error) {
      console.error(error);

      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <p>Loading doctors...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        <h1 className="text-4xl font-bold">
          Doctors
        </h1>

        <p className="text-slate-400 mt-2">
          Manage all doctors.
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
                    Name
                  </th>

                  <th className="p-4">
                    Email
                  </th>

                  <th className="p-4">
                    Specialization
                  </th>

                  <th className="p-4">
                    Experience
                  </th>

                  <th className="p-4">
                    Fees
                  </th>

                  <th className="p-4">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {doctors.map((doctor) => (
                  <tr
                    key={doctor._id}
                    className="
                      border-b border-slate-800
                    "
                  >
                    <td className="p-4">
                      {doctor.userId?.name}
                    </td>

                    <td className="p-4">
                      {doctor.userId?.email}
                    </td>

                    <td className="p-4">
                      {doctor.specialization}
                    </td>

                    <td className="p-4">
                      {doctor.experience} Years
                    </td>

                    <td className="p-4">
                      ₹{doctor.fees}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() =>
                          handleDelete(
                            doctor._id
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
                ))}
              </tbody>
            </table>
          </div>

          {doctors.length === 0 && (
            <div className="p-8 text-center text-slate-400">
              No doctors found.
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Doctors;