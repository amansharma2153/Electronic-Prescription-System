// import { useEffect, useState } from 'react';
// import axios from '../../services/axiosInstance';

// const PatientDetails = ({ patientId }) => {
//   const [patient, setPatient] = useState(null);
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (patientId) fetchData();
//   }, [patientId]);

//   const fetchData = async () => {
//     try {
//       setLoading(true);

//       // 🔥 Replace with your backend APIs
//       const patientRes = await axios.get(`/users/${patientId}`);
//       const prescriptionRes = await axios.get(`/prescriptions?patientId=${patientId}`);
//       const reportRes = await axios.get(`/lab/reports/${patientId}`);

//       setPatient(patientRes.data);
//       setPrescriptions(prescriptionRes.data);
//       setReports(reportRes.data);

//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <div className="p-6">Loading patient details...</div>;
//   }

//   if (!patient) {
//     return <div className="p-6 text-red-500">Patient not found</div>;
//   }

//   return (
//     <div className="p-6 space-y-6">

//       {/* Patient Info */}
//       <div className="bg-white p-6 rounded-lg shadow">
//         <h2 className="text-xl font-bold mb-4">Patient Details</h2>

//         <p><strong>Name:</strong> {patient.name}</p>
//         <p><strong>Email:</strong> {patient.email}</p>
//         <p><strong>ID:</strong> {patient._id}</p>
//       </div>

//       {/* Prescriptions */}
//       <div className="bg-white p-6 rounded-lg shadow">
//         <h2 className="text-lg font-semibold mb-4">Prescriptions</h2>

//         {prescriptions.length === 0 ? (
//           <p className="text-gray-500">No prescriptions found</p>
//         ) : (
//           <ul className="space-y-3">
//             {prescriptions.map((p) => (
//               <li key={p._id} className="border p-3 rounded">
//                 <p><strong>Diagnosis:</strong> {p.diagnosis}</p>
//                 <p>
//                   <strong>Medicines:</strong>{" "}
//                   {p.medicines.map((m) => m.name).join(', ')}
//                 </p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Lab Reports */}
//       <div className="bg-white p-6 rounded-lg shadow">
//         <h2 className="text-lg font-semibold mb-4">Lab Reports</h2>

//         {reports.length === 0 ? (
//           <p className="text-gray-500">No reports available</p>
//         ) : (
//           <ul className="space-y-3">
//             {reports.map((r) => (
//               <li key={r._id} className="border p-3 rounded flex justify-between">
//                 <span>{r.testName}</span>
//                 <a
//                   href={r.fileUrl}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="text-blue-500 hover:underline"
//                 >
//                   View
//                 </a>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//     </div>
//   );
// }

// export default PatientDetails;



import { useEffect, useState } from "react";
import axios from "../../services/axiosInstance";

const PatientDetails = ({ patientId }) => {
  const [patient, setPatient] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (patientId) fetchData();
  // }, [patientId]);

  useEffect(() => {
  if (!patientId) return;

  fetchData(); // initial

  const interval = setInterval(() => {
    fetchData();
  }, 5000);

  return () => clearInterval(interval);
}, [patientId]);

  // const fetchData = async () => {
  //   try {
  //     setLoading(true);

  //     const patientRes = await axios.get(`/users/${patientId}`);

  //     // ✅ FIXED API
  //     const prescriptionRes = await axios.get(
  //       `/prescriptions/patient/${patientId}`
  //     );

  //     const reportRes = await axios.get(`/lab/reports/${patientId}`);

  //     setPatient(patientRes.data || null);
  //     setPrescriptions(prescriptionRes.data || []);
  //     setReports(reportRes.data || []);

  //   } catch (err) {
  //     console.error("PATIENT DETAILS ERROR:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchData = async () => {
  try {
    setLoading(true);

    const patientRes = await axios.get(`/users/${patientId}`);
    const prescriptionRes = await axios.get(
      `/prescriptions/patient/${patientId}`
    );
    const reportRes = await axios.get(`/lab/reports/${patientId}`);

    console.log("PATIENT API:", patientRes.data);

    setPatient(patientRes.data?.data || patientRes.data || null);
    setPrescriptions(
      prescriptionRes.data?.data || prescriptionRes.data || []
    );
    setReports(
      reportRes.data?.data || reportRes.data || []
    );

  } catch (err) {
    console.error("PATIENT DETAILS ERROR:", err);
  } finally {
    setLoading(false);
  }
};

  if (loading) {
    return <div className="p-6">Loading patient details...</div>;
  }

  if (!patient) {
    return <div className="p-6 text-red-500">Patient not found</div>;
  }

  return (
    <div className="p-6 space-y-6">

      {/* Patient Info */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Patient Details</h2>

        <p><strong>Name:</strong> {patient.name}</p>
        <p><strong>Email:</strong> {patient.email}</p>
        <p><strong>ID:</strong> {patient._id}</p>
      </div>

      {/* Prescriptions */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Prescriptions</h2>

        {prescriptions.length === 0 ? (
          <p className="text-gray-500">No prescriptions found</p>
        ) : (
          <ul className="space-y-3">
            {prescriptions.map((p) => (
              <li key={p._id} className="border p-3 rounded">
                <p><strong>Diagnosis:</strong> {p.diagnosis}</p>

                <p>
                  <strong>Medicines:</strong>{" "}
                  {(p.medicines || [])
                    .map((m) => m?.name || "Unknown")
                    .join(", ")}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Lab Reports */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Lab Reports</h2>

        {reports.length === 0 ? (
          <p className="text-gray-500">No reports available</p>
        ) : (
          <ul className="space-y-3">
            {reports.map((r) => (
              <li
                key={r._id}
                className="border p-3 rounded flex justify-between"
              >
                <span>{r.testName}</span>

                <a
                  href={r.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
};

export default PatientDetails;