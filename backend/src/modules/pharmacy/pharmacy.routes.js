// import express from 'express';
// import {
//   getPrescriptions,
//   checkInventory,
//   dispenseMedicine
// } from './pharmacy.controller.js';

// const router = express.Router();

// router.get('/prescriptions', getPrescriptions);
// router.post('/check', checkInventory);
// router.post('/dispense', dispenseMedicine);

// export default router;


import express from 'express';
import {
  getPrescriptions,
  checkInventory,
  dispenseMedicine
} from './pharmacy.controller.js';

// ✅ IMPORT BILL CONTROLLER
import { generateBill } from '../billing/billing.controller.js'; 
// ⚠️ adjust path if different

const router = express.Router();

router.get('/prescriptions', getPrescriptions);
router.post('/check', checkInventory);
router.post('/dispense', dispenseMedicine);

// ✅ ADD THIS LINE (IMPORTANT)
router.post('/bill', generateBill);

export default router;