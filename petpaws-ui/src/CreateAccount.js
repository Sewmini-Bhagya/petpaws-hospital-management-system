import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateAccount() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Please fill all fields.");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Signup failed.");
        return;
      }

      setSuccess("Account created successfully! Redirecting to login…");
      setName("");
      setEmail("");
      setPassword("");

      // Redirect to login after success
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-800">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-8 py-6">
          {/* Back Button */}
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-teal-600 mb-4 hover:underline"
          >
            ← Back
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-teal-500 text-white rounded-xl flex items-center justify-center font-bold text-lg">
              PP
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-teal-700">
                Create Account
              </h2>
              <p className="text-sm text-gray-500">
                Join Pet Paws and manage your pets with ease
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 text-sm text-green-600 bg-green-50 border border-green-100 px-3 py-2 rounded">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 mb-4 w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none"
              required
            />

            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 mb-4 w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none"
              required
            />

            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 mb-6 w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md text-white font-semibold ${
                loading
                  ? "bg-teal-300"
                  : "bg-teal-600 hover:bg-teal-700 transition"
              }`}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-teal-600 font-medium hover:underline"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
