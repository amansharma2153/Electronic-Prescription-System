// import { useEffect, useState } from "react";
// import axios from "../../services/axiosInstance";
// import useAuthStore from "../../store/authStore";

// import CreatePrescription from "./CreatePrescription";
// import PatientDetails from "./PatientDetails";
// import LabRequest from "./LabRequest";

// export default function DoctorDashboard() {
//   const { user } = useAuthStore();

//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("appointments");

//   // ✅ Now stores ID only
//   const [selectedPatient, setSelectedPatient] = useState(null);

//   useEffect(() => {
//     if (!user?._id) return;

//     fetchAppointments();

//     const interval = setInterval(() => {
//       fetchAppointments();
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [user]);

//   const fetchAppointments = async () => {
//     try {
//       const res = await axios.get(`/appointments/doctor/${user._id}`);
//       setAppointments(Array.isArray(res.data) ? res.data : []);
//     } catch (err) {
//       console.error("APPOINTMENT ERROR:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateStatus = async (id, status) => {
//     await axios.put(`/appointments/${id}`, { status });
//     fetchAppointments();
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
      
//       {/* SIDEBAR */}
//       <div className="w-64 bg-white shadow-lg p-6">
//         <h2 className="text-xl font-bold mb-6 text-blue-600">
//           Doctor Panel
//         </h2>

//         <nav className="space-y-3">
//           {[
//             { key: "appointments", label: "Appointments" },
//             { key: "prescription", label: "Prescription" },
//             { key: "patient", label: "Patients" },
//             { key: "lab", label: "Lab Requests" },
//           ].map((item) => (
//             <button
//               key={item.key}
//               onClick={() => setActiveTab(item.key)}
//               className={`w-full text-left px-4 py-2 rounded ${
//                 activeTab === item.key
//                   ? "bg-blue-500 text-white"
//                   : "hover:bg-gray-200"
//               }`}
//             >
//               {item.label}
//             </button>
//           ))}
//         </nav>
//       </div>

//       {/* MAIN */}
//       <div className="flex-1 p-6">

//         {/* HEADER */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold">Dashboard</h1>
//           <span className="text-gray-600">Dr. {user?.name}</span>
//         </div>

//         {/* STATS */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//           <StatCard
//             title="Appointments"
//             value={appointments.length}
//             color="blue"
//           />

//           <StatCard
//             title="Patients"
//             value={
//               new Set(
//                 appointments.map((a) => a.patientId?._id)
//               ).size
//             }
//             color="green"
//           />

//           <StatCard
//             title="Prescriptions"
//             value="--"
//             color="purple"
//           />
//         </div>

//         {/* ================= APPOINTMENTS ================= */}
//         {activeTab === "appointments" && (
//           <div className="bg-white p-6 rounded-xl shadow">
//             <h2 className="text-lg font-semibold mb-4">
//               Appointments
//             </h2>

//             {loading ? (
//               <p>Loading...</p>
//             ) : appointments.length === 0 ? (
//               <p>No appointments</p>
//             ) : (
//               <table className="w-full text-left">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th className="p-3">Patient</th>
//                     <th className="p-3">Date</th>
//                     <th className="p-3">Time</th>
//                     <th className="p-3">Status</th>
//                     <th className="p-3">Action</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {appointments.map((a) => (
//                     <tr key={a._id} className="border-b">
                      
//                       {/* ✅ POPULATED DATA */}
//                       <td className="p-3">
//                         {a.patientId?.name || "Patient"}
//                       </td>

//                       <td className="p-3">{a.date}</td>
//                       <td className="p-3">{a.time}</td>

//                       <td className="p-3">
//                         <span
//                           className={`px-3 py-1 text-xs rounded-full text-white ${
//                             a.status === "pending"
//                               ? "bg-yellow-500"
//                               : a.status === "accepted"
//                               ? "bg-blue-500"
//                               : a.status === "completed"
//                               ? "bg-green-500"
//                               : "bg-gray-500"
//                           }`}
//                         >
//                           {a.status}
//                         </span>
//                       </td>

//                       <td className="p-3 space-x-2">
//                         <button
//                           onClick={() =>
//                             updateStatus(a._id, "accepted")
//                           }
//                           className="bg-blue-500 text-white px-3 py-1 rounded"
//                         >
//                           Accept
//                         </button>

//                         <button
//                           onClick={() =>
//                             updateStatus(a._id, "completed")
//                           }
//                           className="bg-green-500 text-white px-3 py-1 rounded"
//                         >
//                           Complete
//                         </button>

//                         {/* ✅ FINAL FIX */}
//                         <button
//                           onClick={() => {
//                             console.log("SELECTED:", a.patientId);
//                             setSelectedPatient(a.patientId?._id);
//                             setActiveTab("patient");
//                           }}
//                           className="bg-purple-500 text-white px-3 py-1 rounded"
//                         >
//                           View Patient
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         )}

//         {/* ================= PRESCRIPTION ================= */}
//         {activeTab === "prescription" && (
//           <CardWrapper>
//             <CreatePrescription patientId={selectedPatient} />
//           </CardWrapper>
//         )}

//         {/* ================= PATIENT ================= */}
//         {activeTab === "patient" && (
//           <CardWrapper>
//             {selectedPatient ? (
//               <PatientDetails patientId={selectedPatient} />
//             ) : (
//               <p className="text-gray-500">
//                 Select a patient from appointments
//               </p>
//             )}
//           </CardWrapper>
//         )}

//         {/* ================= LAB ================= */}
//         {activeTab === "lab" && (
//           <CardWrapper>
//             <LabRequest patientId={selectedPatient} />
//           </CardWrapper>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ================= COMPONENTS ================= */

// function StatCard({ title, value, color }) {
//   const colors = {
//     blue: "bg-blue-100 text-blue-600",
//     green: "bg-green-100 text-green-600",
//     purple: "bg-purple-100 text-purple-600",
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow flex justify-between items-center">
//       <div>
//         <p className="text-gray-500">{title}</p>
//         <h2 className="text-2xl font-bold">{value}</h2>
//       </div>
//       <div className={`p-3 rounded-full ${colors[color]}`}>📊</div>
//     </div>
//   );
// }

// function CardWrapper({ children }) {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow">
//       {children}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "../../services/axiosInstance";
import useAuthStore from "../../store/authStore";

import CreatePrescription from "./CreatePrescription";
import PatientDetails from "./PatientDetails";
import LabRequest from "./LabRequest";

export default function DoctorDashboard() {
  const { user } = useAuthStore();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("appointments");

  // ✅ selected patient ID
  const [selectedPatient, setSelectedPatient] = useState("");

  useEffect(() => {
    if (!user?._id) return;

    fetchAppointments();

    const interval = setInterval(fetchAppointments, 5000);
    return () => clearInterval(interval);
  }, [user]);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(`/appointments/doctor/${user._id}`);
      setAppointments(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("APPOINTMENT ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    await axios.put(`/appointments/${id}`, { status });
    fetchAppointments();
  };

  // ✅ SAFE unique patients
  const uniquePatients = [
    ...new Map(
      appointments
        .filter((a) => a?.patientId?._id)
        .map((a) => [a.patientId._id, a.patientId])
    ).values(),
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-xl font-bold mb-6 text-blue-600">
          Doctor Panel
        </h2>

        <nav className="space-y-3">
          {[
            { key: "appointments", label: "Appointments" },
            { key: "prescription", label: "Prescription" },
            { key: "patient", label: "Patients" },
            { key: "lab", label: "Lab Requests" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`w-full text-left px-4 py-2 rounded ${
                activeTab === item.key
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <span className="text-gray-600">Dr. {user?.name}</span>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatCard title="Appointments" value={appointments.length} color="blue" />

          <StatCard
            title="Patients"
            value={
              new Set(
                appointments.map((a) => a?.patientId?._id)
              ).size
            }
            color="green"
          />

          <StatCard title="Prescriptions" value="--" color="purple" />
        </div>

        {/* ================= APPOINTMENTS ================= */}
        {activeTab === "appointments" && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">Appointments</h2>

            {loading ? (
              <p>Loading...</p>
            ) : appointments.length === 0 ? (
              <p>No appointments</p>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3">Patient</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Time</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {appointments.map((a) => (
                    <tr key={a._id} className="border-b">
                      <td className="p-3">
                        {a.patientId?.name || "Patient"}
                      </td>

                      <td className="p-3">{a.date}</td>
                      <td className="p-3">{a.time}</td>

                      <td className="p-3">
                        <span
                          className={`px-3 py-1 text-xs rounded-full text-white ${
                            a.status === "pending"
                              ? "bg-yellow-500"
                              : a.status === "accepted"
                              ? "bg-blue-500"
                              : a.status === "completed"
                              ? "bg-green-500"
                              : "bg-gray-500"
                          }`}
                        >
                          {a.status}
                        </span>
                      </td>

                      <td className="p-3 space-x-2">
                        <button
                          onClick={() => updateStatus(a._id, "accepted")}
                          className="bg-blue-500 text-white px-3 py-1 rounded"
                        >
                          Accept
                        </button>

                        <button
                          onClick={() => updateStatus(a._id, "completed")}
                          className="bg-green-500 text-white px-3 py-1 rounded"
                        >
                          Complete
                        </button>

                        <button
                          onClick={() => {
                            setSelectedPatient(a?.patientId?._id || "");
                            setActiveTab("patient");
                          }}
                          className="bg-purple-500 text-white px-3 py-1 rounded"
                        >
                          View Patient
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ================= PRESCRIPTION ================= */}
        {activeTab === "prescription" && (
          <CardWrapper>
            <CreatePrescription patientId={selectedPatient} />
          </CardWrapper>
        )}

        {/* ================= PATIENT ================= */}
        {activeTab === "patient" && (
          <CardWrapper>
            {selectedPatient ? (
              <PatientDetails patientId={selectedPatient} />
            ) : (
              <p className="text-gray-500">
                Select a patient from appointments
              </p>
            )}
          </CardWrapper>
        )}

        {/* ================= LAB ================= */}
        {activeTab === "lab" && (
          <CardWrapper>

            {/* ✅ ONLY HERE DROPDOWN */}
            <select
              className="mb-4 p-2 border rounded w-full"
              value={selectedPatient || ""}
              onChange={(e) => setSelectedPatient(e.target.value)}
            >
              <option value="">Select Patient</option>

              {uniquePatients.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name || "Unnamed"}
                </option>
              ))}
            </select>

            <LabRequest patientId={selectedPatient} />

          </CardWrapper>
        )}

      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ title, value, color }) {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow flex justify-between items-center">
      <div>
        <p className="text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
      </div>
      <div className={`p-3 rounded-full ${colors[color]}`}>📊</div>
    </div>
  );
}

function CardWrapper({ children }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      {children}
    </div>
  );
}