
import axios from './axiosInstance';

// ✅ GET DASHBOARD STATS
export const getDashboardStats = () => {
  return axios.get('/admin/stats');
};

// USERS
export const getUsers = () =>
  axios.get('/admin/users');

// DELETE
export const deleteUser = (id) =>
  axios.delete(`/admin/users/${id}`);