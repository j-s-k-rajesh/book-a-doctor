import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Button from "../../components/common/Button";
import Input from "../../components/common/Input";

import { loginUser } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const response = await loginUser(formData);

      const { token, user } = response;

      login(user, token);

      toast.success("Login successful");

      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Section */}
        <div className="hidden lg:flex flex-col justify-center px-16">
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-4 w-4 rounded-full bg-lime-500"></div>

              <span className="font-semibold text-lime-400">
                Doctor Appointment System
              </span>
            </div>

            <h1 className="text-5xl font-bold leading-tight">
              Find & Book
              <span className="block text-lime-400">
                Trusted Doctors
              </span>
            </h1>

            <p className="mt-6 text-lg text-slate-400">
              Book appointments with verified doctors,
              manage schedules and access healthcare
              services from anywhere.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
                <h3 className="font-semibold">
                  Verified Doctors
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  Trusted healthcare professionals.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
                <h3 className="font-semibold">
                  Easy Booking
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  Schedule appointments in minutes.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
                <h3 className="font-semibold">
                  Secure Access
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  Protected user accounts.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
                <h3 className="font-semibold">
                  Fast Management
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  Track appointments easily.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-md">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
              <div className="mb-8">
                <h2 className="text-3xl font-bold">
                  Welcome Back
                </h2>

                <p className="mt-2 text-slate-400">
                  Login to your account
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />

                <Input
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <Button
                  type="submit"
                  loading={loading}
                  className="w-full"
                >
                  Login
                </Button>
              </form>

              <p className="mt-6 text-center text-slate-400">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-lime-400 hover:text-lime-300"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;