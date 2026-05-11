import express from 'express';
import {
  requestLabTest,
  uploadReport,
  getPatientReports,
  getDoctorRequests
} from './lab.controller.js';

const router = express.Router();

router.post('/request', requestLabTest);
router.put('/upload/:id', uploadReport);
router.get('/patient/:id', getPatientReports);
router.get('/doctor/:id', getDoctorRequests);

export default router;