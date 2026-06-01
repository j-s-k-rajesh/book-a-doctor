import api from "./axios";

export const getAppointments = async () => {
  const response = await api.get("/appointments");
  return response.data;
};

export const createAppointment = async (appointmentData) => {
  const response = await api.post(
    "/appointments",
    appointmentData
  );

  return response.data;
};

export const updateAppointment = async (
  id,
  data
) => {
  const response = await api.put(
    `/appointments/${id}`,
    data
  );

  return response.data;
};  