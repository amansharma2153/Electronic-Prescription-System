import { NavLink } from 'react-router-dom';
import useAuthStore from '../store/authStore';

export default function Sidebar() {
  const { user } = useAuthStore();

  return (
    <div className="w-64 bg-white shadow-lg p-4">

      <h2 className="text-xl font-bold mb-6">Dashboard</h2>

      <nav className="flex flex-col gap-3">

        {user?.role === 'doctor' && (
          <>
            <NavLink to="/doctor-dashboard">Doctor Dashboard</NavLink>
            <NavLink to="/create-prescription">Create Prescription</NavLink>
          </>
        )}

        {user?.role === 'patient' && (
          <>
            <NavLink to="/patient-dashboard">Patient Dashboard</NavLink>
          </>
        )}

        {user?.role === 'pharmacist' && (
          <>
            <NavLink to="/pharmacy-dashboard">Pharmacy Dashboard</NavLink>
          </>
        )}

      </nav>

    </div>
  );
}