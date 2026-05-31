import { Link } from "react-router-dom";
import {
  Stethoscope,
  CalendarDays,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";

import MainLayout from "../../layouts/MainLayout";
import Button from "../../components/common/Button";

const features = [
  {
    icon: Stethoscope,
    title: "Verified Doctors",
    description: "Experienced healthcare professionals.",
  },
  {
    icon: CalendarDays,
    title: "Easy Booking",
    description: "Book appointments within minutes.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Platform",
    description: "Protected user and appointment data.",
  },
  {
    icon: UserRoundCheck,
    title: "Trusted Care",
    description: "Reliable healthcare experience.",
  },
];

const Home = () => {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <div
                className="
                  inline-flex items-center gap-2
                  px-4 py-2
                  rounded-full

                  bg-lime-900/20
                  border border-lime-900/30

                  text-emerald-400
                  text-sm
                "
              >
                <ShieldCheck size={16} />
                Trusted Healthcare Platform
              </div>

              <h1
                className="
                  mt-6
                  text-4xl
                  md:text-5xl
                  lg:text-6xl

                  font-bold
                  tracking-tight
                  leading-tight
                "
              >
                Book Doctor
                <span className="block text-emerald-400">
                  Appointments
                </span>
                In Minutes
              </h1>

              <p
                className="
                  mt-6
                  text-lg
                  text-slate-400
                  max-w-xl
                "
              >
                Find trusted doctors, compare
                specializations, and book appointments
                online with ease.
              </p>

              <div className="mt-8">
                <Link to="/doctors">
                  <Button>
                    Find Doctors
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Card */}
            <div
              className="
                bg-slate-900
                border border-slate-800

                rounded-3xl
                p-8

                shadow-2xl
              "
            >
              <div className="space-y-8">
                {/* Item */}
                <div className="flex items-center gap-4">
                  <div
                    className="
                      h-14 w-14

                      rounded-2xl

                      bg-lime-900/20
                      border border-lime-900/30

                      flex items-center justify-center
                    "
                  >
                    <Stethoscope
                      size={26}
                      className="text-emerald-400"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">
                      Verified Doctors
                    </h3>

                    <p className="text-slate-400">
                      Qualified healthcare professionals
                    </p>
                  </div>
                </div>

                <div className="h-px bg-slate-800" />

                <div className="flex items-center gap-4">
                  <div
                    className="
                      h-14 w-14

                      rounded-2xl

                      bg-lime-900/20
                      border border-lime-900/30

                      flex items-center justify-center
                    "
                  >
                    <CalendarDays
                      size={26}
                      className="text-emerald-400"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">
                      Easy Booking
                    </h3>

                    <p className="text-slate-400">
                      Schedule appointments in minutes
                    </p>
                  </div>
                </div>

                <div className="h-px bg-slate-800" />

                <div className="flex items-center gap-4">
                  <div
                    className="
                      h-14 w-14

                      rounded-2xl

                      bg-lime-900/20
                      border border-lime-900/30

                      flex items-center justify-center
                    "
                  >
                    <ShieldCheck
                      size={26}
                      className="text-emerald-400"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg">
                      Secure Platform
                    </h3>

                    <p className="text-slate-400">
                      Protected access and data security
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { value: "500+", label: "Doctors" },
              { value: "10K+", label: "Patients" },
              { value: "24/7", label: "Support" },
            ].map((item) => (
              <div
                key={item.label}
                className="
                  bg-slate-900
                  border border-slate-800

                  rounded-3xl
                  p-8

                  text-center
                "
              >
                <h3 className="text-4xl font-bold text-emerald-400">
                  {item.value}
                </h3>

                <p className="mt-2 text-slate-400">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="pb-20">
          <h2 className="text-3xl font-bold text-center">
            Why Choose Us
          </h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="
                    bg-slate-900
                    border border-slate-800

                    rounded-3xl
                    p-6

                    hover:border-lime-900/40
                    hover:-translate-y-2

                    transition-all duration-300
                  "
                >
                  <div
                    className="
                      h-14 w-14

                      rounded-2xl

                      bg-lime-900/20
                      border border-lime-900/30

                      flex items-center justify-center
                    "
                  >
                    <Icon
                      size={26}
                      className="text-emerald-400"
                    />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-400">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="pb-20">
          <div
            className="
              bg-linear-to-br
              from-slate-900
              to-slate-950

              border border-slate-800

              rounded-3xl
              p-10

              text-center
            "
          >
            <h2 className="text-3xl font-bold">
              Ready to Connect
              With the Right Doctor?
            </h2>

            <p className="mt-4 text-slate-400">
              Explore our doctors and find the right
              healthcare professional.
            </p>

            <div className="mt-8">
              <Link to="/doctors">
                <Button>
                  Explore Doctors
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Home;