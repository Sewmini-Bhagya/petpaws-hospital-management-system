export default function ReceptionistDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-extrabold text-teal-700 mb-6">
        Receptionist Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-sm text-gray-500">Appointments Today</h2>
          <p className="text-3xl font-bold text-teal-600">12</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-sm text-gray-500">Pending Payments</h2>
          <p className="text-3xl font-bold text-teal-600">4</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-sm text-gray-500">New Clients</h2>
          <p className="text-3xl font-bold text-teal-600">3</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="p-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
            Book Appointment
          </button>
          <button className="p-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
            Register New Client
          </button>
          <button className="p-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
            Process Payments
          </button>
          <button className="p-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
            View Appointments
          </button>
        </div>
      </div>
    </div>
  );
}
