import Inventory from './inventory.model.js';
import Order from './order.model.js';
import Prescription from '../prescription/prescription.model.js';

export const getPrescriptions = async (req, res) => {
  const data = await Prescription.find();
  res.json(data);
};

export const checkInventory = async (req, res) => {
  const medicines = req.body.medicines;

  const result = [];

  for (let med of medicines) {
    const item = await Inventory.findOne({ name: med.name });

    if (!item || item.quantity < med.quantity) {
      return res.json({
        available: false,
        message: `${med.name} not available`
      });
    }

    result.push(item);
  }

  res.json({ available: true, items: result });
};

export const dispenseMedicine = async (req, res) => {
  const { medicines, prescriptionId, patientId } = req.body;

  let total = 0;

  for (let med of medicines) {
    const item = await Inventory.findOne({ name: med.name });

    item.quantity -= med.quantity;
    total += item.price * med.quantity;

    await item.save();
  }

  const order = await Order.create({
    prescriptionId,
    patientId,
    medicines,
    totalAmount: total
  });

  res.json(order);
};