// // // import Appointment from './appointment.model.js';
// // // import { createNotification } from '../notification/notification.service.js';


// // // export const bookAppointment = async (req, res) => {
// // //   const appointment = await Appointment.create(req.body);
// // //   res.json(appointment);
// // // };

// // // export const getDoctorAppointments = async (req, res) => {
// // //   const data = await Appointment.find({ doctorId: req.params.id })
// // //     .populate('patientId', 'name email');
// // //   res.json(data);
// // // };

// // // export const updateStatus = async (req, res) => {
// // //   const updated = await Appointment.findByIdAndUpdate(
// // //     req.params.id,
// // //     { status: req.body.status },
// // //     { new: true }
// // //   );
// // //   res.json(updated);
// // // };

// // // export const updateStatus = async (req, res) => {
// // //   const updated = await Appointment.findByIdAndUpdate(
// // //     req.params.id,
// // //     { status: req.body.status },
// // //     { new: true }
// // //   );

// // //   // 🔔 Notify patient
// // //   await createNotification(
// // //     updated.patientId,
// // //     `Your appointment is ${updated.status}`,
// // //     'appointment'
// // //   );

// // //   res.json(updated);
// // // };

// // import Appointment from './appointment.model.js';
// // import { createNotification } from '../notification/notification.service.js';


// // // ✅ BOOK APPOINTMENT (FIXED)
// // export const bookAppointment = async (req, res) => {
// //   try {
// //     const { doctorId, date, time, reason } = req.body;

// //     const appointment = await Appointment.create({
// //       patientId: req.user.id,   // ✅ from JWT
// //       doctorId,
// //       date,
// //       time,
// //       reason,
// //     });

// //     res.json(appointment);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };


// // // ✅ GET DOCTOR APPOINTMENTS
// // export const getDoctorAppointments = async (req, res) => {
// //   try {
// //     console.log("Doctor ID:", req.params.id);

// //     const data = await Appointment.find({
// //       doctorId: req.params.id,
// //     }).populate('patientId', 'name email');

// //     console.log("Appointments:", data);

// //     res.json(data);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };


// // // ✅ UPDATE STATUS (FIXED + NOTIFICATION)
// // export const updateStatus = async (req, res) => {
// //   try {
// //     const updated = await Appointment.findByIdAndUpdate(
// //       req.params.id,
// //       { status: req.body.status },
// //       { new: true }
// //     );

// //     // 🔔 Notify patient
// //     await createNotification(
// //       updated.patientId,
// //       `Your appointment is ${updated.status}`,
// //       'appointment'
// //     );

// //     res.json(updated);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };


// export const bookAppointment = async (req, res) => {
//   try {
//     console.log("REQ.USER:", req.user); // 🔍 DEBUG

//     const patientId =
//       req.user?.id ||
//       req.user?.userId ||
//       req.user?._id;

//     if (!patientId) {
//       return res.status(400).json({
//         message: "❌ Patient ID missing in token",
//       });
//     }

//     const { doctorId, date, time, reason } = req.body;

//     const appointment = await Appointment.create({
//       patientId,   // ✅ now guaranteed
//       doctorId,
//       date,
//       time,
//       reason,
//     });

//     res.json(appointment);

//   } catch (err) {
//     console.error("BOOK ERROR:", err);
//     res.status(500).json({ message: err.message });
//   }
// };



import Appointment from './appointment.model.js';
import { createNotification } from '../notification/notification.service.js';


// ✅ BOOK APPOINTMENT
export const bookAppointment = async (req, res) => {
  try {
    console.log("REQ.USER:", req.user);

    const patientId =
      req.user?.id ||
      req.user?.userId ||
      req.user?._id;

    if (!patientId) {
      return res.status(400).json({
        message: "❌ Patient ID missing in token",
      });
    }

    const { doctorId, date, time, reason } = req.body;

    const appointment = await Appointment.create({
      patientId,
      doctorId,
      date,
      time,
      reason,
    });

    res.json(appointment);

  } catch (err) {
    console.error("BOOK ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};


// ✅ GET DOCTOR APPOINTMENTS (🔥 THIS FIXES YOUR ISSUE)
export const getDoctorAppointments = async (req, res) => {
  try {
    const data = await Appointment.find({
      doctorId: req.params.id,
    })
      .populate("patientId", "name email") // 🔥 REQUIRED
      .populate("doctorId", "name");       // optional

    res.json(data);

  } catch (err) {
    console.error("FETCH ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};


// ✅ UPDATE STATUS + NOTIFICATION
export const updateStatus = async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    // 🔔 Notify patient
    await createNotification(
      updated.patientId,
      `Your appointment is ${updated.status}`,
      "appointment"
    );

    res.json(updated);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};