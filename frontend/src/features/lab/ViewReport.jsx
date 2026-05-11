import { useEffect, useState } from 'react';
import { getReports } from '../../services/labService';

export default function ViewReport({ patientId }) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (patientId) fetchReports();
  }, [patientId]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await getReports(patientId);
      setReports(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading reports...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">

      <h2 className="text-xl font-bold mb-4">Lab Reports</h2>

      {reports.length === 0 ? (
        <p className="text-gray-500">No reports available</p>
      ) : (

        <div className="overflow-x-auto">
          <table className="w-full text-left">

            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="p-3">Test Name</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {reports.map((r) => (
                <tr key={r._id} className="border-b hover:bg-gray-50">

                  <td className="p-3 font-medium">{r.testName}</td>

                  <td className="p-3">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-3 text-center">
                    <a
                      href={r.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      View
                    </a>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

      )}

    </div>
  );
}