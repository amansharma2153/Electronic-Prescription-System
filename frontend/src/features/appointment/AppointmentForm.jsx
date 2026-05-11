import { useState } from 'react';
import { bookAppointment } from '../../services/appointmentService';

export default function AppointmentForm({ doctorId }) {
  const [form, setForm] = useState({
    doctorId: doctorId || '',
    date: '',
    time: '',
    reason: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!form.doctorId || !form.date || !form.time) {
      setMessage("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      setMessage('');

      await bookAppointment(form);

      setMessage("Appointment booked successfully");

      // Reset (except doctorId if passed)
      setForm({
        doctorId: doctorId || '',
        date: '',
        time: '',
        reason: ''
      });

    } catch (err) {
      setMessage(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-md">

      <h2 className="text-xl font-bold mb-4">Book Appointment</h2>

      {/* Message */}
      {message && (
        <p className="mb-3 text-sm text-center text-blue-600">{message}</p>
      )}

      {/* Doctor ID (only if not provided) */}
      {!doctorId && (
        <input
          value={form.doctorId}
          placeholder="Doctor ID"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) =>
            setForm({ ...form, doctorId: e.target.value })
          }
        />
      )}

      {/* Date */}
      <input
        type="date"
        value={form.date}
        min={new Date().toISOString().split("T")[0]}
        className="w-full mb-3 p-2 border rounded"
        onChange={(e) =>
          setForm({ ...form, date: e.target.value })
        }
      />

      {/* Time */}
      <input
        type="time"
        value={form.time}
        className="w-full mb-3 p-2 border rounded"
        onChange={(e) =>
          setForm({ ...form, time: e.target.value })
        }
      />

      {/* Reason */}
      <textarea
        value={form.reason}
        placeholder="Reason for visit"
        className="w-full mb-4 p-2 border rounded"
        onChange={(e) =>
          setForm({ ...form, reason: e.target.value })
        }
      />

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
      >
        {loading ? "Booking..." : "Book Appointment"}
      </button>

    </div>
  );
}