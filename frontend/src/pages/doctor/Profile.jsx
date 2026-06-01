import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DoctorLayout from "../../layouts/DoctorLayout";
import { getDoctors } from "../../api/doctorApi";

const Profile = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctorProfile();
  }, []);

  const fetchDoctorProfile = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const response =
        await getDoctors();

      const doctors =
        response.data || [];

      const currentDoctor =
        doctors.find(
          (doc) =>
            doc.userId?._id ===
            user._id
        );

      setDoctor(currentDoctor);
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to load profile"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DoctorLayout>
        <p>Loading profile...</p>
      </DoctorLayout>
    );
  }

  if (!doctor) {
    return (
      <DoctorLayout>
        <div
          className="
            bg-slate-900
            border border-slate-800

            rounded-3xl

            p-8
            text-center
          "
        >
          Doctor profile not found.
        </div>
      </DoctorLayout>
    );
  }

  return (
    <DoctorLayout>
      <div>
        <h1 className="text-4xl font-bold">
          My Profile
        </h1>

        <p className="text-slate-400 mt-2">
          View your professional details.
        </p>

        <div
          className="
            mt-8

            bg-slate-900
            border border-slate-800

            rounded-3xl

            p-8
          "
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-slate-400">
                Name
              </p>

              <h3 className="text-xl font-semibold mt-1">
                {
                  doctor.userId
                    ?.name
                }
              </h3>
            </div>

            <div>
              <p className="text-slate-400">
                Email
              </p>

              <h3 className="text-xl font-semibold mt-1">
                {
                  doctor.userId
                    ?.email
                }
              </h3>
            </div>

            <div>
              <p className="text-slate-400">
                Specialization
              </p>

              <h3 className="text-xl font-semibold mt-1 text-emerald-400">
                {
                  doctor.specialization
                }
              </h3>
            </div>

            <div>
              <p className="text-slate-400">
                Experience
              </p>

              <h3 className="text-xl font-semibold mt-1">
                {
                  doctor.experience
                }{" "}
                Years
              </h3>
            </div>

            <div>
              <p className="text-slate-400">
                Consultation Fee
              </p>

              <h3 className="text-xl font-semibold mt-1">
                ₹
                {
                  doctor.fees
                }
              </h3>
            </div>

            <div>
              <p className="text-slate-400">
                Role
              </p>

              <h3 className="text-xl font-semibold mt-1 capitalize">
                {
                  doctor.userId
                    ?.role
                }
              </h3>
            </div>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default Profile;