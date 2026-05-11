import { useState } from 'react';

import Inventory from '../pharmacist/Inventory';
import VerifyPrescription from '../pharmacist/VerifyPrescription';
import Billing from '../pharmacist/Billing';
import MedicineList from '../pharmacy/MedicineList';
import OrderTracking from '../pharmacy/OrderTracking';

export default function PharmacyDashboard() {
  const [activeTab, setActiveTab] = useState('inventory');

  const menu = [
    { key: 'inventory', label: 'Inventory' },
    { key: 'verify', label: 'Verify Prescription' },
    { key: 'billing', label: 'Billing' },
    { key: 'medicines', label: 'Medicines' },
    { key: 'orders', label: 'Orders' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* 🔥 SIDEBAR */}
      <div className="w-64 bg-white shadow-lg p-6">

        <h2 className="text-xl font-bold text-blue-600 mb-6">
          Pharmacy Panel
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
            Pharmacy Dashboard
          </h1>
          <span className="text-gray-600">
            Manage medicines & orders
          </span>
        </div>

        {/* 🔥 STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

          <StatCard title="Total Medicines" value="120" color="blue" />
          <StatCard title="Orders Today" value="25" color="green" />
          <StatCard title="Pending Orders" value="8" color="purple" />

        </div>

        {/* 🔥 CONTENT WRAPPER */}
        <div className="bg-white p-6 rounded-xl shadow">

          {activeTab === 'inventory' && <Inventory />}
          {activeTab === 'verify' && <VerifyPrescription />}
          {activeTab === 'billing' && <Billing />}
          {activeTab === 'medicines' && <MedicineList />}
          {activeTab === 'orders' && <OrderTracking />}

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
        💊
      </div>
    </div>
  );
}