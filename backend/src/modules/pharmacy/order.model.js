import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  prescriptionId: String,
  patientId: String,
  medicines: Array,
  totalAmount: Number,
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);