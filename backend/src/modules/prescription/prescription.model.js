// // import mongoose from 'mongoose';

// // const prescriptionSchema = new mongoose.Schema({
  
// //   patientId: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: 'User',
// //     required: true
// //   },

// //   doctorId: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: 'User',
// //     required: true
// //   },

// //   medicines: [
// //     {
// //       name: String,
// //       dosage: String,
// //       frequency: String,
// //       duration: String
// //     }
// //   ],

// //   diagnosis: String,

// //   notes: String,

// //   createdAt: {
// //     type: Date,
// //     default: Date.now
// //   }

// // });

// // export default mongoose.model('Prescription', prescriptionSchema);

// // models/Prescription.js

// import mongoose from 'mongoose';
// import { v4 as uuidv4 } from 'uuid';

// const prescriptionSchema = new mongoose.Schema({
  
//   prescriptionId: {
//     type: String,
//     unique: true,
//     required: true,
//     default: () => uuidv4()
//   },

//   patientId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },

//   doctorId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },

//   medicines: [
//     {
//       name: String,
//       dosage: String,
//       frequency: String,
//       duration: String
//     }
//   ],

//   diagnosis: String,

//   notes: String,

//   createdAt: {
//     type: Date,
//     default: Date.now
//   }

// });

// export default mongoose.model('Prescription', prescriptionSchema);


import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const prescriptionSchema = new mongoose.Schema({
  prescriptionId: {
    type: String,
    unique: true,
    default: uuidv4, // ✅ auto-generate
  },

  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  medicines: [
    {
      name: String,
      dosage: String,
      frequency: String,
      duration: String,
    },
  ],

  diagnosis: String,
  notes: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Prescription", prescriptionSchema);