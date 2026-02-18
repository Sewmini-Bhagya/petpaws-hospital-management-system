import React, { useState } from 'react';

export default function AppointmentsWithReschedule() {
  const [appointments, setAppointments] = useState([
    { id: 1, pet: 'Bella', vet: 'Dr. Blake', date: '2025-10-21', time: '09:30', reason: 'Vaccination', status: 'Confirmed' },
    { id: 2, pet: 'Milo', vet: 'Dr. Liana', date: '2025-10-22', time: '11:00', reason: 'Check-up', status: 'Confirmed' },
    { id: 3, pet: 'Luna', vet: 'Dr. Carter', date: '2025-10-24', time: '15:00', reason: 'Dental Cleaning', status: 'Pending' },
  ]);

  const [reschedule, setReschedule] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  const handleCancel = (id) => {
    if (!window.confirm('Cancel this appointment?')) return;
    setAppointments(appointments.map(a => a.id === id ? { ...a, status: 'Cancelled' } : a));
  };

  const handleReschedule = (id) => {
    const updated = appointments.map(a => a.id === id ? { ...a, date: newDate, time: newTime, status: 'Rescheduled' } : a);
    setAppointments(updated);
    setReschedule(null);
    setNewDate('');
    setNewTime('');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-800">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="flex items-center gap-4">
          <div className="w-12 h-12 bg-teal-500 text-white rounded-lg flex items-center justify-center font-bold">PP</div>
          <div>
            <h1 className="text-2xl font-extrabold text-teal-700">Appointments</h1>
            <p className="text-sm text-gray-600">View, manage, and reschedule appointments</p>
          </div>
        </header>

        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Appointments</h2>
          <div className="divide-y">
            {appointments.map((a) => (
              <div key={a.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <div className="font-medium text-gray-800">{a.pet} with {a.vet}</div>
                  <div className="text-sm text-gray-600">{a.date} • {a.time}</div>
                  <div className="text-sm text-gray-500">{a.reason}</div>
                  <div
                    className={`text-xs mt-1 ${
                      a.status === 'Cancelled'
                        ? 'text-red-600'
                        : a.status === 'Rescheduled'
                        ? 'text-yellow-700'
                        : 'text-green-600'
                    }`}
                  >
                    {a.status}
                  </div>

                  <div className="flex gap-2 mt-3 sm:mt-0">
                    <button
                      onClick={() => setReschedule(a)}
                      className="px-3 py-1 border rounded text-sm"
                    >
                      Reschedule
                    </button>
                    <button
                      onClick={() => handleCancel(a.id)}
                      className="px-3 py-1 bg-red-50 text-red-600 rounded text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {appointments.length === 0 && (
              <div className="p-4 text-sm text-gray-500">
                No appointments available.
              </div>
            )}
          </div>
        </section>

        {reschedule && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
              <h3 className="text-lg font-semibold text-teal-700 mb-3">
                Reschedule Appointment
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {reschedule.pet} with {reschedule.vet}
              </p>

              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600">New Date</label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="border border-gray-200 rounded-md px-3 py-2 w-full"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">New Time</label>
                  <input
                    type="time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="border border-gray-200 rounded-md px-3 py-2 w-full"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setReschedule(null)}
                  className="px-3 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleReschedule(reschedule.id)}
                  className="px-3 py-2 bg-teal-600 text-white rounded"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        <footer className="text-xs text-gray-500 text-center py-6">
          Pet Paws • Appointments Management — demo only, link to database for live updates.
        </footer>
      </div>
    </div>
  );
}
