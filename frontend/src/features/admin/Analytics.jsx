// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
//   PieChart, Pie, Cell, Legend
// } from 'recharts';

// export default function Analytics() {

//   // 🔥 Dummy data (replace with API later)
//   const userData = [
//     { name: "Doctors", value: 20 },
//     { name: "Patients", value: 50 },
//     { name: "Pharmacists", value: 10 },
//   ];

//   const appointmentData = [
//     { day: "Mon", appointments: 10 },
//     { day: "Tue", appointments: 15 },
//     { day: "Wed", appointments: 8 },
//     { day: "Thu", appointments: 20 },
//     { day: "Fri", appointments: 12 },
//   ];

//   const COLORS = ['#3b82f6', '#22c55e', '#a855f7'];

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">

//       <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//         {/* Bar Chart */}
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h2 className="text-lg font-semibold mb-4">Appointments Overview</h2>

//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={appointmentData}>
//               <XAxis dataKey="day" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="appointments" fill="#3b82f6" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Pie Chart */}
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h2 className="text-lg font-semibold mb-4">User Distribution</h2>

//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={userData}
//                 dataKey="value"
//                 nameKey="name"
//                 outerRadius={100}
//               >
//                 {userData.map((entry, index) => (
//                   <Cell key={index} fill={COLORS[index]} />
//                 ))}
//               </Pie>
//               <Legend />
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//       </div>

//     </div>
//   );
// }


import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

export default function Analytics() {

  const userData = [
    { name: "Doctors", value: 20 },
    { name: "Patients", value: 50 },
    { name: "Pharmacists", value: 10 },
  ];

  const appointmentData = [
    { day: "Mon", appointments: 10 },
    { day: "Tue", appointments: 15 },
    { day: "Wed", appointments: 8 },
    { day: "Thu", appointments: 20 },
    { day: "Fri", appointments: 12 },
  ];

  const COLORS = ['#3b82f6', '#22c55e', '#a855f7'];

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          📊 Analytics Dashboard
        </h1>
        <p className="text-gray-500 text-sm">
          Overview of system performance and usage
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Users</p>
          <h2 className="text-xl font-bold">80</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Appointments</p>
          <h2 className="text-xl font-bold">65</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Active Doctors</p>
          <h2 className="text-xl font-bold">20</h2>
        </div>

      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* BAR CHART */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold mb-4">
            📅 Weekly Appointments
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={appointmentData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="appointments" fill="#3b82f6" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold mb-4">
            👥 User Distribution
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {userData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
}