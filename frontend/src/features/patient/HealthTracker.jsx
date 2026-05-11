// import { useState } from 'react';

// const HealthTracker = ()  => {
//   const [form, setForm] = useState({
//     date: '',
//     bloodPressure: '',
//     sugarLevel: '',
//     weight: ''
//   });

//   const [records, setRecords] = useState([]);

//   const handleAdd = () => {
//     if (!form.date) return;

//     setRecords([form, ...records]);

//     setForm({
//       date: '',
//       bloodPressure: '',
//       sugarLevel: '',
//       weight: ''
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">

//       <h1 className="text-2xl font-bold mb-6">Health Tracker</h1>

//       {/* Form */}
//       <div className="bg-white p-6 rounded-lg shadow mb-6">

//         <h2 className="text-lg font-semibold mb-4">Add Record</h2>

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

//           <input
//             type="date"
//             value={form.date}
//             className="p-2 border rounded"
//             onChange={(e) => setForm({ ...form, date: e.target.value })}
//           />

//           <input
//             placeholder="Blood Pressure (120/80)"
//             value={form.bloodPressure}
//             className="p-2 border rounded"
//             onChange={(e) => setForm({ ...form, bloodPressure: e.target.value })}
//           />

//           <input
//             placeholder="Sugar Level (mg/dL)"
//             value={form.sugarLevel}
//             className="p-2 border rounded"
//             onChange={(e) => setForm({ ...form, sugarLevel: e.target.value })}
//           />

//           <input
//             placeholder="Weight (kg)"
//             value={form.weight}
//             className="p-2 border rounded"
//             onChange={(e) => setForm({ ...form, weight: e.target.value })}
//           />

//         </div>

//         <button
//           onClick={handleAdd}
//           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Add Record
//         </button>

//       </div>

//       {/* Records List */}
//       <div className="bg-white p-6 rounded-lg shadow">

//         <h2 className="text-lg font-semibold mb-4">Health History</h2>

//         {records.length === 0 ? (
//           <p className="text-gray-500">No records yet</p>
//         ) : (
//           <table className="w-full text-left">

//             <thead className="bg-gray-200">
//               <tr>
//                 <th className="p-2">Date</th>
//                 <th className="p-2">BP</th>
//                 <th className="p-2">Sugar</th>
//                 <th className="p-2">Weight</th>
//               </tr>
//             </thead>

//             <tbody>
//               {records.map((r, i) => (
//                 <tr key={i} className="border-b">
//                   <td className="p-2">{r.date}</td>
//                   <td className="p-2">{r.bloodPressure}</td>
//                   <td className="p-2">{r.sugarLevel}</td>
//                   <td className="p-2">{r.weight} kg</td>
//                 </tr>
//               ))}
//             </tbody>

//           </table>
//         )}

//       </div>

//     </div>
//   );
// }

// export default HealthTracker;


import { useState } from "react";

const HealthTracker = () => {
  const [form, setForm] = useState({
    date: "",
    bloodPressure: "",
    sugarLevel: "",
    weight: "",
  });

  const [records, setRecords] = useState([]);

  const handleAdd = () => {
    if (!form.date) return;

    setRecords([form, ...records]);

    setForm({
      date: "",
      bloodPressure: "",
      sugarLevel: "",
      weight: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6">

      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        🏥 Health Tracker
      </h1>

      {/* Form Card */}
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-lg mb-8">

        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          ➕ Add New Record
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <input
            type="date"
            value={form.date}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
          />

          <input
            placeholder="BP (120/80)"
            value={form.bloodPressure}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            onChange={(e) =>
              setForm({ ...form, bloodPressure: e.target.value })
            }
          />

          <input
            placeholder="Sugar (mg/dL)"
            value={form.sugarLevel}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            onChange={(e) =>
              setForm({ ...form, sugarLevel: e.target.value })
            }
          />

          <input
            placeholder="Weight (kg)"
            value={form.weight}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            onChange={(e) =>
              setForm({ ...form, weight: e.target.value })
            }
          />

        </div>

        <button
          onClick={handleAdd}
          className="mt-5 w-full md:w-auto bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition shadow"
        >
          ➕ Add Record
        </button>

      </div>

      {/* Records */}
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-lg">

        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          📊 Health History
        </h2>

        {records.length === 0 ? (
          <p className="text-gray-500 text-center py-6">
            No records yet
          </p>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full text-left border rounded-lg overflow-hidden">

              <thead className="bg-blue-100 text-gray-700">
                <tr>
                  <th className="p-3">Date</th>
                  <th className="p-3">Blood Pressure</th>
                  <th className="p-3">Sugar</th>
                  <th className="p-3">Weight</th>
                </tr>
              </thead>

              <tbody>
                {records.map((r, i) => (
                  <tr
                    key={i}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{r.date}</td>
                    <td className="p-3">{r.bloodPressure}</td>
                    <td className="p-3">{r.sugarLevel} mg/dL</td>
                    <td className="p-3">{r.weight} kg</td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
};

export default HealthTracker;