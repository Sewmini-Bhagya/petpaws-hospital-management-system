import React, { useState } from 'react';

/* -------------------------
   Pet Paws Customer Feedback (UI 7)
   Matches final teal theme and layout consistency
   ------------------------- */

export default function PetPawsFeedback() {
  const [feedbacks, setFeedbacks] = useState([
    { id: 1, name: 'Jess', pet: 'Bella', feedback: 'Excellent service and very caring staff.', rating: 5 },
    { id: 2, name: 'Jackson', pet: 'Milo', feedback: 'Quick appointment and friendly environment.', rating: 4 },
    { id: 3, name: 'Hailey', pet: 'Luna', feedback: 'Professional doctors and well-maintained clinic.', rating: 5 },
  ]);
  const [newFeedback, setNewFeedback] = useState({ name: '', pet: '', feedback: '', rating: 5 });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newFeedback.name.trim() || !newFeedback.pet.trim() || !newFeedback.feedback.trim()) {
      alert('Please fill all the fields.');
      return;
    }
    const newEntry = { ...newFeedback, id: feedbacks.length + 1 };
    setFeedbacks([...feedbacks, newEntry]);
    setNewFeedback({ name: '', pet: '', feedback: '', rating: 5 });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-800">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-teal-500 text-white rounded-lg flex items-center justify-center font-bold">PP</div>
            <div>
              <h1 className="text-2xl font-extrabold text-teal-700">Customer Feedback</h1>
              <p className="text-sm text-gray-600">View and submit feedback for Pet Paws services</p>
            </div>
          </div>
        </header>

        {/* Submit Feedback */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Submit your feedback</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Your Name</label>
                <input
                  type="text"
                  value={newFeedback.name}
                  onChange={(e) => setNewFeedback({ ...newFeedback, name: e.target.value })}
                  className="mt-1 w-full border border-gray-200 rounded-md px-4 py-2 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Pet Name</label>
                <input
                  type="text"
                  value={newFeedback.pet}
                  onChange={(e) => setNewFeedback({ ...newFeedback, pet: e.target.value })}
                  className="mt-1 w-full border border-gray-200 rounded-md px-4 py-2 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                  placeholder="Enter pet name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Your Feedback</label>
              <textarea
                value={newFeedback.feedback}
                onChange={(e) => setNewFeedback({ ...newFeedback, feedback: e.target.value })}
                rows="3"
                className="mt-1 w-full border border-gray-200 rounded-md px-4 py-2 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                placeholder="Share your experience..."
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <select
                value={newFeedback.rating}
                onChange={(e) => setNewFeedback({ ...newFeedback, rating: parseInt(e.target.value) })}
                className="mt-1 border border-gray-200 rounded-md px-4 py-2 focus:ring-2 focus:ring-teal-400 focus:outline-none"
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>{r} Star{r > 1 && 's'}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">Submit Feedback</button>
          </form>
        </section>

        {/* Feedback List */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Feedback</h2>
          <div className="space-y-4">
            {feedbacks.map((f) => (
              <div key={f.id} className="p-4 border border-gray-100 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-teal-700">{f.name}</h4>
                    <p className="text-sm text-gray-500">Pet: {f.pet}</p>
                  </div>
                  <div className="text-yellow-500">{'★'.repeat(f.rating)}</div>
                </div>
                <p className="mt-2 text-gray-600 text-sm">{f.feedback}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="text-xs text-gray-500 text-center py-6">
          Pet Paws • Customer Feedback module — add backend integration for persistence.
        </div>
      </div>
    </div>
  );
}