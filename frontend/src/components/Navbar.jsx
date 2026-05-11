import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  // 🔥 Dynamic Title
  const getTitle = () => {
    switch (user?.role) {
      case 'doctor':
        return 'Doctor Dashboard';
      case 'patient':
        return 'Patient Dashboard';
      case 'pharmacist':
        return 'Pharmacy Dashboard';
      case 'admin':
        return 'Admin Dashboard';
      default:
        return 'AI Prescription System';
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-white shadow px-6 py-3 flex justify-between items-center">

      {/* 🔥 LEFT: Dynamic Title */}
      <h1
        onClick={() => navigate('/')}
        className="font-bold text-lg cursor-pointer text-gray-800"
      >
        {getTitle()}
      </h1>

      {/* 🔥 RIGHT: USER INFO */}
      <div className="flex items-center gap-4">

        <span className="text-sm text-gray-600">
          {user?.name} ({user?.role})
        </span>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
}