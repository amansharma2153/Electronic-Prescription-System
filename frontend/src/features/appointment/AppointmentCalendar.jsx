import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { getDoctorAppointments } from '../../services/appointmentService';

export default function AppointmentCalendar({ doctorId }) {
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (doctorId) fetchAppointments();
  }, [doctorId]);

  const fetchAppointments = async () => {
    try {
      const res = await getDoctorAppointments(doctorId);
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Filter appointments for selected date
  const selectedAppointments = appointments.filter((a) => {
    return new Date(a.date).toDateString() === date.toDateString();
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* Calendar */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Appointment Calendar</h2>

        <Calendar
          onChange={setDate}
          value={date}
        />

        <p className="mt-4 text-gray-600">
          Selected: {date.toDateString()}
        </p>
      </div>

      {/* Appointments List */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Appointments</h2>

        {selectedAppointments.length === 0 ? (
          <p className="text-gray-500">No appointments for this date</p>
        ) : (
          <div className="space-y-3">
            {selectedAppointments.map((a) => (
              <div
                key={a._id}
                className="border p-3 rounded flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">
                    {a.patientId?.name || "Patient"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {a.time}
                  </p>
                </div>

                <span className={`px-3 py-1 rounded text-white text-sm
                  ${a.status === 'pending' ? 'bg-yellow-500' :
                    a.status === 'accepted' ? 'bg-green-500' :
                    'bg-red-500'
                  }`}>
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}