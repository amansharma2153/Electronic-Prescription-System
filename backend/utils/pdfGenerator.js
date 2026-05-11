import PDFDocument from 'pdfkit';

export const generatePrescriptionPDF = (prescription, res) => {
  const doc = new PDFDocument();

  res.setHeader('Content-Type', 'application/pdf');
  doc.pipe(res);

  doc.fontSize(18).text("Prescription", { align: 'center' });

  doc.moveDown();
  doc.text(`Diagnosis: ${prescription.diagnosis}`);

  doc.moveDown();
  doc.text("Medicines:");

  prescription.medicines.forEach((med) => {
    doc.text(`- ${med.name} (${med.dosage})`);
  });

  doc.end();
};