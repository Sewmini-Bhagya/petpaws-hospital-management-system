import React from "react";
import { useNavigate } from "react-router-dom";

export default function ClientDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-teal-700 mb-4">
        Welcome, {user?.email}
      </h1>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button
          onClick={() => navigate("/edit-profile")}
          className="bg-white p-4 rounded-lg shadow hover:shadow-md"
        >
          ✏️ Edit Profile
        </button>

        <button
          onClick={() => navigate("/client/add-pet")}
          className="bg-white p-4 rounded-lg shadow hover:shadow-md"
        >
          🐾 Add Pet
        </button>

        <button
          onClick={() => navigate("/client/book-appointment")}
          className="bg-white p-4 rounded-lg shadow hover:shadow-md"
        >
          📅 Book Appointment
        </button>
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-2">My Pets</h2>
          <button
            onClick={() => navigate("/client/add-pet")}
            className="text-teal-600 text-sm"
          >
            + Add new pet
          </button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-2">Appointments</h2>
          <button
            onClick={() => navigate("/client/appointments")}
            className="text-teal-600 text-sm"
          >
            View appointments
          </button>
        </div>
      </div>

      {/* Bills */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow">
        <h2 className="font-semibold mb-2">Outstanding Bills</h2>
        <p className="text-gray-500 text-sm">
          No outstanding bills 🎉
        </p>
      </div>
    </div>
  );
}
