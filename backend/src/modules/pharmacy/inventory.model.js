import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
  expiryDate: String
});

export default mongoose.model('Inventory', inventorySchema);