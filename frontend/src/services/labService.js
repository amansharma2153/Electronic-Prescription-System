import axios from './axiosInstance';

export const requestLabTest = (data) =>
  axios.post('/lab/request', data);

export const uploadReport = (id, reportUrl) =>
  axios.put(`/lab/upload/${id}`, { reportUrl });

export const getPatientReports = (id) =>
  axios.get(`/lab/patient/${id}`);

export const getDoctorRequests = (id) =>
  axios.get(`/lab/doctor/${id}`);