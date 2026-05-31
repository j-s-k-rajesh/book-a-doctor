import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
  Stethoscope,
  Mail,
  Clock3,
  IndianRupee,
} from "lucide-react";

import MainLayout from "../../layouts/MainLayout";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";

import { getDoctorById } from "../../api/doctorApi";

const DoctorProfile = () => {
  const { id } = useParams();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctor();
  }, []);

  const fetchDoctor = async () => {
    try {
      const response = await getDoctorById(id);

      setDoctor(response.data);
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

  if (!doctor) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          Doctor not found.
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div
          className="
            bg-slate-900
            border border-slate-800

            rounded-3xl

            p-8 md:p-10
          "
        >
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left */}
            <div className="flex flex-col items-center">
              <div
                className="
                  h-32 w-32

                  rounded-full

                  bg-lime-900/20
                  border border-lime-900/30

                  flex items-center justify-center
                "
              >
                <Stethoscope
                  size={50}
                  className="text-emerald-400"
                />
              </div>

              <span
                className="
                  mt-5

                  px-4 py-2

                  rounded-full

                  bg-emerald-500/10
                  text-emerald-400

                  text-sm
                "
              >
                Available
              </span>
            </div>

            {/* Right */}
            <div className="md:col-span-2">
              <h1 className="text-4xl font-bold">
                Dr. {doctor.userId.name}
              </h1>

              <p className="mt-2 text-xl text-emerald-400">
                {doctor.specialization}
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex items-center gap-3 text-slate-300">
                  <Mail size={20} />

                  <span>{doctor.userId.email}</span>
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <Clock3 size={20} />

                  <span>
                    {doctor.experience} Years Experience
                  </span>
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <IndianRupee size={20} />

                  <span>
                    ₹{doctor.fees} Consultation Fee
                  </span>
                </div>
              </div>

              <div className="mt-10">
                <Link to={`/book/${doctor._id}`}>
                  <Button>
                    Book Appointment
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DoctorProfile;