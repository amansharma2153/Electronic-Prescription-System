// router.get('/patient/:id', async (req, res) => {
//   try {
//     const prescriptions = await Prescription.find({
//       patientId: req.params.id
//     }).populate('doctorId', 'name');

//     res.json(prescriptions);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

import mongoose from "mongoose";

router.get("/patient/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validate Mongo ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid patient ID" });
    }

    const prescriptions = await Prescription.find({
      patientId: id,
    })
      .populate("doctorId", "name email") // ✅ better info
      .sort({ createdAt: -1 }); // ✅ latest first

    // ✅ Handle empty result
    if (!prescriptions.length) {
      return res.json([]); // don't send error
    }

    res.json(prescriptions);
  } catch (err) {
    console.error("GET PATIENT PRESCRIPTIONS ERROR:", err); // 🔥 important
    res.status(500).json({ message: err.message });
  }
});