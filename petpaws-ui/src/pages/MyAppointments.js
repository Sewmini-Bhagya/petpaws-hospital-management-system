import { useEffect, useState } from "react";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/appointments/my", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAppointments(data);
        } else {
          setError("Failed to load appointments");
        }
      })
      .catch(() => setError("Unable to connect to server"));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-teal-700 mb-2">
        My Appointments
      </h1>
      <p className="text-gray-500 mb-6">
        View your upcoming appointments
      </p>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded mb-4">
          {error}
        </div>
      )}

      {appointments.length === 0 && !error && (
        <p className="text-gray-500">No appointments found.</p>
      )}

      <div className="space-y-4">
        {appointments.map((appt) => {
          const start = new Date(appt.appointment_start);

          return (
            <div
              key={appt.appointment_id}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold text-teal-700">
                  {appt.pet_name}
                </h2>
                <p className="text-sm text-gray-600">
                  {start.toLocaleDateString()} at{" "}
                  {start.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                Pending
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
