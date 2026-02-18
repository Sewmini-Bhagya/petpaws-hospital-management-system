export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-extrabold text-teal-700 mb-6">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Users</p>
          <p className="text-2xl font-bold text-teal-600">—</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Appointments</p>
          <p className="text-2xl font-bold text-teal-600">—</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Revenue</p>
          <p className="text-2xl font-bold text-teal-600">—</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">
          Admin Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700">
            Manage Users & Roles
          </button>
          <button className="bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700">
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
}
