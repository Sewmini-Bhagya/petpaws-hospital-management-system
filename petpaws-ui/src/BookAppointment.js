import { useEffect, useState } from "react";

export default function BookAppointment() {
  const [pets, setPets] = useState([]);
  const [petId, setPetId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/pets/my", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(setPets)
      .catch(() => setMessage("Unable to load pets"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          pet_id: petId,
          date,
          time,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to book appointment");
        return;
      }

      setMessage("Appointment booked successfully 🐾");
      setPetId("");
      setDate("");
      setTime("");
    } catch {
      setMessage("Unable to connect to server");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-teal-700 mb-6">
        Book an Appointment
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow max-w-md"
      >
        {/* PET SELECT */}
        <select
          value={petId}
          onChange={(e) => setPetId(e.target.value)}
          required
          className="w-full mb-3 p-2 border rounded"
        >
          <option value="">Select Pet</option>
          {pets.map((pet) => (
            <option key={pet.pet_id} value={pet.pet_id}>
              {pet.pet_name}
            </option>
          ))}
        </select>

        <input
  type="date"
  value={date}
  min={new Date().toISOString().split("T")[0]}
  onChange={(e) => setDate(e.target.value)}
  className="w-full px-4 py-2 border rounded"
/>


        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="w-full mb-4 p-2 border rounded"
        />

        <button className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700">
          Confirm Booking
        </button>

        {message && (
          <p className="text-sm mt-3 text-center text-gray-700">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
