import React, { useMemo, useState } from "react";

export default function DashboardReceptionist({ onLogout }) {
  // Seed data (local-only for your presentation)
  const [appointments, setAppointments] = useState([
    { id: 1, time: "09:30 AM", pet: "Bella (Dog)",  owner: "Jess",    vet: "Dr. Blake",  status: "Confirmed", reason: "Vaccination" },
    { id: 2, time: "11:00 AM", pet: "Milo (Cat)",   owner: "Jackson", vet: "Dr. Liana",  status: "Check-in", reason: "General Checkup" },
    { id: 3, time: "01:00 PM", pet: "Luna (Dog)",   owner: "Hailey",  vet: "Dr. Carter", status: "Pending",   reason: "Skin Allergy" },
    { id: 4, time: "03:00 PM", pet: "Max (Dog)",    owner: "Evan",    vet: "Dr. Blake",  status: "Scheduled", reason: "Dental Cleaning" },
  ]);

  const [query, setQuery] = useState("");
  const [detailsId, setDetailsId] = useState(null); // modal target

  // Compute stats from current appointments
  const stats = useMemo(() => {
    const checkedIn = appointments.filter(a => a.status === "Check-in").length;
    const upcoming  = appointments.filter(a => a.status !== "Check-in").length;
    return {
      todaysVisits: checkedIn,                // shows live when you click Check-in
      upcomingAppointments: upcoming,         // decreases when you check-in
      prescriptions: 8,                       // static demo number
      feedbackCount: 6,                       // static demo number
      unreadFeedback: 1,                      // static demo number
    };
  }, [appointments]);

  // Filtering for the sidebar "Search results"
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return appointments.filter(a =>
      a.pet.toLowerCase().includes(q) ||
      a.owner.toLowerCase().includes(q) ||
      a.vet.toLowerCase().includes(q)
    );
  }, [appointments, query]);

  const openDetails = (id) => setDetailsId(id);
  const closeDetails = () => setDetailsId(null);

  const handleCheckIn = (id) => {
    setAppointments(prev =>
      prev.map(a => (a.id === id ? { ...a, status: "Check-in" } : a))
    );
  };

  const statusColor = (s) =>
    s === "Confirmed" ? "text-green-600"
    : s === "Check-in" ? "text-blue-600"
    : s === "Pending" ? "text-yellow-600"
    : "text-gray-600"; // Scheduled

  const detailsAppt = detailsId
    ? appointments.find(a => a.id === detailsId)
    : null;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-600 text-white rounded-xl flex items-center justify-center font-bold">
            PP
          </div>
          <div>
            <h1 className="text-2xl font-bold text-teal-700">Receptionist Dashboard</h1>
            <p className="text-gray-500 text-sm">
              Overview of today’s activity & quick actions
            </p>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <input
            type="text"
            placeholder="Search pets, owners or vets"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border border-gray-200 px-4 py-2 rounded-md focus:ring-2 focus:ring-teal-400 outline-none w-60"
          />
          <button className="bg-teal-600 text-white px-4 py-2 rounded-md font-medium hover:bg-teal-700 transition">
            New Appointment
          </button>
          <button
            onClick={onLogout}
            className="bg-gray-200 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-300"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="text-2xl font-bold text-teal-700">{stats.todaysVisits}</div>
          <div className="font-medium">Today's visits</div>
          <div className="text-sm text-gray-500 mt-1">Auto-updates on check-in</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="text-2xl font-bold text-teal-700">{stats.upcomingAppointments}</div>
          <div className="font-medium">Upcoming appointments</div>
          <div className="text-sm text-gray-500 mt-1">Includes pending & confirmed</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="text-2xl font-bold text-teal-700">{stats.prescriptions}</div>
          <div className="font-medium">Prescriptions</div>
          <div className="text-sm text-gray-500 mt-1">Pending approvals: 2</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="text-2xl font-bold text-teal-700">{stats.feedbackCount}</div>
          <div className="font-medium">Feedback</div>
          <div className="text-sm text-gray-500 mt-1">Unread: {stats.unreadFeedback}</div>
        </div>
      </div>

      {/* Appointments + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming appointments */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800">Upcoming appointments</h3>
            <span className="text-sm text-gray-500">Today</span>
          </div>

          {appointments.map((appt) => (
            <div
              key={appt.id}
              className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between py-3 border-b border-gray-100 last:border-none"
            >
              <div>
                <div className="font-medium">
                  {appt.time} — {appt.pet}
                </div>
                <div className="text-sm text-gray-500">
                  Owner: {appt.owner} • Vet: {appt.vet} • Status:{" "}
                  <span className={`font-medium ${statusColor(appt.status)}`}>
                    {appt.status}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openDetails(appt.id)}
                  className="px-3 py-1 border border-gray-200 rounded-md text-sm hover:bg-gray-50"
                >
                  Details
                </button>
                <button
                  onClick={() => handleCheckIn(appt.id)}
                  disabled={appt.status === "Check-in"}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    appt.status === "Check-in"
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-yellow-400 text-teal-900 hover:brightness-105"
                  }`}
                >
                  {appt.status === "Check-in" ? "Checked-in" : "Check-in"}
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-4">
            <a href="#" className="text-teal-600 text-sm hover:underline">
              View all appointments
            </a>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h4 className="font-semibold mb-2">Search results</h4>
            {query ? (
              results.length ? (
                <ul className="text-sm space-y-2">
                  {results.map(r => (
                    <li key={r.id} className="flex items-center justify-between">
                      <span>
                        <span className="font-medium">{r.pet}</span>{" "}
                        <span className="text-gray-500">({r.owner})</span>
                      </span>
                      <button
                        onClick={() => openDetails(r.id)}
                        className="text-teal-600 hover:underline"
                      >
                        open
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No matches.</p>
              )
            ) : (
              <p className="text-sm text-gray-500">
                Type a pet, owner, or vet name above.
              </p>
            )}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold">Recent feedback</h4>
              <span className="text-sm text-gray-500">Latest</span>
            </div>
            {[
              { name: "Jess",    text: "Amazing care, friendly staff!",                     stars: 5 },
              { name: "Jackson", text: "Quick appointment, thanks.",                        stars: 4 },
              { name: "Hailey",  text: "Saved our dog’s life — highly recommended.",        stars: 5 },
            ].map((f, i) => (
              <div key={i} className="border-b border-gray-100 py-3 last:border-none">
                <div className="flex justify-between">
                  <div className="font-medium">{f.name}</div>
                  <div className="text-yellow-400">
                    {"★".repeat(f.stars)}
                    {"☆".repeat(5 - f.stars)}
                  </div>
                </div>
                <p className="text-sm text-gray-500">{f.text}</p>
              </div>
            ))}
            <div className="text-right mt-3">
              <a href="#" className="text-teal-600 text-sm hover:underline">
                View all feedback
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-white p-6 rounded-xl shadow-sm mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h4 className="font-semibold">Quick actions</h4>
          <p className="text-sm text-gray-500">
            Common tasks for receptionists & vets
          </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700">
            New Patient
          </button>
          <button className="border border-gray-200 px-4 py-2 rounded-md hover:bg-gray-50">
            New Invoice
          </button>
        </div>
      </div>

      {/* Details Modal */}
      {detailsAppt && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
            <button
              onClick={closeDetails}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
              aria-label="Close details"
            >
              ✕
            </button>

            <h3 className="text-xl font-semibold text-teal-700 mb-2">
              Appointment Details
            </h3>
            <div className="text-sm space-y-2">
              <div><span className="font-medium">Time:</span> {detailsAppt.time}</div>
              <div><span className="font-medium">Pet:</span> {detailsAppt.pet}</div>
              <div><span className="font-medium">Owner:</span> {detailsAppt.owner}</div>
              <div><span className="font-medium">Vet:</span> {detailsAppt.vet}</div>
              <div>
                <span className="font-medium">Status:</span>{" "}
                <span className={statusColor(detailsAppt.status)}>{detailsAppt.status}</span>
              </div>
              <div><span className="font-medium">Reason:</span> {detailsAppt.reason}</div>
            </div>

            <div className="mt-5 flex gap-2 justify-end">
              <button
                onClick={() => {
                  handleCheckIn(detailsAppt.id);
                  closeDetails();
                }}
                disabled={detailsAppt.status === "Check-in"}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  detailsAppt.status === "Check-in"
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-yellow-400 text-teal-900 hover:brightness-105"
                }`}
              >
                {detailsAppt.status === "Check-in" ? "Checked-in" : "Check-in"}
              </button>
              <button
                onClick={closeDetails}
                className="px-4 py-2 border border-gray-200 rounded-md text-sm hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
