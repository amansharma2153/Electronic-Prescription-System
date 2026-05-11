// import { useEffect, useState } from 'react';
// import { getPatientPrescriptions } from '../../services/prescriptionService';
// import useAuthStore from '../../store/authStore';

// const PrescriptionList= () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const { user } = useAuthStore(); // 🔥 logged-in patient

//   useEffect(() => {
//     if (user?._id) {
//       fetchData();
//     }
//   }, [user]);

//   const fetchData = async () => {
//     try {
//       setLoading(true);

//       // 🔥 FIX: fetch ONLY this patient's prescriptions
//       const res = await getPatientPrescriptions(user._id);

//       setData(res.data || []);
//     } catch (err) {
//       console.error("Error fetching prescriptions:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <div className="p-4 text-gray-600">Loading prescriptions...</div>;
//   }

//   return (
//     <div>
//       <h2 className="text-lg font-semibold mb-4">Your Prescriptions</h2>

//       {data.length === 0 ? (
//         <p className="text-gray-500">No prescriptions available</p>
//       ) : (
//         <div className="space-y-4">
//           {data.map((p, index) => {

//             const medicines = (p.medicines || []).map(m =>
//               typeof m === 'string' ? m : m.name
//             );

//             const uniqueMedicines = [...new Set(medicines)];

//             return (
//               <div
//                 key={p._id || index}
//                 className="border p-4 rounded-lg bg-gray-50 hover:shadow transition"
//               >
//                 {/* Header */}
//                 <div className="flex justify-between items-center mb-2">
//                   <h3 className="font-semibold">
//                     Prescription #{index + 1}
//                   </h3>

//                   {p.createdAt && (
//                     <span className="text-xs text-gray-500">
//                       {new Date(p.createdAt).toLocaleDateString()}
//                     </span>
//                   )}
//                 </div>

//                 {/* Diagnosis */}
//                 <p className="mb-2 text-sm text-gray-700">
//                   <span className="font-medium">Diagnosis:</span>{" "}
//                   {p.diagnosis || "N/A"}
//                 </p>

//                 {/* Medicines */}
//                 <div>
//                   <p className="text-sm font-medium text-gray-600 mb-1">
//                     Medicines:
//                   </p>

//                   <ul className="list-disc list-inside text-sm">
//                     {uniqueMedicines.map((med, i) => (
//                       <li key={i}>{med}</li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

// export default PrescriptionList;


import { useEffect, useState } from "react";
import { getPatientPrescriptions } from "../../services/prescriptionService";
import useAuthStore from "../../store/authStore";

const PrescriptionList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuthStore();

  // ✅ Fetch when user is ready
  useEffect(() => {
    if (user && user._id) {
      fetchData(user._id);
    }
  }, [user]);

  // ✅ Fetch prescriptions
  const fetchData = async (id) => {
    try {
      setLoading(true);
      const res = await getPatientPrescriptions(id);
      setData(res.data || []);
    } catch (err) {
      console.error("Error fetching prescriptions:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Loading state
  if (!user) {
    return <div className="p-4 text-gray-600">Loading user...</div>;
  }

  if (loading) {
    return <div className="p-4 text-gray-600">Loading prescriptions...</div>;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Your Prescriptions</h2>

      {/* ✅ Empty state */}
      {data.length === 0 ? (
        <p className="text-gray-500">No prescriptions available</p>
      ) : (
        <div className="space-y-4">
          {data.map((p, index) => {
            // ✅ Safe medicines mapping
            const medicines = (p.medicines || []).map((m) =>
              typeof m === "string" ? m : m?.name || "Unknown"
            );

            const uniqueMedicines = [...new Set(medicines)];

            return (
              <div
                key={p._id || index}
                className="border p-4 rounded-lg bg-gray-50 hover:shadow transition"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">
                    Prescription #{index + 1}
                  </h3>

                  {p.createdAt && (
                    <span className="text-xs text-gray-500">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </div>

                {/* Doctor Info */}
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Doctor:</span>{" "}
                  {p.doctorId?.name || "Unknown"}
                </p>

                {/* Diagnosis */}
                <p className="mb-2 text-sm text-gray-700">
                  <span className="font-medium">Diagnosis:</span>{" "}
                  {p.diagnosis || "N/A"}
                </p>

                {/* Medicines */}
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Medicines:
                  </p>

                  <ul className="list-disc list-inside text-sm">
                    {uniqueMedicines.map((med, i) => (
                      <li key={i}>{med}</li>
                    ))}
                  </ul>
                </div>

                {/* Notes (optional) */}
                {p.notes && (
                  <p className="mt-2 text-sm text-gray-600">
                    <span className="font-medium">Notes:</span> {p.notes}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PrescriptionList;