import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['doctor', 'patient', 'pharmacist', 'admin'],
    default: 'patient'
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);


// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   role: {
//     type: String,
//     enum: ['doctor', 'patient', 'pharmacist', 'admin']
//   }
// });

// // 🔥 prevents overwrite error
// export default mongoose.models.User || mongoose.model('User', userSchema);