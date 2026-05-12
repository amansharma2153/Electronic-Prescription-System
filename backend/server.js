import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import adminRoutes from './src/modules/admin/admin.routes.js';

dotenv.config();

const app = express();

/* ===================== MIDDLEWARE ===================== */
app.use(cors());
app.use(express.json());
app.use('/api/admin', adminRoutes);

/* ===================== DATABASE ===================== */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ DB Error:", err));

/* ===================== MODELS ===================== */

// USER
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ['doctor', 'patient', 'pharmacist', 'admin']
  }
});
const User = mongoose.model('User', userSchema);

// APPOINTMENT
const Appointment = mongoose.model('Appointment', new mongoose.Schema({
  patientId: String,
  doctorId: String,
  date: String,
  time: String,
  status: { type: String, default: 'pending' }
}, { timestamps: true }));

// PRESCRIPTION
const Prescription = mongoose.model('Prescription', new mongoose.Schema({
  patientId: String,
  doctorId: String,
  medicines: Array,
  diagnosis: String
}, { timestamps: true }));

// MEDICINE
const Medicine = mongoose.model('Medicine', new mongoose.Schema({
  name: String,
  price: Number,
  stock: { type: Number, default: 0 }
}));

// ORDER
const Order = mongoose.model('Order', new mongoose.Schema({
  items: Array,
  totalAmount: Number,
  status: { type: String, default: 'placed' }
}, { timestamps: true }));

/* ===================== AUTH MIDDLEWARE ===================== */
const protect = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

/* ===================== AUTH ===================== */

// REGISTER
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: role || 'patient'
    });

    res.json({ success: true, user });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// LOGIN
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    res.json({ token, user });

  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

/* ===================== USERS ===================== */

// GET DOCTORS
app.get('/api/users/doctors', async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" })
      .select("_id name email");

    res.json({ success: true, data: doctors });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET PATIENTS
app.get('/api/users/patients', async (req, res) => {
  try {
    const patients = await User.find({ role: "patient" })
      .select("_id name email");

    res.json({ success: true, data: patients });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET USER BY ID (FIXED)
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('_id name email role');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      data: user
    });

  } catch (err) {
    console.error("USER FETCH ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

/* ===================== APPOINTMENTS ===================== */

app.post('/api/appointments', protect, async (req, res) => {
  res.json(await Appointment.create(req.body));
});

app.get('/api/appointments', protect, async (req, res) => {
  res.json(await Appointment.find());
});

app.get('/api/appointments/doctor/:id', protect, async (req, res) => {
  res.json(await Appointment.find({ doctorId: req.params.id }));
});

app.put('/api/appointments/:id', protect, async (req, res) => {
  res.json(await Appointment.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  ));
});

/* ===================== PRESCRIPTIONS ===================== */

app.post('/api/prescriptions', protect, async (req, res) => {
  res.json(await Prescription.create(req.body));
});

app.get('/api/prescriptions', protect, async (req, res) => {
  res.json(await Prescription.find());
});

app.get('/api/prescriptions/patient/:id', async (req, res) => {
  res.json(await Prescription.find({ patientId: req.params.id }));
});

/* ===================== PHARMACY ===================== */

app.get('/api/pharmacy/medicines', async (req, res) => {
  res.json(await Medicine.find());
});

app.post('/api/pharmacy/medicines', async (req, res) => {
  const { name, price, stock } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name & price required" });
  }

  res.json(await Medicine.create({ name, price, stock }));
});

/* ===================== BILL ===================== */

const calculateBill = (medicines) => {
  return medicines.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
};

app.post('/api/pharmacy/bill', (req, res) => {
  const medicines = req.body.medicines || [];

  if (!medicines.length) {
    return res.status(400).json({ message: "No medicines" });
  }

  const total = calculateBill(medicines);

  res.json({ medicines, totalAmount: total });
});

/* ===================== ORDERS ===================== */

app.post('/api/pharmacy/orders', async (req, res) => {
  const { medicines } = req.body;

  if (!medicines || medicines.length === 0) {
    return res.status(400).json({ message: "No items" });
  }

  const total = calculateBill(medicines);

  const order = await Order.create({
    items: medicines,
    totalAmount: total
  });

  res.json({ message: "Order placed", order });
});

app.get('/api/pharmacy/orders', async (req, res) => {
  res.json(await Order.find());
});

/* ===================== HEALTH ===================== */

app.get('/', (req, res) => {
  res.send("🚀 Server Running...");
});

/* ===================== START ===================== */

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
