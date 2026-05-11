import mongoose from 'mongoose';

const labSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  testName: String,
  reportUrl: String,
  status: {
    type: String,
    enum: ['requested', 'uploaded'],
    default: 'requested'
  }
}, { timestamps: true });

export default mongoose.model('Lab', labSchema);