import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPrescriptionById } from '../../services/prescriptionService';

export default function PrescriptionDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrescription();
  }, []);

  const fetchPrescription = async () => {
    try {
      setLoading(true);
      const res = await getPrescriptionById(id);
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading prescription...</div>;
  }

  if (!data) {
    return <div className="p-6 text-red-500">Prescription not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">

      <div className="bg-white p-8 rounded-lg shadow max-w-2xl w-full">

        {/* Header */}
        <h1 className="text-2xl font-bold text-center mb-6">
          Prescription
        </h1>

        {/* Patient Info */}
        <div className="mb-4">
          <p><strong>Patient:</strong> {data.patientId?.name || data.patientId}</p>
          <p><strong>Doctor:</strong> {data.doctorId?.name || data.doctorId}</p>
        </div>

        {/* Diagnosis */}
        <div className="mb-4">
          <p className="font-semibold">Diagnosis:</p>
          <p className="text-gray-700">{data.diagnosis}</p>
        </div>

        {/* Medicines */}
        <div className="mb-6">
          <p className="font-semibold mb-2">Medicines:</p>

          <table className="w-full text-left border">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2">Medicine</th>
                <th className="p-2">Dosage</th>
                <th className="p-2">Duration</th>
              </tr>
            </thead>

            <tbody>
              {data.medicines.map((m, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{m.name}</td>
                  <td className="p-2">{m.dosage || "N/A"}</td>
                  <td className="p-2">{m.duration || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Date */}
        {data.createdAt && (
          <p className="text-sm text-gray-500 text-right">
            {new Date(data.createdAt).toLocaleDateString()}
          </p>
        )}

        {/* Actions */}
        <div className="mt-6 flex gap-3">

          <button
            onClick={() => window.print()}
            className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Print
          </button>

          <button
            className="flex-1 bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Download PDF
          </button>

        </div>

      </div>

    </div>
  );
}