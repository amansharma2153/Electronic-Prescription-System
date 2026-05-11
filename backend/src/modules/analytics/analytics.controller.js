import User from '../user/user.model.js';
import Appointment from '../appointment/appointment.model.js';
import Prescription from '../prescription/prescription.model.js';
import Order from '../pharmacy/order.model.js';

export const getDashboardStats = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalDoctors = await User.countDocuments({ role: 'doctor' });
  const totalPatients = await User.countDocuments({ role: 'patient' });

  const totalAppointments = await Appointment.countDocuments();
  const totalPrescriptions = await Prescription.countDocuments();

  const orders = await Order.find();
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  res.json({
    totalUsers,
    totalDoctors,
    totalPatients,
    totalAppointments,
    totalPrescriptions,
    totalRevenue
  });
};