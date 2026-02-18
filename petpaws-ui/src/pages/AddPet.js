import { useState } from "react";

export default function AddPet() {
  const [form, setForm] = useState({
    pet_name: "",
    species: "",
    breed: "",
    date_of_birth: "",
    gender: "Female",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to register pet");
        return;
      }

      setMessage("Pet registered successfully 🐾");
      setForm({
        pet_name: "",
        species: "",
        breed: "",
        date_of_birth: "",
        gender: "Female",
      });
    } catch {
      setMessage("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-teal-700 mb-6">
        Register a Pet
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow max-w-md"
      >
        <input
          name="pet_name"
          placeholder="Pet Name"
          value={form.pet_name}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          name="species"
          placeholder="Species"
          value={form.species}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          name="breed"
          placeholder="Breed"
          value={form.breed}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="date"
          name="date_of_birth"
          value={form.date_of_birth}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        >
          <option>Male</option>
          <option>Female</option>
        </select>

        <button className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700">
          Register Pet
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
