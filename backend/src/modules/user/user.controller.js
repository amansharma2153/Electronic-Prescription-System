// import User from './user.model.js';

// export const getAllUsers = async (req, res) => {
//   const users = await User.find();
//   res.json(users);
// };

// export const deleteUser = async (req, res) => {
//   await User.findByIdAndDelete(req.params.id);
//   res.json({ message: "User deleted" });
// };


import User from './user.model.js';

// ✅ GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ DELETE USER
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔥 ADD THIS (MAIN FIX)
export const getPatients = async (req, res) => {
  try {
    const patients = await User.find({ role: 'patient' })
      .select('_id name email');

    res.status(200).json({
      success: true,
      data: patients
    });

  } catch (error) {
    console.error("GET PATIENTS ERROR:", error);
    res.status(500).json({
      message: error.message
    });
  }
};