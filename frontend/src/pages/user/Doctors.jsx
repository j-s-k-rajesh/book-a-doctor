import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";
import DoctorCard from "../../components/doctor/DoctorCard";
import Loader from "../../components/common/Loader";

import { getDoctors } from "../../api/doctorApi";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await getDoctors();

      setDoctors(response.data);
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
            Find Doctors
          </h1>

          <p className="mt-2 text-slate-400">
            Browse available healthcare professionals.
          </p>
        </div>

        {doctors.length === 0 ? (
          <div
            className="
              bg-slate-900
              border border-slate-800
              rounded-3xl
              p-10
              text-center
            "
          >
            No doctors found.
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
              gap-6
            "
          >
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor._id}
                doctor={doctor}
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Doctors;