// import { useEffect, useState } from 'react';
// import { getUsers, deleteUser } from '../../services/adminService';

// export default function ManageUsers() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const res = await getUsers();
//       setUsers(res.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this user?");
//     if (!confirmDelete) return;

//     try {
//       await deleteUser(id);
//       fetchUsers();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (loading) {
//     return <div className="p-6 text-gray-600">Loading users...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">

//       {/* Header */}
//       <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

//       {/* Table */}
//       <div className="bg-white shadow-md rounded-lg overflow-hidden">
//         <table className="w-full text-left">

//           <thead className="bg-gray-200 text-gray-700">
//             <tr>
//               <th className="p-4">Name</th>
//               <th className="p-4">Email</th>
//               <th className="p-4">Role</th>
//               <th className="p-4 text-center">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {users.length === 0 ? (
//               <tr>
//                 <td colSpan="4" className="text-center p-6 text-gray-500">
//                   No users found
//                 </td>
//               </tr>
//             ) : (
//               users.map((u) => (
//                 <tr
//                   key={u._id}
//                   className="border-b hover:bg-gray-50 transition"
//                 >
//                   <td className="p-4 font-medium">{u.name}</td>
//                   <td className="p-4 text-gray-600">{u.email}</td>
//                   <td className="p-4">
//                     <span className={`px-3 py-1 rounded-full text-sm font-medium
//                       ${u.role === 'doctor' ? 'bg-blue-100 text-blue-600' :
//                         u.role === 'patient' ? 'bg-green-100 text-green-600' :
//                         u.role === 'pharmacist' ? 'bg-purple-100 text-purple-600' :
//                         'bg-gray-100 text-gray-600'
//                       }`}>
//                       {u.role}
//                     </span>
//                   </td>

//                   <td className="p-4 text-center">
//                     <button
//                       onClick={() => handleDelete(u._id)}
//                       className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>

//         </table>
//       </div>

//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../../services/adminService';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this user?");
    if (!confirmDelete) return;

    try {
      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="p-6 text-gray-600">Loading users...</div>;
  }

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          👥 Manage Users
        </h1>

        {/* SEARCH */}
        <input
          placeholder="Search users..."
          className="border px-4 py-2 rounded-lg w-full md:w-64 focus:ring-2 focus:ring-blue-400 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

        <StatCard title="Total" value={users.length} color="blue" />
        <StatCard title="Doctors" value={users.filter(u => u.role === 'doctor').length} color="green" />
        <StatCard title="Patients" value={users.filter(u => u.role === 'patient').length} color="purple" />
        <StatCard title="Pharmacists" value={users.filter(u => u.role === 'pharmacist').length} color="orange" />

      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-xl overflow-hidden">

        <table className="w-full text-left">

          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map((u) => (
                <tr
                  key={u._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium">{u.name}</td>
                  <td className="p-4 text-gray-600">{u.email}</td>

                  <td className="p-4">
                    <RoleBadge role={u.role} />
                  </td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>

      </div>
    </div>
  );
}

/* 🔥 COMPONENTS */

function RoleBadge({ role }) {
  const styles = {
    doctor: "bg-blue-100 text-blue-600",
    patient: "bg-green-100 text-green-600",
    pharmacist: "bg-purple-100 text-purple-600",
    admin: "bg-gray-200 text-gray-700"
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[role]}`}>
      {role}
    </span>
  );
}

function StatCard({ title, value, color }) {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-lg font-bold">{value}</h2>
      </div>
      <div className={`p-2 rounded-full ${colors[color]}`}>👤</div>
    </div>
  );
}