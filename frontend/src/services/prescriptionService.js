import axiosInstance from './axiosInstance';

// ✅ GET ALL PRESCRIPTIONS
export const getPrescriptions = () => {
  return axiosInstance.get('/prescriptions');
};

// ✅ CREATE
export const createPrescription = (data) => {
  return axiosInstance.post('/prescriptions', data);
};

// ✅ FIXED
export const getPatientPrescriptions = (id) => {
  return axiosInstance.get(`/prescriptions/patient/${id}`);
};