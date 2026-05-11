import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/authService';

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'patient',
    license: '',
    specialization: '',
    pharmacyName: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const validate = () => {
    if (!form.name || !form.email || !form.password) {
      return "All fields are required";
    }

    if (form.password.length < 6) {
      return "Password must be at least 6 characters";
    }

    if (form.role === 'doctor' && (!form.license || !form.specialization)) {
      return "Doctor details required";
    }

    if (form.role === 'pharmacist' && (!form.license || !form.pharmacyName)) {
      return "Pharmacist details required";
    }

    return null;
  };

  const handleRegister = async () => {
    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      await register(form);

      setSuccess("Registration successful! Redirecting...");

      setTimeout(() => navigate('/login'), 1500);

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* 🔥 LEFT PANEL */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-green-500 to-blue-600 text-white flex-col justify-center items-center p-10">

        <h1 className="text-4xl font-bold mb-4">
          Join Electronic Prescription System
        </h1>

        <p className="text-lg text-center max-w-md">
          Create your account to access smart healthcare tools,
          manage prescriptions, and streamline your workflow.
        </p>

      </div>

      {/* 🔥 RIGHT PANEL */}
      <div className="flex-1 flex items-center justify-center bg-gray-100">

        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

          <h2 className="text-2xl font-bold mb-6 text-center">
            Create Account
          </h2>

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm mb-3 text-center">
              {error}
            </p>
          )}

          {/* SUCCESS */}
          {success && (
            <p className="text-green-600 text-sm mb-3 text-center">
              {success}
            </p>
          )}

          {/* NAME */}
          <input
            placeholder="Full Name"
            className="w-full mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            onChange={(e) => handleChange('name', e.target.value)}
          />

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            onChange={(e) => handleChange('email', e.target.value)}
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-3 p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            onChange={(e) => handleChange('password', e.target.value)}
          />

          {/* ROLE */}
          <select
            className="w-full mb-3 p-3 border rounded-lg"
            onChange={(e) => handleChange('role', e.target.value)}
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="pharmacist">Pharmacist</option>
          </select>

          {/* DOCTOR FIELDS */}
          {form.role === 'doctor' && (
            <>
              <input
                placeholder="Medical License"
                className="w-full mb-3 p-3 border rounded-lg"
                onChange={(e) => handleChange('license', e.target.value)}
              />
              <input
                placeholder="Specialization"
                className="w-full mb-3 p-3 border rounded-lg"
                onChange={(e) => handleChange('specialization', e.target.value)}
              />
            </>
          )}

          {/* PHARMACIST FIELDS */}
          {form.role === 'pharmacist' && (
            <>
              <input
                placeholder="Pharmacy License"
                className="w-full mb-3 p-3 border rounded-lg"
                onChange={(e) => handleChange('license', e.target.value)}
              />
              <input
                placeholder="Pharmacy Name"
                className="w-full mb-3 p-3 border rounded-lg"
                onChange={(e) => handleChange('pharmacyName', e.target.value)}
              />
            </>
          )}

          {/* BUTTON */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition font-semibold"
          >
            {loading ? "Creating..." : "Register"}
          </button>

          {/* LOGIN LINK */}
          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <span
              onClick={() => navigate('/login')}
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>

        </div>

      </div>
    </div>
  );
}