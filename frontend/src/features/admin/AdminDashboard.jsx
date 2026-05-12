import { useEffect, useState } from 'react';
import { getDashboardStats } from '../../services/adminService';

import Analytics from './Analytics';
import ManageUsers from './ManageUsers';
import Reports from './Reports';

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await getDashboardStats();
      setStats(res.data);
    } catch (err) {
      setStats({
        totalUsers: 10,
        totalDoctors: 3,
        totalPatients: 5,
        totalAppointments: 8,
        totalPrescriptions: 12,
        totalRevenue: 5000
      });
    }
  };

  const cards = [
    { title: "Total Users", value: stats.totalUsers, color: "bg-blue-500" },
    { title: "Doctors", value: stats.totalDoctors, color: "bg-green-500" },
    { title: "Patients", value: stats.totalPatients, color: "bg-purple-500" },
    { title: "Appointments", value: stats.totalAppointments, color: "bg-orange-500" },
    { title: "Prescriptions", value: stats.totalPrescriptions, color: "bg-pink-500" },
    { title: "Revenue", value: `₹${stats.totalRevenue || 0}`, color: "bg-indigo-500" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* 🔥 SIDEBAR */}
      <div className="w-64 bg-white shadow-lg p-6">

        <h2 className="text-xl font-bold text-indigo-600 mb-6">
          Admin Panel
        </h2>

        <div className="space-y-3">
          <button onClick={() => setActiveTab('dashboard')} className="w-full text-left p-2 hover:bg-gray-200 rounded">Dashboard</button>
          <button onClick={() => setActiveTab('analytics')} className="w-full text-left p-2 hover:bg-gray-200 rounded">Analytics</button>
          <button onClick={() => setActiveTab('users')} className="w-full text-left p-2 hover:bg-gray-200 rounded">Manage Users</button>
          <button onClick={() => setActiveTab('reports')} className="w-full text-left p-2 hover:bg-gray-200 rounded">Reports</button>
        </div>

      </div>

      {/* 🔥 MAIN CONTENT */}
      <div className="flex-1 p-6">

        {/* HEADER */}
        <h1 className="text-2xl font-bold mb-6">
          Admin Dashboard
        </h1>

        {/* 🔥 DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow flex justify-between items-center">
                <div>
                  <p className="text-gray-500">{card.title}</p>
                  <h2 className="text-2xl font-bold">{card.value || 0}</h2>
                </div>
                <div className={`p-3 rounded-full ${card.color} text-white`}>
                  📊
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 🔥 ANALYTICS */}
        {activeTab === 'analytics' && <Analytics />}

        {/* 🔥 USERS */}
        {activeTab === 'users' && <ManageUsers />}

        {/* 🔥 REPORTS */}
        {activeTab === 'reports' && <Reports />}

      </div>
    </div>
  );
}
