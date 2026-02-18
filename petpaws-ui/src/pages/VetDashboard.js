export default function VetDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-extrabold text-teal-700 mb-6">
        Veterinarian Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-sm text-gray-500">Today’s Appointments</h2>
          <p className="text-3xl font-bold text-teal-600">7</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-sm text-gray-500">Pets Treated Today</h2>
          <p className="text-3xl font-bold text-teal-600">5</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Upcoming Appointments
        </h2>

        <table className="w-full text-sm text-left">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="py-2">Time</th>
              <th>Pet</th>
              <th>Owner</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">10:00 AM</td>
              <td>Buddy (Dog)</td>
              <td>Kasun Perera</td>
              <td>
                <button className="text-teal-600 hover:underline">
                  View Record
                </button>
              </td>
            </tr>
            <tr>
              <td className="py-2">11:30 AM</td>
              <td>Milo (Cat)</td>
              <td>Nimali Silva</td>
              <td>
                <button className="text-teal-600 hover:underline">
                  View Record
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
