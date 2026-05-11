import { useState } from 'react';
import { uploadReport } from '../../services/labService';

export default function UploadReport() {
  const [form, setForm] = useState({
    labId: '',
    fileUrl: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpload = async () => {
    if (!form.labId || !form.fileUrl) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setMessage('');

      await uploadReport(form.labId, form.fileUrl);

      setMessage("Report Uploaded Successfully");

      // Reset
      setForm({ labId: '', fileUrl: '' });

    } catch (err) {
      setMessage(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-md">

      <h2 className="text-xl font-bold mb-4">Upload Lab Report</h2>

      {/* Message */}
      {message && (
        <p className="mb-3 text-sm text-center text-blue-600">{message}</p>
      )}

      {/* Lab ID */}
      <input
        value={form.labId}
        placeholder="Lab ID"
        className="w-full mb-3 p-2 border rounded"
        onChange={(e) =>
          setForm({ ...form, labId: e.target.value })
        }
      />

      {/* Report URL */}
      <input
        value={form.fileUrl}
        placeholder="Report URL"
        className="w-full mb-4 p-2 border rounded"
        onChange={(e) =>
          setForm({ ...form, fileUrl: e.target.value })
        }
      />

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="w-full bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600 transition"
      >
        {loading ? "Uploading..." : "Upload Report"}
      </button>

    </div>
  );
}