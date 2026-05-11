// import { useEffect, useState } from 'react';
// import {
//   getDoctorAppointments,
//   updateAppointmentStatus
// } from '../../services/appointmentService';

// export default function AppointmentList({ doctorId }) {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (doctorId) fetchAppointments();
//   }, [doctorId]);

//   const fetchAppointments = async () => {
//     try {
//       setLoading(true);
//       const res = await getDoctorAppointments(doctorId);
//       setAppointments(res.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatus = async (id, status) => {
//     try {
//       await updateAppointmentStatus(id, status);
//       fetchAppointments();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (loading) {
//     return <div className="p-6 text-gray-600">Loading appointments...</div>;
//   }

//   return (
//     <div className="bg-white p-6 rounded-lg shadow">

//       <h2 className="text-xl font-bold mb-4">Appointments</h2>

//       {appointments.length === 0 ? (
//         <p className="text-gray-500">No appointments found</p>
//       ) : (

//         <div className="overflow-x-auto">
//           <table className="w-full text-left">

//             <thead className="bg-gray-200 text-gray-700">
//               <tr>
//                 <th className="p-3">Patient</th>
//                 <th className="p-3">Date</th>
//                 <th className="p-3">Time</th>
//                 <th className="p-3">Status</th>
//                 <th className="p-3 text-center">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {appointments.map((a) => (
//                 <tr key={a._id} className="border-b hover:bg-gray-50">

//                   <td className="p-3 font-medium">
//                     {a.patientId?.name || "Unknown"}
//                   </td>

//                   <td className="p-3">{a.date}</td>
//                   <td className="p-3">{a.time}</td>

//                   <td className="p-3">
//                     <span className={`px-3 py-1 rounded-full text-sm font-medium text-white
//                       ${a.status === 'pending' ? 'bg-yellow-500' :
//                         a.status === 'accepted' ? 'bg-green-500' :
//                         a.status === 'rejected' ? 'bg-red-500' :
//                         'bg-gray-500'
//                       }`}>
//                       {a.status}
//                     </span>
//                   </td>

//                   <td className="p-3 text-center space-x-2">

//                     <button
//                       disabled={a.status !== 'pending'}
//                       onClick={() => handleStatus(a._id, 'accepted')}
//                       className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 disabled:opacity-50"
//                     >
//                       Accept
//                     </button>

//                     <button
//                       disabled={a.status !== 'pending'}
//                       onClick={() => handleStatus(a._id, 'rejected')}
//                       className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50"
//                     >
//                       Reject
//                     </button>

//                   </td>

//                 </tr>
//               ))}
//             </tbody>

//           </table>
//         </div>

//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import {
  getDoctorAppointments,
  updateAppointmentStatus,
} from "../../services/appointmentService";

export default function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const doctorId = localStorage.getItem("userId"); // ✅ FIX

  useEffect(() => {
    if (doctorId) fetchAppointments();
  }, [doctorId]);

  const fetchAppointments = async () => {
    try {
      console.log("Fetching for doctor:", doctorId); // 🔍 debug

      setLoading(true);
      const res = await getDoctorAppointments(doctorId);

      console.log("API DATA:", res.data); // 🔍 debug

      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await updateAppointmentStatus(id, status);
      fetchAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="p-6 text-gray-600">Loading appointments...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Appointments</h2>

      {appointments.length === 0 ? (
        <p className="text-gray-500">No appointments found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="p-3">Patient</th>
                <th className="p-3">Date</th>
                <th className="p-3">Time</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((a) => (
                <tr key={a._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">
                    {a.patientId?.name || "Unknown"}
                  </td>

                  <td className="p-3">{a.date}</td>
                  <td className="p-3">{a.time}</td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium text-white
                      ${
                        a.status === "pending"
                          ? "bg-yellow-500"
                          : a.status === "accepted"
                          ? "bg-green-500"
                          : a.status === "rejected"
                          ? "bg-red-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>

                  <td className="p-3 text-center space-x-2">
                    <button
                      disabled={a.status !== "pending"}
                      onClick={() =>
                        handleStatus(a._id, "accepted")
                      }
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 disabled:opacity-50"
                    >
                      Accept
                    </button>

                    <button
                      disabled={a.status !== "pending"}
                      onClick={() =>
                        handleStatus(a._id, "rejected")
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50"
                    >
                      Reject
                    </button>
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