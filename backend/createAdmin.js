import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
// import User from './models/User.js';
import User from './src/modules/auth/auth.model.js';

dotenv.config();

const createAdmin = async () => {
  try {
    // 🔥 CONNECT ONCE
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to:", process.env.MONGO_URI);

    // 🔍 DEBUG: show DB name
    console.log("📂 DB Name:", mongoose.connection.name);

    // 🔍 CHECK EXISTING USERS
    const allUsers = await User.find();
    console.log("👥 Existing Users:", allUsers);

    // ✅ CHECK ADMIN
    const existing = await User.findOne({ email: "admin@gmail.com" });

    if (existing) {
      console.log("⚠️ Admin already exists:", existing);
      process.exit();
    }

    // 🔐 HASH PASSWORD
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // ✅ CREATE ADMIN
    const admin = await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin"
    });

    console.log("🔥 Admin created:", admin);

    process.exit();

  } catch (error) {
    console.error("❌ ERROR:", error);
    process.exit(1);
  }
};

createAdmin();