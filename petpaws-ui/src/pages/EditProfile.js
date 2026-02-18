import { useEffect, useState } from "react";

export default function EditProfile() {
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    address_line1: "",
  });

  const [pets, setPets] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* -------------------------
     Load profile + pets
  ------------------------- */
  useEffect(() => {
    const token = localStorage.getItem("token");

    // Get profile
    fetch("http://localhost:5000/api/profile/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          phone: data.phone || "",
          address_line1: data.address_line1 || "",
        });
      })
      .catch(() => setError("Failed to load profile"));

    // Get pets
    fetch("http://localhost:5000/api/pets/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setPets(data);
      });
  }, []);

  /* -------------------------
     Handle input changes
  ------------------------- */
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  /* -------------------------
     Save profile
  ------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(profile),
      });

      if (!res.ok) {
        setError("Failed to update profile");
        return;
      }

      setMessage("Profile updated successfully ✅");
    } catch {
      setError("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-800">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex items-center gap-4">
          <div className="w-12 h-12 bg-teal-500 text-white rounded-lg flex items-center justify-center font-bold">
            PP
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-teal-700">
              Edit Profile
            </h1>
            <p className="text-sm text-gray-600">
              Update your personal information
            </p>
          </div>
        </header>

        {/* Messages */}
        {message && (
          <div className="bg-green-50 text-green-700 p-3 rounded">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded">
            {error}
          </div>
        )}

        {/* Profile Form */}
        <section className="bg-white rounded-xl shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">First Name</label>
                <input
                  name="first_name"
                  value={profile.first_name}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded px-4 py-2 focus:ring-2 focus:ring-teal-400"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Last Name</label>
                <input
                  name="last_name"
                  value={profile.last_name}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded px-4 py-2 focus:ring-2 focus:ring-teal-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Phone</label>
                <input
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded px-4 py-2 focus:ring-2 focus:ring-teal-400"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Address</label>
                <input
                  name="address_line1"
                  value={profile.address_line1}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded px-4 py-2 focus:ring-2 focus:ring-teal-400"
                />
              </div>
            </div>

            <div className="pt-4 text-right">
              <button className="px-6 py-2 bg-teal-600 text-white rounded hover:bg-teal-700">
                Save Changes
              </button>
            </div>
          </form>
        </section>

        {/* Pets Section (READ ONLY) */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">My Pets</h2>

          {pets.length === 0 && (
            <p className="text-gray-500 text-sm">
              No pets registered yet.
            </p>
          )}

          <div className="space-y-3">
            {pets.map((pet) => (
              <div
                key={pet.pet_id}
                className="border rounded p-4 flex justify-between"
              >
                <div>
                  <p className="font-semibold">{pet.pet_name}</p>
                  <p className="text-sm text-gray-600">
                    {pet.species} • {pet.breed}
                  </p>
                </div>
                <span className="text-xs bg-teal-100 text-teal-700 px-3 py-1 rounded-full">
                  {pet.gender}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="text-xs text-gray-500 text-center py-6">
          Pet Paws • Edit Profile
        </div>
      </div>
    </div>
  );
}
