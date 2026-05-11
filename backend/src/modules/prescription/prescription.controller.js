// export const createPrescription = async (req, res) => {
//   try {
//     const prescription = await Prescription.create({
//       patientId: req.body.patientId,
//       doctorId: req.user.id, // logged-in doctor
//       medicines: req.body.medicines,
//       diagnosis: req.body.diagnosis,
//       notes: req.body.notes
//     });

//     res.json(prescription);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

export const createPrescription = async (req, res) => {
  try {
    const { patientId, medicines, diagnosis, notes } = req.body;

    // ✅ Validate required fields
    if (!patientId || !medicines || medicines.length === 0) {
      return res.status(400).json({
        message: "Patient and medicines are required",
      });
    }

    // ✅ Validate logged-in doctor
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Unauthorized - doctor not logged in",
      });
    }

    // ✅ Create prescription
    const prescription = await Prescription.create({
      patientId,
      doctorId: req.user.id, // from JWT
      medicines,
      diagnosis,
      notes,
    });

    res.status(201).json(prescription);

  } catch (err) {
    console.error("CREATE PRESCRIPTION ERROR:", err); // 🔥 important
    res.status(500).json({ message: err.message });
  }
};