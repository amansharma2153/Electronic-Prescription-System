// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { login } from "../../services/authService";
// import useAuthStore from "../../store/authStore";

// export default function Login() {
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();
//   const { setUser, setToken } = useAuthStore();

//   const handleLogin = async () => {
//     // ✅ validation
//     if (!form.email || !form.password) {
//       setError("Please enter email and password");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");

//       console.log("LOGIN FORM:", form); // 🔍 debug

//       const res = await login(form);
//       const data = res?.data || res;

//       console.log("LOGIN RESPONSE:", data); // 🔍 debug

//       // ✅ validate response
//       if (!data?.token || !data?.user) {
//         throw new Error("Invalid login response from server");
//       }

//       // ✅ save auth
//       setToken(data.token);
//       setUser(data.user);

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("userId", data.user._id);

//       const role = data.user.role;

//       // ✅ role-based navigation
//       if (role === "doctor") navigate("/doctor-dashboard");
//       else if (role === "patient") navigate("/patient-dashboard");
//       else if (role === "pharmacist") navigate("/pharmacy-dashboard");
//       else if (role === "admin") navigate("/admin-dashboard");
//       else navigate("/");

//     } catch (err) {
//       console.log("LOGIN ERROR FULL:", err);
//       console.log("LOGIN ERROR DATA:", err.response?.data);

//       setError(
//         err.response?.data?.message ||
//         err.message ||
//         "Login failed"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">

//       <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

//         <h2 className="text-2xl font-bold mb-6 text-center">
//           Login
//         </h2>

//         {/* Error */}
//         {error && (
//           <p className="text-red-500 text-sm mb-4 text-center">
//             {error}
//           </p>
//         )}

//         {/* Email */}
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//           value={form.email}
//           onChange={(e) =>
//             setForm({ ...form, email: e.target.value })
//           }
//         />

//         {/* Password */}
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//           value={form.password}
//           onChange={(e) =>
//             setForm({ ...form, password: e.target.value })
//           }
//         />

//         {/* Button */}
//         <button
//           onClick={handleLogin}
//           disabled={loading}
//           className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         {/* Register */}
//         <p className="text-center mt-4 text-sm text-gray-600">
//           Don’t have an account?{" "}
//           <span
//             onClick={() => navigate("/register")}
//             className="text-blue-500 cursor-pointer hover:underline"
//           >
//             Register here
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  HeartPulse,
  Eye,
  EyeOff,
} from "lucide-react";

import { login } from "../../services/authService";
import useAuthStore from "../../store/authStore";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { setUser, setToken } = useAuthStore();

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await login(form);
      const data = res?.data || res;

      if (!data?.token || !data?.user) {
        throw new Error("Invalid login response from server");
      }

      setToken(data.token);
      setUser(data.user);

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user._id);

      const role = data.user.role;

      if (role === "doctor") navigate("/doctor-dashboard");
      else if (role === "patient") navigate("/patient-dashboard");
      else if (role === "pharmacist")
        navigate("/pharmacy-dashboard");
      else if (role === "admin")
        navigate("/admin-dashboard");
      else navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-cyan-100 px-4">
      
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white shadow-2xl rounded-3xl overflow-hidden">
        
        {/* LEFT SIDE */}
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-blue-600 to-cyan-500 text-white p-12 relative">
          
          <div className="absolute top-6 left-6 flex items-center gap-2">
            <HeartPulse size={30} />
            <h1 className="text-2xl font-bold">
              Electronic Prescription System
            </h1>
          </div>

          <div className="mt-12">
            <h2 className="text-4xl font-bold leading-tight mb-6">
              Smart Healthcare <br />
              Prescription System
            </h2>

            <p className="text-lg text-blue-100 leading-relaxed">
              Securely manage prescriptions, appointments,
              pharmacy billing, and AI-powered healthcare
              workflows — all in one platform.
            </p>

            <div className="mt-10 space-y-4">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl">
                ✔ AI Prescription Validation
              </div>

              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl">
                ✔ Appointment Management
              </div>

              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl">
                ✔ Secure Patient Records
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          
          <div className="text-center mb-8">
            <div className="md:hidden flex justify-center mb-4">
              <div className="bg-blue-500 p-3 rounded-2xl text-white">
                <HeartPulse size={28} />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-800">
              Welcome Back
            </h2>

            <p className="text-gray-500 mt-2">
              Login to continue to your dashboard
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-600 text-sm p-3 rounded-xl mb-5 text-center">
              {error}
            </div>
          )}

          {/* EMAIL */}
          <div className="relative mb-5">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />

            <input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
          </div>

          {/* PASSWORD */}
          <div className="relative mb-3">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          {/* FORGOT PASSWORD */}
          <div className="text-right mb-6">
            <button className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </button>
          </div>

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-[1.02] hover:shadow-xl transition duration-300 disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* DIVIDER */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-4 text-sm text-gray-400">
              OR
            </span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* REGISTER */}
          <p className="text-center text-gray-600">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-500 font-semibold cursor-pointer hover:underline"
            >
              Create Account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}