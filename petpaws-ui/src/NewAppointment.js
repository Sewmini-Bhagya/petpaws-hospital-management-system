import React, { useState } from 'react';

/* -------------------------
   Pet Paws Appointments (UI 10)
   - Appointments list, upcoming schedule and "New Appointment" flow
   - Matches final teal theme and component style
   ------------------------- */

function NewAppointmentModal({ pets = [], vets = [], onClose, onCreate }) {
  const [pet, setPet] = useState(pets[0]?.name || '');
  const [vet, setVet] = useState(vets[0] || 'Dr. Blake');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('09:00');
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pet || !date || !time) return alert('Please fill pet, date and time.');
    onCreate({
      id: Date.now(),
      pet,
      vet,
      datetime: `${date} ${time}`,
      reason,
      status: 'Scheduled',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-teal-700">New appointment</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700">Pet</label>
            <select
              value={pet}
              onChange={(e) => setPet(e.target.value)}
              className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-400"
            >
              {pets.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.name} — {p.type}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-700">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700">Vet</label>
            <select
              value={vet}
              onChange={(e) => setVet(e.target.value)}
              className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-400"
            >
              {vets.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700">Reason</label>
            <input
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Vaccination"
              className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AppointmentsPanel({ sharedPets = [], sharedVets = [], onUpdateVets }) {
  const [appointments, setAppointments] = useState([
    { id: 1, pet: 'Bella', vet: 'Dr. Blake', datetime: '2025-10-20 09:30', status: 'Confirmed' },
    { id: 2, pet: 'Milo', vet: 'Dr. Liana', datetime: '2025-10-20 11:00', status: 'Check-in' },
    { id: 3, pet: 'Luna', vet: 'Dr. Carter', datetime: '2025-10-21 14:00', status: 'Pending' },
  ]);

  const [pets] = useState(
    sharedPets.length
      ? sharedPets
      : [
          { name: 'Bella', type: 'Dog' },
          { name: 'Milo', type: 'Cat' },
          { name: 'Luna', type: 'Dog' },
        ]
  );

  const [vets, setVets] = useState(sharedVets.length ? sharedVets : ['Dr. Blake', 'Dr. Liana', 'Dr. Carter']);
  const [showNew, setShowNew] = useState(false);
  const [filter, setFilter] = useState('upcoming');

  const createAppointment = (appt) => {
    setAppointments((prev) => [appt, ...prev]);
  };

  const cancelAppointment = (id) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'Cancelled' } : a)));
  };

  const addVet = (name) => {
    if (!name) return;
    if (vets.includes(name)) return alert('Vet already exists.');
    const updated = [...vets, name];
    setVets(updated);
    if (typeof onUpdateVets === 'function') onUpdateVets(updated);
  };

  const removeVet = (name) => {
    const updated = vets.filter((v) => v !== name);
    setVets(updated);
    if (typeof onUpdateVets === 'function') onUpdateVets(updated);
  };

  const filtered = appointments.filter((a) => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') return a.status !== 'Cancelled';
    if (filter === 'cancelled') return a.status === 'Cancelled';
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-800">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-teal-500 text-white rounded-lg flex items-center justify-center font-bold">PP</div>
            <div>
              <h1 className="text-2xl font-extrabold text-teal-700">Appointments</h1>
              <p className="text-sm text-gray-600">Manage bookings and daily schedule</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-md"
            >
              <option value="upcoming">Upcoming</option>
              <option value="all">All</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button
              onClick={() => setShowNew(true)}
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
            >
              New Appointment
            </button>
          </div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="font-semibold text-gray-700">Today's schedule</h3>
              <div className="mt-3 divide-y">
                {filtered.map((a) => (
                  <div key={a.id} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="font-medium">{a.datetime} — {a.pet}</div>
                      <div className="text-sm text-gray-500">
                        Vet: {a.vet} • Status:{' '}
                        <span
                          className={`font-medium ${
                            a.status === 'Cancelled' ? 'text-red-600' : 'text-teal-600'
                          }`}
                        >
                          {a.status}
                        </span>
                      </div>
                      {a.reason && <div className="text-sm text-gray-500">Note: {a.reason}</div>}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => alert('Open details — demo')}
                        className="px-3 py-1 border border-gray-200 rounded-md text-sm hover:bg-gray-50"
                      >
                        Details
                      </button>
                      {a.status !== 'Cancelled' && (
                        <button
                          onClick={() => cancelAppointment(a.id)}
                          className="px-3 py-1 bg-red-50 text-red-600 rounded-md text-sm hover:bg-red-100"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="font-semibold text-gray-700">Upcoming appointments (compact)</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                {appointments.slice(0, 5).map((a) => (
                  <li key={a.id}>
                    {a.datetime} • {a.pet} • {a.vet} • {a.status}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h4 className="font-semibold text-gray-700">Quick filters</h4>
              <div className="mt-3 flex flex-col gap-2">
                <button onClick={() => setFilter('upcoming')} className="text-left px-3 py-2 rounded-md hover:bg-gray-50">Upcoming</button>
                <button onClick={() => setFilter('all')} className="text-left px-3 py-2 rounded-md hover:bg-gray-50">All</button>
                <button onClick={() => setFilter('cancelled')} className="text-left px-3 py-2 rounded-md hover:bg-gray-50">Cancelled</button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <h4 className="font-semibold text-gray-700">Vets</h4>
              <ul className="mt-3 text-sm text-gray-600">
                {vets.map((v) => (
                  <li key={v}>{v}</li>
                ))}
              </ul>

              <div className="mt-3">
                <input id="newVet" placeholder="Add vet name" className="w-full px-3 py-2 border border-gray-200 rounded-md" />
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => {
                      const val = document.getElementById('newVet').value.trim();
                      addVet(val);
                      document.getElementById('newVet').value = '';
                    }}
                    className="px-3 py-2 bg-teal-600 text-white rounded-md"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {
                      const val = document.getElementById('newVet').value.trim();
                      removeVet(val);
                      document.getElementById('newVet').value = '';
                    }}
                    className="px-3 py-2 border rounded-md"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <div className="text-xs text-gray-500 text-center py-6">
          Pet Paws • Appointments module — connect to backend to persist bookings.
        </div>
      </div>

      {showNew && (
        <NewAppointmentModal pets={pets} vets={vets} onClose={() => setShowNew(false)} onCreate={createAppointment} />
      )}
    </div>
  );
}

/* -------------------------
   Combined Preview (UI 11)
   ------------------------- */

export default function PetPawsAdminPreview() {
  const [view, setView] = useState('appointments');
  const [sharedVets, setSharedVets] = useState(['Dr. Blake', 'Dr. Liana', 'Dr. Carter']);
  const [sharedPets] = useState([
    { name: 'Bella', type: 'Dog' },
    { name: 'Milo', type: 'Cat' },
    { name: 'Luna', type: 'Dog' },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-800">
      <div className="max-w-7xl mx-auto">
        <nav className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-teal-500 text-white rounded-lg flex items-center justify-center font-bold">PP</div>
            <div>
              <h1 className="text-xl font-bold text-teal-700">Pet Paws — Admin Preview</h1>
              <p className="text-sm text-gray-500">Preview the appointments and settings screens</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setView('appointments')}
              className={`px-3 py-2 rounded-md ${view === 'appointments' ? 'bg-teal-600 text-white' : 'border'}`}
            >
              Appointments
            </button>
            <button
              onClick={() => setView('settings')}
              className={`px-3 py-2 rounded-md ${view === 'settings' ? 'bg-teal-600 text-white' : 'border'}`}
            >
              Settings
            </button>
          </div>
        </nav>

        {view === 'appointments' ? (
          <AppointmentsPanel sharedPets={sharedPets} sharedVets={sharedVets} onUpdateVets={(v) => setSharedVets(v)} />
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-sm text-gray-600">
            <h3 className="font-semibold text-gray-700 mb-3">Settings screen coming next...</h3>
            <p className="text-sm">This will include notification preferences, team management, and business hours setup.</p>
          </div>
        )}
      </div>
    </div>
  );
}
