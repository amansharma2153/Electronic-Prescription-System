import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import Appointment from "../models/appointment.model.js";

const router = express.Router();

/* ================= BOOK APPOINTMENT ================= */
router.post("/", protect, async (req, res) => {
  try {
    const { doctorId, date, time, reason } = req.body;

    console.log("REQ.USER:", req.user); // 🔍 debug

    const appointment = await Appointment.create({
      patientId: req.user._id,   // ✅ FIXED (CRITICAL)
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
});

/* ================= GET DOCTOR APPOINTMENTS ================= */
router.get("/doctor/:id", protect, async (req, res) => {
  try {
    const data = await Appointment.find({
      doctorId: req.params.id,
    })
      .populate("patientId", "name email") // ✅ THIS GIVES PATIENT NAME
      .sort({ createdAt: -1 });

    console.log("APPOINTMENTS:", data); // 🔍 debug

    res.json(data);
  } catch (err) {
    console.error("FETCH ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

/* ================= UPDATE STATUS ================= */
router.put("/:id", protect, async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;