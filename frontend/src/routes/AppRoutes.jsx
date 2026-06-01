import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Patient Pages
import Home from "../pages/user/Home";
import Doctors from "../pages/user/Doctors";
import DoctorProfile from "../pages/user/DoctorProfile";
import BookAppointment from "../pages/user/BookAppointment";
import MyAppointments from "../pages/user/MyAppointments";

// Doctor Pages
import DoctorDashboard from "../pages/doctor/Dashboard";
import DoctorAppointments from "../pages/doctor/Appointments";
import DoctorProfilePage from "../pages/doctor/Profile";

// Admin Pages
import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import AdminDoctors from "../pages/admin/Doctors";
import AdminAppointments from "../pages/admin/Appointments";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* ================= PATIENT ================= */}

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/doctors"
        element={
          <ProtectedRoute>
            <Doctors />
          </ProtectedRoute>
        }
      />

      <Route
        path="/doctors/:id"
        element={
          <ProtectedRoute>
            <DoctorProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/book/:doctorId"
        element={
          <ProtectedRoute>
            <BookAppointment />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-appointments"
        element={
          <ProtectedRoute>
            <MyAppointments />
          </ProtectedRoute>
        }
      />

      {/* ================= DOCTOR ================= */}

      <Route
        path="/doctor/dashboard"
        element={
          <ProtectedRoute>
            <RoleRoute role="doctor">
              <DoctorDashboard />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/doctor/appointments"
        element={
          <ProtectedRoute>
            <RoleRoute role="doctor">
              <DoctorAppointments />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/doctor/profile"
        element={
          <ProtectedRoute>
            <RoleRoute role="doctor">
              <DoctorProfilePage />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      {/* ================= ADMIN ================= */}

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <RoleRoute role="admin">
              <Dashboard />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute>
            <RoleRoute role="admin">
              <Users />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/doctors"
        element={
          <ProtectedRoute>
            <RoleRoute role="admin">
              <AdminDoctors />
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/appointments"
        element={
          <ProtectedRoute>
            <RoleRoute role="admin">
              <AdminAppointments />
            </RoleRoute>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;