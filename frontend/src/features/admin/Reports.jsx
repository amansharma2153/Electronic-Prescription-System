// import { useState } from 'react';

// export default function Reports() {

//   const [reportType, setReportType] = useState("users");

//   const data = {
//     users: [
//       { name: "Aman", role: "Doctor" },
//       { name: "Rahul", role: "Patient" }
//     ],
//     appointments: [
//       { id: 1, date: "2026-04-20", status: "Completed" },
//       { id: 2, date: "2026-04-21", status: "Pending" }
//     ]
//   };

//   const exportCSV = () => {
//     const rows = data[reportType];

//     const csvContent =
//       "data:text/csv;charset=utf-8," +
//       rows.map(e => Object.values(e).join(",")).join("\n");

//     const link = document.createElement("a");
//     link.href = encodeURI(csvContent);
//     link.download = `${reportType}_report.csv`;
//     link.click();
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">

//       <h1 className="text-2xl font-bold mb-6">Reports</h1>

//       {/* Filter */}
//       <div className="mb-4 flex gap-4">
//         <select
//           value={reportType}
//           onChange={(e) => setReportType(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="users">Users</option>
//           <option value="appointments">Appointments</option>
//         </select>

//         <button
//           onClick={exportCSV}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Export CSV
//         </button>
//       </div>

//       {/* Table */}
//       <div className="bg-white shadow rounded-lg p-4">
//         <table className="w-full">

//           <thead className="bg-gray-200">
//             <tr>
//               {Object.keys(data[reportType][0]).map((key) => (
//                 <th key={key} className="p-2 text-left capitalize">
//                   {key}
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           <tbody>
//             {data[reportType].map((row, i) => (
//               <tr key={i} className="border-b">
//                 {Object.values(row).map((val, j) => (
//                   <td key={j} className="p-2">{val}</td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>

//         </table>
//       </div>

//     </div>
//   );
// }


import { useState } from 'react';

export default function Reports() {

  const [reportType, setReportType] = useState("users");

  const data = {
    users: [
      { name: "Aman", role: "Doctor" },
      { name: "Rahul", role: "Patient" }
    ],
    appointments: [
      { id: 1, date: "2026-04-20", status: "Completed" },
      { id: 2, date: "2026-04-21", status: "Pending" }
    ]
  };

  const exportCSV = () => {
    const rows = data[reportType];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      rows.map(e => Object.values(e).join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `${reportType}_report.csv`;
    link.click();
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">Reports</h1>

      <div className="mb-4 flex gap-4">
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="users">Users</option>
          <option value="appointments">Appointments</option>
        </select>

        <button
          onClick={exportCSV}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Export CSV
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <table className="w-full">

          <thead className="bg-gray-200">
            <tr>
              {Object.keys(data[reportType][0]).map((key) => (
                <th key={key} className="p-2 text-left capitalize">
                  {key}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data[reportType].map((row, i) => (
              <tr key={i} className="border-b">
                {Object.values(row).map((val, j) => (
                  <td key={j} className="p-2">{val}</td>
                ))}
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}