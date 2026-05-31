import {
  CalendarDays,
  Clock3,
  UserRound,
  BadgeIndianRupee,
} from "lucide-react";

const AppointmentCard = ({ appointment }) => {
  const statusStyles = {
    pending:
      "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",

    approved:
      "bg-green-500/10 text-green-400 border-green-500/20",

    rejected:
      "bg-red-500/10 text-red-400 border-red-500/20",

    completed:
      "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };

  return (
    <div
      className="
        bg-slate-900
        border border-slate-800

        rounded-3xl

        p-6
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">
            {appointment.doctorName}
          </h3>

          <p className="text-emerald-400">
            {appointment.specialization}
          </p>
        </div>

        <span
          className={`
            px-3 py-1
            rounded-full
            border
            text-sm
            capitalize

            ${statusStyles[appointment.status]}
          `}
        >
          {appointment.status}
        </span>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-3 text-slate-400">
          <UserRound size={18} />

          {appointment.patientName}
        </div>

        <div className="flex items-center gap-3 text-slate-400">
          <CalendarDays size={18} />

          {appointment.appointmentDate}
        </div>

        <div className="flex items-center gap-3 text-slate-400">
          <Clock3 size={18} />

          {appointment.appointmentTime}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;