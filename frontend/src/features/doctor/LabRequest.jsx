// import { useState } from 'react';
// import { requestLabTest } from '../../services/labService';

// const LabRequest = () => {
//   const [data, setData] = useState({
//     patientId: '',
//     testName: ''
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleSubmit = async () => {
//     if (!data.patientId || !data.testName) {
//       setMessage("Please fill all fields");
//       return;
//     }

//     try {
//       setLoading(true);
//       setMessage('');

//       await requestLabTest(data);

//       setMessage("Lab Test Requested Successfully");

//       // Reset form
//       setData({
//         patientId: '',
//         testName: ''
//       });

//     } catch (err) {
//       setMessage(err.response?.data?.message || "Request failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow max-w-md">

//       <h2 className="text-xl font-bold mb-4">Request Lab Test</h2>

//       {/* Message */}
//       {message && (
//         <p className="mb-3 text-sm text-center text-blue-600">{message}</p>
//       )}

//       {/* Patient ID */}
//       <input
//         value={data.patientId}
//         placeholder="Patient ID"
//         className="w-full mb-3 p-2 border rounded"
//         onChange={(e) =>
//           setData({ ...data, patientId: e.target.value })
//         }
//       />

//       {/* Test Name */}
//       <input
//         value={data.testName}
//         placeholder="Test Name"
//         className="w-full mb-4 p-2 border rounded"
//         onChange={(e) =>
//           setData({ ...data, testName: e.target.value })
//         }
//       />

//       {/* Submit */}
//       <button
//         onClick={handleSubmit}
//         disabled={loading}
//         className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600 transition"
//       >
//         {loading ? "Submitting..." : "Request Test"}
//       </button>

//     </div>
//   );
// }

// export default LabRequest;


import { useState } from "react";
import { requestLabTest } from "../../services/labService";

const LabRequest = ({ patientId }) => {
  const [data, setData] = useState({
    testName: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!patientId || !data.testName) {
      setMessage("Please select patient and enter test name");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await requestLabTest({
        patientId, // ✅ AUTO FROM DASHBOARD
        testName: data.testName,
      });

      setMessage("✅ Lab Test Requested Successfully");

      setData({ testName: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-md">
      <h2 className="text-xl font-bold mb-4">Request Lab Test</h2>

      {/* Selected Patient */}
      <div className="mb-3 text-sm text-gray-600">
        Patient ID: <span className="font-semibold">{patientId || "Not selected"}</span>
      </div>

      {/* Message */}
      {message && (
        <p className="mb-3 text-sm text-center text-blue-600">{message}</p>
      )}

      {/* Test Name */}
      <input
        value={data.testName}
        placeholder="Enter Test Name"
        className="w-full mb-4 p-2 border rounded"
        onChange={(e) =>
          setData({ ...data, testName: e.target.value })
        }
      />

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600"
      >
        {loading ? "Submitting..." : "Request Test"}
      </button>
    </div>
  );
};

export default LabRequest;