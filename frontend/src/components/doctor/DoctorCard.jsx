import { Link } from "react-router-dom";
import {
  Stethoscope,
  Clock3,
  IndianRupee,
} from "lucide-react";

import Button from "../common/Button";

const DoctorCard = ({ doctor }) => {
  return (
    <div
      className="
        bg-slate-900
        border border-slate-800

        rounded-3xl
        p-6

        transition-all duration-300

        hover:-translate-y-2
        hover:border-lime-900/40
      "
    >
      {/* Avatar */}
      <div className="flex justify-center">
        <div
          className="
            h-20 w-20

            rounded-full

            bg-lime-900/20
            border border-lime-900/30

            flex items-center justify-center
          "
        >
          <Stethoscope
            size={32}
            className="text-emerald-400"
          />
        </div>
      </div>

      {/* Info */}
      <div className="mt-5 text-center">
        <h3 className="text-xl font-semibold">
          Dr. {doctor?.userId?.name}
        </h3>

        <p className="mt-2 text-emerald-400">
          {doctor?.specialization}
        </p>
      </div>

      {/* Details */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-2 text-slate-400">
          <Clock3 size={18} />

          <span>
            {doctor?.experience} Years Experience
          </span>
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          <IndianRupee size={18} />

          <span>
            ₹{doctor?.fees} Consultation
          </span>
        </div>
      </div>

      {/* Availability */}
      <div className="mt-5">
        <span
          className="
            inline-flex

            px-3 py-1

            rounded-full

            bg-emerald-500/10
            text-emerald-400

            text-sm
          "
        >
          Available
        </span>
      </div>

      {/* Action */}
      <div className="mt-6">
        <Link
          to={`/doctors/${doctor._id}`}
        >
          <Button className="w-full">
            View Profile
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;