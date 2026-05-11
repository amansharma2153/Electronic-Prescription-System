// import { calculateBill } from './billing.service.js';

// export const generateBill = (req, res) => {
//   const total = calculateBill(req.body.medicines);

//   res.json({
//     medicines: req.body.medicines,
//     totalAmount: total
//   });
// };

import { calculateBill } from './billing.service.js';

export const generateBill = (req, res) => {
  try {
    const medicines = req.body.medicines || [];

    if (!Array.isArray(medicines) || medicines.length === 0) {
      return res.status(400).json({
        message: "No medicines provided",
      });
    }

    const total = calculateBill(medicines);

    res.status(200).json({
      medicines,
      totalAmount: total,
    });

  } catch (error) {
    console.error("Billing Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};