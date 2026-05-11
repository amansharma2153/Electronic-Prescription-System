// import axiosInstance from './axiosInstance';


// // ✅ CREATE (rename to match component)
// export const bookAppointment = (data) => {
//   return axiosInstance.post('/appointments', data);
// };

// // ✅ GET ALL
// export const getAppointments = () => {
//   return axiosInstance.get('/appointments');
// };

// // ✅ GET BY DOCTOR
// export const getAppointmentsByDoctor = (id) => {
//   return axiosInstance.get(`/appointments/doctor/${id}`);
// };

// // ✅ UPDATE STATUS
// export const updateAppointmentStatus = (id, status) => {
//   return axiosInstance.put(`/appointments/${id}`, { status });
// };



import axiosInstance from "./axiosInstance";

// ✅ DOCTORS
export const getDoctors = () => {
  return axiosInstance.get("/users/doctors");
};

// ✅ BOOK
export const bookAppointment = (data) => {
  return axiosInstance.post("/appointments", data);
};

// ✅ DOCTOR APPOINTMENTS
export const getDoctorAppointments = (id) => {
  return axiosInstance.get(`/appointments/doctor/${id}`);
};

// ✅ UPDATE
export const updateAppointmentStatus = (id, status) => {
  return axiosInstance.put(`/appointments/${id}`, { status });
};