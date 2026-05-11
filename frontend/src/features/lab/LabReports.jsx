import { useEffect, useState } from 'react';
import { getPatientReports } from '../../services/labService';

export default function LabReports({ patientId }) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (patientId) fetchReports();
  }, [patientId]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await getPatientReports(patientId);
      setReports(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-gray-600">Loading reports...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">

      <h2 className="text-xl font-bold mb-4">Lab Reports</h2>

      {reports.length === 0 ? (
        <p className="text-gray-500">No reports available</p>
      ) : (

        <div className="space-y-4">
          {reports.map((r) => (
            <div
              key={r._id}
              className="border p-4 rounded flex justify-between items-center hover:shadow transition"
            >
              <div>
                <p className="font-medium">{r.testName}</p>
                <p className="text-sm text-gray-500">
                  {new Date(r.createdAt).toLocaleDateString()}
                </p>
              </div>

              {r.reportUrl ? (
                <a
                  href={r.reportUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  View
                </a>
              ) : (
                <span className="text-gray-400 text-sm">Pending</span>
              )}
            </div>
          ))}
        </div>

      )}

    </div>
  );
}