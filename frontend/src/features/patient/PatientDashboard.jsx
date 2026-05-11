import { useState } from 'react';
import PrescriptionList from './PrescriptionList';
import BookAppointment from './BookAppointment';
import HealthTracker from './HealthTracker';
import OrderMedicine from './OrderMedicine';

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState('prescriptions');

  const menu = [
    { key: 'prescriptions', label: 'Prescriptions' },
    { key: 'appointments', label: 'Appointments' },
    { key: 'health', label: 'Health Tracker' },
    { key: 'pharmacy', label: 'Order Medicine' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* 🔥 SIDEBAR */}
      <div className="w-64 bg-white shadow-lg p-6">

        <h2 className="text-xl font-bold text-blue-600 mb-6">
          Patient Panel
        </h2>

        <div className="space-y-3">
          {menu.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`w-full text-left px-4 py-2 rounded transition
                ${
                  activeTab === item.key
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-200'
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>

      </div>

      {/* 🔥 MAIN CONTENT */}
      <div className="flex-1 p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            Patient Dashboard
          </h1>
          <span className="text-gray-600">
            Manage your health & prescriptions
          </span>
        </div>

        {/* 🔥 STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

          <StatCard title="Prescriptions" value="12" color="blue" />
          <StatCard title="Appointments" value="3" color="green" />
          <StatCard title="Reports" value="5" color="purple" />

        </div>

        {/* 🔥 CONTENT */}
        <div className="bg-white p-6 rounded-xl shadow">

          {activeTab === 'prescriptions' && <PrescriptionList />}
          {activeTab === 'appointments' && <BookAppointment />}
          {activeTab === 'health' && <HealthTracker />}
          {activeTab === 'pharmacy' && <OrderMedicine />}

        </div>

      </div>
    </div>
  );
}

/* ================= UI COMPONENT ================= */

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

      <div className={`p-3 rounded-full ${colors[color]}`}>
        🏥
      </div>
    </div>
  );
}