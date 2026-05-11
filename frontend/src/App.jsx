// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// import useAuthStore from './store/authStore'   // ✅ FIXED

// import Login from './features/auth/Login'
// import Register from './features/auth/Register'

// import DoctorDashboard from './features/doctor/DoctorDashboard'
// import PatientDashboard from './features/patient/PatientDashboard'
// import CreatePrescription from './features/doctor/CreatePrescription'
// import PharmacyDashboard from './features/pharmacist/PharmacyDashboard'

// import ProtectedLayout from './layouts/ProtectedLayout'

// /* ================= PROTECTED ROUTE ================= */
// function ProtectedRoute({ children, allowedRoles }) {
//   const { token, user } = useAuthStore()

//   if (!token) {
//     return <Navigate to="/login" replace />
//   }

//   if (!user) {
//     return <div className="p-6">Loading...</div>
//   }

//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     return <Navigate to="/" replace />
//   }

//   return children
// }

// function App() {
//   const { token, user } = useAuthStore()

//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* Public */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* Doctor */}
//         <Route
//           path="/doctor-dashboard"
//           element={
//             <ProtectedRoute allowedRoles={['doctor']}>
//               <ProtectedLayout>
//                 <DoctorDashboard />
//               </ProtectedLayout>
//             </ProtectedRoute>
//           }
//         />

//         {/* Patient */}
//         <Route
//           path="/patient-dashboard"
//           element={
//             <ProtectedRoute allowedRoles={['patient']}>
//               <ProtectedLayout>
//                 <PatientDashboard />
//               </ProtectedLayout>
//             </ProtectedRoute>
//           }
//         />

//         {/* Create Prescription */}
//         <Route
//           path="/create-prescription"
//           element={
//             <ProtectedRoute allowedRoles={['doctor']}>
//               <ProtectedLayout>
//                 <CreatePrescription />
//               </ProtectedLayout>
//             </ProtectedRoute>
//           }
//         />

//         {/* Pharmacy */}
//         <Route
//           path="/pharmacy-dashboard"
//           element={
//             <ProtectedRoute allowedRoles={['pharmacist']}>
//               <ProtectedLayout>
//                 <PharmacyDashboard />
//               </ProtectedLayout>
//             </ProtectedRoute>
//           }
//         />

//         {/* Smart Redirect */}
//         <Route
//           path="/"
//           element={
//             token ? (
//               user?.role === 'doctor' ? (
//                 <Navigate to="/doctor-dashboard" replace />
//               ) : user?.role === 'patient' ? (
//                 <Navigate to="/patient-dashboard" replace />
//               ) : user?.role === 'pharmacist' ? (
//                 <Navigate to="/pharmacy-dashboard" replace />
//               ) : (
//                 <Navigate to="/login" replace />
//               )
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         />

//         {/* Fallback */}
//         <Route path="*" element={<Navigate to="/" replace />} />

//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App


import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import useAuthStore from './store/authStore'

import Login from './features/auth/Login'
import Register from './features/auth/Register'

import DoctorDashboard from './features/doctor/DoctorDashboard'
import PatientDashboard from './features/patient/PatientDashboard'
import CreatePrescription from './features/doctor/CreatePrescription'
import PharmacyDashboard from './features/pharmacist/PharmacyDashboard'
import AdminDashboard from './features/admin/AdminDashboard' // 🔥 ADD THIS

import ProtectedLayout from './layouts/ProtectedLayout'

/* ================= PROTECTED ROUTE ================= */
function ProtectedRoute({ children, allowedRoles }) {
  const { token, user } = useAuthStore()

  console.log("TOKEN:", token)
  console.log("USER:", user)

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (!user) {
    return <div className="p-6">Loading...</div>
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return children
}

function App() {
  const { token, user } = useAuthStore()

  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Doctor */}
        <Route
          path="/doctor-dashboard"
          element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <ProtectedLayout>
                <DoctorDashboard />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        {/* Patient */}
        <Route
          path="/patient-dashboard"
          element={
            <ProtectedRoute allowedRoles={['patient']}>
              <ProtectedLayout>
                <PatientDashboard />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        {/* Prescription */}
        <Route
          path="/create-prescription"
          element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <ProtectedLayout>
                <CreatePrescription />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        {/* Pharmacy */}
        <Route
          path="/pharmacy-dashboard"
          element={
            <ProtectedRoute allowedRoles={['pharmacist']}>
              <ProtectedLayout>
                <PharmacyDashboard />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        {/* 🔥 ADMIN ROUTE (THIS WAS MISSING) */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ProtectedLayout>
                <AdminDashboard />
              </ProtectedLayout>
            </ProtectedRoute>
          }
        />

        {/* 🔥 SMART REDIRECT (UPDATED) */}
        <Route
          path="/"
          element={
            token ? (
              user?.role === 'doctor' ? (
                <Navigate to="/doctor-dashboard" replace />
              ) : user?.role === 'patient' ? (
                <Navigate to="/patient-dashboard" replace />
              ) : user?.role === 'pharmacist' ? (
                <Navigate to="/pharmacy-dashboard" replace />
              ) : user?.role === 'admin' ? (
                <Navigate to="/admin-dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App