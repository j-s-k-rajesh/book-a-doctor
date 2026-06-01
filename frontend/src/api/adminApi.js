import api from "./axios";

export const getUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};

export const getDoctors = async () => {
  const response = await api.get("/admin/doctors");
  return response.data;
};

export const getAppointments = async () => {
  const response = await api.get("/admin/appointments");
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/admin/users/${id}`);
  return response.data;
};

export const deleteDoctor = async (id) => {
  const response = await api.delete(`/admin/doctors/${id}`);
  return response.data;
};

export const deleteAppointment = async (id) => {
  const response = await api.delete(`/admin/appointments/${id}`);
  return response.data;
};