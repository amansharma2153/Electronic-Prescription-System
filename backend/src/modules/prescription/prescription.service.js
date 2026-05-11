// import Prescription from './prescription.model.js';

// export const createPrescriptionService = async (data) => {
//   return await Prescription.create(data);
// };

// export const getAllPrescriptionsService = async () => {
//   return await Prescription.find();
// };

// export const getPatientPrescriptions = async (patientId) => {
//   return await Prescription.find({ patientId });
// };


import Prescription from './prescription.model.js';


// ✅ CREATE
export const createPrescriptionService = async (data) => {
  try {
    return await Prescription.create(data);
  } catch (err) {
    console.error("SERVICE CREATE ERROR:", err);
    throw err;
  }
};


// ✅ GET ALL (with relations)
export const getAllPrescriptionsService = async () => {
  try {
    return await Prescription.find()
      .populate("doctorId", "name email")
      .populate("patientId", "name email")
      .sort({ createdAt: -1 });
  } catch (err) {
    console.error("SERVICE GET ALL ERROR:", err);
    throw err;
  }
};


// ✅ GET BY PATIENT (important fix)
export const getPatientPrescriptions = async (patientId) => {
  try {
    return await Prescription.find({ patientId })
      .populate("doctorId", "name email") // 🔥 important
      .sort({ createdAt: -1 });
  } catch (err) {
    console.error("SERVICE GET PATIENT ERROR:", err);
    throw err;
  }
};