import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from '../features/auth/Login';
import Register from '../features/auth/Register';
import PatientDashboard from '../features/patient/PatientDashboard';
import DoctorDashboard from '../features/doctor/DoctorDashboard';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}