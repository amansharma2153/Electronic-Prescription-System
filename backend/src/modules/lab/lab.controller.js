import Lab from './lab.model.js';

export const requestLabTest = async (req, res) => {
  const lab = await Lab.create(req.body);
  res.json(lab);
};

export const uploadReport = async (req, res) => {
  const updated = await Lab.findByIdAndUpdate(
    req.params.id,
    {
      reportUrl: req.body.reportUrl,
      status: 'uploaded'
    },
    { new: true }
  );
  res.json(updated);
};

export const getPatientReports = async (req, res) => {
  const data = await Lab.find({ patientId: req.params.id });
  res.json(data);
};

export const getDoctorRequests = async (req, res) => {
  const data = await Lab.find({ doctorId: req.params.id });
  res.json(data);
};