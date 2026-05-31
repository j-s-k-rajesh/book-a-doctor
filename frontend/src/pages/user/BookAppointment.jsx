import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../../layouts/MainLayout";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Loader from "../../components/common/Loader";

import { getDoctorById } from "../../api/doctorApi";
import { createAppointment } from "../../api/appointmentApi";

const BookAppointment = () => {
  const { doctorId } = useParams();

  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);

  const [appointmentDate, setAppointmentDate] =
    useState("");

  const [appointmentTime, setAppointmentTime] =
    useState("");

  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  useEffect(() => {
    fetchDoctor();
  }, []);

  const fetchDoctor = async () => {
    try {
      const response =
        await getDoctorById(doctorId);

      setDoctor(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!appointmentDate || !appointmentTime) {
      return toast.error(
        "Please select date and time"
      );
    }

    try {
      setSubmitting(true);

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      await createAppointment({
        patientId: user._id,
        doctorId: doctor._id,
        appointmentDate,
        appointmentTime,
      });

      toast.success(
        "Appointment booked successfully"
      );

      navigate("/my-appointments");
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Booking failed"
      );
    } finally {
      setSubmitting(false);
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
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div
          className="
            bg-slate-900
            border border-slate-800

            rounded-3xl

            p-8
          "
        >
          <h1 className="text-3xl font-bold">
            Book Appointment
          </h1>

          <p className="mt-2 text-slate-400">
            Schedule your consultation.
          </p>

          {/* Doctor Info */}
          <div
            className="
              mt-8

              bg-slate-950
              border border-slate-800

              rounded-2xl

              p-5
            "
          >
            <h2 className="text-xl font-semibold">
              Dr. {doctor.userId.name}
            </h2>

            <p className="text-emerald-400">
              {doctor.specialization}
            </p>

            <p className="mt-2 text-slate-400">
              {doctor.experience} Years Experience
            </p>

            <p className="text-slate-400">
              ₹{doctor.fees} Consultation Fee
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >
            <Input
              label="Appointment Date"
              type="date"
              value={appointmentDate}
              onChange={(e) =>
                setAppointmentDate(
                  e.target.value
                )
              }
            />

            <div>
              <label
                className="
                  block
                  mb-2
                  text-slate-300
                "
              >
                Appointment Time
              </label>

              <select
                value={appointmentTime}
                onChange={(e) =>
                  setAppointmentTime(
                    e.target.value
                  )
                }
                className="
                  w-full

                  px-4 py-3

                  rounded-2xl

                  bg-slate-950
                  border border-slate-700

                  text-white
                "
              >
                <option value="">
                  Select Time
                </option>

                <option>
                  09:00 AM
                </option>

                <option>
                  10:00 AM
                </option>

                <option>
                  11:00 AM
                </option>

                <option>
                  02:00 PM
                </option>

                <option>
                  03:00 PM
                </option>

                <option>
                  04:00 PM
                </option>
              </select>
            </div>

            <Button
              type="submit"
              loading={submitting}
            >
              Confirm Booking
            </Button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default BookAppointment;