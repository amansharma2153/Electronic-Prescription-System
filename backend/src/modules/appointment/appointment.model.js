// import mongoose from 'mongoose';

// const appointmentSchema = new mongoose.Schema({
//   patientId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   },
//   doctorId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   },
//   date: String,
//   time: String,
//   status: {
//     type: String,
//     enum: ['pending', 'accepted', 'rejected', 'completed'],
//     default: 'pending'
//   },
//   reason: String
// }, { timestamps: true });

// export default mongoose.model('Appointment', appointmentSchema);


import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // 🔥 MUST match user model name
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);