import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header (ONLY ONE NAVBAR) */}
      <header className="bg-teal-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="text-2xl">🐾</div>
            <div>
              <div className="text-lg font-semibold">Pet Paws</div>
              <div className="text-xs opacity-90">Animal Hospital</div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex gap-6 items-center">
            <button className="hover:underline">Home</button>
            <button className="hover:underline">About</button>
            <button className="hover:underline">Services</button>
            <button
              onClick={() => navigate("/contact-help")}
              className="hover:underline"
            >
              Contact
            </button>

            <button
              onClick={() => navigate("/login")}
              className="ml-4 bg-yellow-400 text-teal-800 px-4 py-2 rounded-md font-medium hover:bg-yellow-300 transition"
            >
              Login
            </button>
          </nav>

          {/* Mobile */}
          <div className="md:hidden">
            <button className="bg-white/20 px-3 py-2 rounded-md">Menu</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-teal-700 leading-tight">
              Caring for Your Pets with Love &amp; Technology
            </h1>
            <p className="mt-4 text-gray-600 max-w-xl">
              Book appointments, view medical records, and manage your pet’s care
              online. Pet Paws brings veterinary services into a simple, trusted,
              and friendly web experience.
            </p>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => navigate("/login")}
                className="bg-teal-600 text-white px-5 py-3 rounded-lg shadow-md hover:bg-teal-700"
              >
                Book Appointment
              </button>
              <button className="bg-white border border-teal-200 px-5 py-3 rounded-lg hover:bg-gray-50">
                Learn More
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src="/assets/hero-pets.jpg"
                alt="Pets"
                className="w-full h-80 object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=1200&q=60";
                }}
              />
            </div>

            <div className="absolute -bottom-8 left-6 right-6">
              <div className="bg-white rounded-xl shadow-xl p-4 grid grid-cols-3 gap-4">
                <button
                  onClick={() => navigate("/login")}
                  className="bg-teal-600 text-white py-2 rounded-lg"
                >
                  Book Appointment
                </button>
                <button className="border border-teal-100 py-2 rounded-lg">
                  View Pet Care Tips
                </button>
                <button
                  onClick={() => navigate("/contact-help")}
                  className="border border-teal-100 py-2 rounded-lg"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="h-12" />

        {/* Features */}
        <section className="mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold">Easy Booking</h3>
              <p className="text-sm text-gray-500 mt-2">
                Choose a service, pick a vet, and select a convenient time slot.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold">Digital Records</h3>
              <p className="text-sm text-gray-500 mt-2">
                All pet history and prescriptions stored in one safe place.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold">Secure Payments</h3>
              <p className="text-sm text-gray-500 mt-2">
                Pay online or at visit and receive instant invoices.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-teal-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-semibold text-lg">Pet Paws Animal Hospital</h4>
            <p className="text-sm text-white/90 mt-2">
              12:34 Bark St., Petville
            </p>
            <p className="text-sm text-white/90 mt-1">
              076 616 6538 | petpawsanimalhospital@gmail.com
            </p>
          </div>

          <div>
            <h5 className="font-medium">Quick Links</h5>
            <ul className="mt-3 space-y-2 text-sm">
              <li>Home</li>
              <li>Services</li>
              <li>Book Appointment</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h5 className="font-medium">Operating Hours</h5>
            <p className="text-sm mt-3">Mon - Sat: 9:00 AM - 9:00 PM</p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-6 py-4 text-center text-sm">
          © {new Date().getFullYear()} Pet Paws Animal Hospital
        </div>
      </footer>
    </div>
  );
}
