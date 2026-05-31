import api from "./axios";

export const getDoctors = async () => {
  const response = await api.get("/doctors");
  return response.data;
};

export const getDoctorById = async (id) => {
  const response = await api.get(`/doctors/${id}`);
  return response.data;
};