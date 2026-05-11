// import axios from './axiosInstance';

// // ✅ GET MEDICINES
// export const getMedicines = () => {
//   return axios.get('/pharmacy/medicines');
// };

// // ✅ ADD MEDICINE
// export const addMedicine = (data) => {
//   return axios.post('/pharmacy/medicines', data);
// };

// // ✅ UPDATE MEDICINE
// export const updateMedicine = (id, data) => {
//   return axios.put(`/pharmacy/medicines/${id}`, data);
// };

// // ✅ DELETE MEDICINE
// export const deleteMedicine = (id) => {
//   return axios.delete(`/pharmacy/medicines/${id}`);
// };

// // ✅ ORDER
// export const placeOrder = (data) => {
//   return axios.post('/pharmacy/orders', data);
// };

// // ✅ BILL
// export const createBill = (data) => {
//   return axios.post('/pharmacy/bill', data);
// };


import axios from './axiosInstance';

// ✅ GET MEDICINES
export const getMedicines = () => {
  return axios.get('/pharmacy/medicines');
};

// ✅ ADD MEDICINE
export const addMedicine = (data) => {
  return axios.post('/pharmacy/medicines', data);
};

// ✅ UPDATE MEDICINE
export const updateMedicine = (id, data) => {
  return axios.put(`/pharmacy/medicines/${id}`, data);
};

// ✅ DELETE MEDICINE
export const deleteMedicine = (id) => {
  return axios.delete(`/pharmacy/medicines/${id}`);
};

// ✅ PLACE ORDER
export const placeOrder = (data) => {
  return axios.post('/pharmacy/orders', data);
};

// ✅ GET ORDERS (🔥 ADD THIS)
export const getOrders = () => {
  return axios.get('/pharmacy/orders');
};

// ✅ CREATE BILL
export const createBill = (data) => {
  return axios.post('/pharmacy/bill', data);
};