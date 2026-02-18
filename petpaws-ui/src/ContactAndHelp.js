import React, { useState } from 'react';

/* -------------------------
   Pet Paws Contact & Help (UI 16)
   - Public-facing contact form, FAQs, and emergency info
   - Final teal theme maintained
   ------------------------- */

export default function PetPawsContact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return alert('Please fill all fields');
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-800">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="flex items-center gap-4">
          <div className="w-12 h-12 bg-teal-500 text-white rounded-lg flex items-center justify-center font-bold">PP</div>
          <div>
            <h1 className="text-2xl font-extrabold text-teal-700">Contact & Help</h1>
            <p className="text-sm text-gray-600">We’re here to help you with any questions or concerns</p>
          </div>
        </header>

        {/* Contact Form */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Send us a message</h2>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input type="text" placeholder="Your Name" value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} className="border border-gray-200 rounded-md px-3 py-2" required />
                <input type="email" placeholder="Your Email" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} className="border border-gray-200 rounded-md px-3 py-2" required />
              </div>
              <textarea placeholder="Your Message" value={form.message} onChange={(e)=>setForm({...form, message: e.target.value})} className="border border-gray-200 rounded-md px-3 py-2 w-full h-32" required />
              <div className="flex justify-end">
                <button type="submit" className="px-5 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-700">Send Message</button>
              </div>
            </form>
          ) : (
            <div className="text-center py-10 text-teal-700 font-medium">
              ✅ Your message has been sent! Our team will get back to you soon.
            </div>
          )}
        </section>

        {/* Emergency Contact Info */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Emergency Contact</h2>
          <div>
            <h3 className="font-medium text-teal-700">Pet Paws Animal Hospital</h3>
            <p className="text-sm text-gray-600">📞 +94 77 123 4567</p>
            <p className="text-sm text-gray-600">🏥 45 Flower Road, Colombo 07</p>
            <p className="text-sm text-gray-600">🕒 Open 24/7 for emergencies</p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-teal-700">What are your working hours?</h3>
              <p className="text-sm text-gray-600">We’re open Monday to Saturday, from 8:00 AM to 8:00 PM.</p>
            </div>
            <div>
              <h3 className="font-medium text-teal-700">Do you offer emergency services?</h3>
              <p className="text-sm text-gray-600">Yes, 24/7 emergency support is available for all pets in need.</p>
            </div>
            <div>
              <h3 className="font-medium text-teal-700">Can I book appointments online?</h3>
              <p className="text-sm text-gray-600">Absolutely! Use your dashboard to book, manage, and reschedule appointments easily.</p>
            </div>
          </div>
        </section>

        <footer className="text-xs text-gray-500 text-center py-6">
          Pet Paws • Contact & Help — your trusted animal care partner ❤
        </footer>
      </div>
    </div>
  );
}