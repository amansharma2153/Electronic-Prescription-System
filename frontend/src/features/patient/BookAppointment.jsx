// // import { useState } from "react";
// // import { bookAppointment } from "../../services/appointmentService";

// // export default function BookAppointment() {
// //   const [form, setForm] = useState({
// //     doctorId: "",
// //     date: "",
// //     time: "",
// //     reason: "",
// //   });

// //   const [loading, setLoading] = useState(false);
// //   const [message, setMessage] = useState("");

// //   const handleSubmit = async () => {
// //     if (!form.doctorId || !form.date || !form.time) {
// //       setMessage("⚠️ Please fill all required fields");
// //       return;
// //     }

// //     try {
// //       setLoading(true);
// //       setMessage("");

// //       await bookAppointment(form);

// //       setMessage("✅ Appointment Booked Successfully");

// //       setForm({
// //         doctorId: "",
// //         date: "",
// //         time: "",
// //         reason: "",
// //       });
// //     } catch (err) {
// //       setMessage(err.response?.data?.message || "❌ Booking failed");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50 p-4">
// //       <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">

// //         {/* Header */}
// //         <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
// //           📅 Book Appointment
// //         </h2>

// //         {/* Message */}
// //         {message && (
// //           <div className="mb-4 text-center text-sm font-medium text-blue-600 bg-blue-50 p-2 rounded">
// //             {message}
// //           </div>
// //         )}

// //         {/* Doctor ID */}
// //         <div className="mb-4">
// //           <label className="text-sm font-semibold text-gray-600">
// //             Doctor ID
// //           </label>
// //           <input
// //             value={form.doctorId}
// //             placeholder="Enter Doctor ID"
// //             className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
// //             onChange={(e) =>
// //               setForm({ ...form, doctorId: e.target.value })
// //             }
// //           />
// //         </div>

// //         {/* Date & Time */}
// //         <div className="grid grid-cols-2 gap-4 mb-4">
// //           <div>
// //             <label className="text-sm font-semibold text-gray-600">
// //               Date
// //             </label>
// //             <input
// //               type="date"
// //               value={form.date}
// //               className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
// //               onChange={(e) =>
// //                 setForm({ ...form, date: e.target.value })
// //               }
// //             />
// //           </div>

// //           <div>
// //             <label className="text-sm font-semibold text-gray-600">
// //               Time
// //             </label>
// //             <input
// //               type="time"
// //               value={form.time}
// //               className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
// //               onChange={(e) =>
// //                 setForm({ ...form, time: e.target.value })
// //               }
// //             />
// //           </div>
// //         </div>

// //         {/* Reason */}
// //         <div className="mb-5">
// //           <label className="text-sm font-semibold text-gray-600">
// //             Reason for Visit
// //           </label>
// //           <textarea
// //             value={form.reason}
// //             placeholder="Describe your problem..."
// //             rows="3"
// //             className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 resize-none"
// //             onChange={(e) =>
// //               setForm({ ...form, reason: e.target.value })
// //             }
// //           />
// //         </div>

// //         {/* Button */}
// //         <button
// //           onClick={handleSubmit}
// //           disabled={loading}
// //           className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
// //             loading
// //               ? "bg-gray-400 cursor-not-allowed"
// //               : "bg-blue-500 hover:bg-blue-600 shadow-md hover:shadow-lg"
// //           }`}
// //         >
// //           {loading ? "Booking..." : "Book Appointment"}
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }



// import { useEffect, useState } from "react";
// import { bookAppointment,getDoctors } from "../../services/appointmentService";

// export default function BookAppointment() {
//   const [form, setForm] = useState({
//     doctorId: "",
//     date: "",
//     time: "",
//     reason: "",
//   });

//   const [doctors, setDoctors] = useState([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   const fetchDoctors = async () => {
//     try {
//       const res = await getDoctors();
//       setDoctors(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!form.doctorId || !form.date || !form.time) {
//       setMessage("⚠️ Please fill all fields");
//       return;
//     }

//     try {
//       await bookAppointment(form);
//       setMessage("✅ Appointment booked");

//       setForm({
//         doctorId: "",
//         date: "",
//         time: "",
//         reason: "",
//       });
//     } catch {
//       setMessage("❌ Booking failed");
//     }
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto bg-white shadow rounded">

//       <h2 className="text-xl font-bold mb-4">Book Appointment</h2>

//       {/* ✅ DOCTOR DROPDOWN */}
//       <select
//         value={form.doctorId}
//         onChange={(e) =>
//           setForm({ ...form, doctorId: e.target.value })
//         }
//         className="w-full mb-3 p-2 border rounded"
//       >
//         <option value="">Select Doctor</option>

//         {doctors.map((doc) => (
//           <option key={doc._id} value={doc._id}>
//             {doc.name} ({doc.email})
//           </option>
//         ))}
//       </select>

//       <input
//         type="date"
//         value={form.date}
//         className="w-full mb-3 p-2 border rounded"
//         onChange={(e) =>
//           setForm({ ...form, date: e.target.value })
//         }
//       />

//       <input
//         type="time"
//         value={form.time}
//         className="w-full mb-3 p-2 border rounded"
//         onChange={(e) =>
//           setForm({ ...form, time: e.target.value })
//         }
//       />

//       <textarea
//         placeholder="Reason"
//         value={form.reason}
//         className="w-full mb-3 p-2 border rounded"
//         onChange={(e) =>
//           setForm({ ...form, reason: e.target.value })
//         }
//       />

//       <button
//         onClick={handleSubmit}
//         className="w-full bg-blue-500 text-white p-2 rounded"
//       >
//         Book Appointment
//       </button>

//       {message && <p className="mt-2 text-center">{message}</p>}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { bookAppointment, getDoctors } from "../../services/appointmentService";

export default function BookAppointment() {
  const [form, setForm] = useState({
    doctorId: "",
    date: "",
    time: "",
    reason: "",
  });

  const [doctors, setDoctors] = useState([]);
  const [message, setMessage] = useState("");
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [booking, setBooking] = useState(false);

  /* ===================== FETCH DOCTORS ===================== */
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await getDoctors();

      console.log("API RESPONSE:", res.data);

      // ✅ FIX: access correct array
      setDoctors(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (err) {
      console.error("Doctor fetch error:", err);
      setDoctors([]); // fallback safety
    } finally {
      setLoadingDoctors(false);
    }
  };

  /* ===================== HANDLE SUBMIT ===================== */
  const handleSubmit = async () => {
    if (!form.doctorId || !form.date || !form.time) {
      setMessage("⚠️ Please fill all fields");
      return;
    }

    try {
      setBooking(true);
      setMessage("");

      await bookAppointment(form);

      setMessage("✅ Appointment booked successfully");

      // reset form
      setForm({
        doctorId: "",
        date: "",
        time: "",
        reason: "",
      });

    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "❌ Booking failed");
    } finally {
      setBooking(false);
    }
  };

  /* ===================== UI ===================== */
  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-xl">
      <h2 className="text-xl font-bold mb-4 text-center">
        📅 Book Appointment
      </h2>

      {/* MESSAGE */}
      {message && (
        <div className="mb-3 text-center text-sm text-blue-600 bg-blue-50 p-2 rounded">
          {message}
        </div>
      )}

      {/* DOCTOR DROPDOWN */}
      <select
        value={form.doctorId}
        onChange={(e) =>
          setForm({ ...form, doctorId: e.target.value })
        }
        className="w-full mb-3 p-2 border rounded"
      >
        <option value="">
          {loadingDoctors ? "Loading doctors..." : "Select Doctor"}
        </option>

        {/* ✅ SAFE MAP */}
        {Array.isArray(doctors) &&
          doctors.map((doc) => (
            <option key={doc._id} value={doc._id}>
              {doc.name} ({doc.email})
            </option>
          ))}
      </select>

      {/* DATE */}
      <input
        type="date"
        value={form.date}
        className="w-full mb-3 p-2 border rounded"
        onChange={(e) =>
          setForm({ ...form, date: e.target.value })
        }
      />

      {/* TIME */}
      <input
        type="time"
        value={form.time}
        className="w-full mb-3 p-2 border rounded"
        onChange={(e) =>
          setForm({ ...form, time: e.target.value })
        }
      />

      {/* REASON */}
      <textarea
        placeholder="Reason for visit"
        value={form.reason}
        className="w-full mb-3 p-2 border rounded"
        onChange={(e) =>
          setForm({ ...form, reason: e.target.value })
        }
      />

      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        disabled={booking}
        className={`w-full p-2 rounded text-white transition ${
          booking
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {booking ? "Booking..." : "Book Appointment"}
      </button>
    </div>
  );
}