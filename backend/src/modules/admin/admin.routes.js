// import express from 'express';
// import mongoose from 'mongoose';

// const router = express.Router();

// // OPTIONAL: import models if needed
// // import User from '../auth/auth.model.js';

// router.get('/stats', async (req, res) => {
//   try {
//     // 🔥 REAL DATA (OPTIONAL)
//     // const totalUsers = await mongoose.model('User').countDocuments();

//     res.json({
//       totalUsers: 100,
//       totalDoctors: 20,
//       totalPatients: 60,
//       totalAppointments: 45,
//       totalPrescriptions: 70,
//       totalRevenue: 12000
//     });

//   } catch (err) {
//     res.status(500).json({ message: "Error fetching stats" });
//   }
// });

// export default router;


import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// 🔥 GET USERS
router.get('/users', async (req, res) => {
  try {
    const users = await mongoose.model('User').find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔥 DELETE USER
router.delete('/users/:id', async (req, res) => {
  try {
    await mongoose.model('User').findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔥 STATS
router.get('/stats', async (req, res) => {
  try {
    const User = mongoose.model('User');
    const Appointment = mongoose.model('Appointment');
    const Prescription = mongoose.model('Prescription');

    const totalUsers = await User.countDocuments();
    const totalDoctors = await User.countDocuments({ role: 'doctor' });
    const totalPatients = await User.countDocuments({ role: 'patient' });
    const totalAppointments = await Appointment.countDocuments();
    const totalPrescriptions = await Prescription.countDocuments();

    res.json({
      totalUsers,
      totalDoctors,
      totalPatients,
      totalAppointments,
      totalPrescriptions,
      totalRevenue: 0
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;