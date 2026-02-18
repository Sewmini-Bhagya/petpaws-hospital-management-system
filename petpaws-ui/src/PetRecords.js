import React, { useState } from 'react';

/* -------------------------
   Pet Paws Medical Records / Prescriptions (UI 11)
   Matches final teal theme and integrates with pets and appointments.
   ------------------------- */

export default function PetPawsMedicalRecords() {
  const [pets] = useState([
    { id: 1, name: 'Bella', type: 'Dog' },
    { id: 2, name: 'Milo', type: 'Cat' },
    { id: 3, name: 'Luna', type: 'Dog' },
  ]);

  const [selectedPet, setSelectedPet] = useState(pets[0]);
  const [notes, setNotes] = useState({
    Bella: ['2025-10-18: Regular vaccination completed'],
    Milo: ['2025-10-17: Ear infection treated'],
    Luna: ['2025-10-16: Annual check-up'],
  });
  const [prescriptions, setPrescriptions] = useState({
    Bella: [{ med: 'Amoxicillin', dosage: '1 tablet daily', duration: '5 days' }],
    Milo: [{ med: 'Ear drops', dosage: '2 drops per ear', duration: '7 days' }],
    Luna: [{ med: 'Vitamin supplement', dosage: '1 scoop daily', duration: '30 days' }],
  });

  const [newNote, setNewNote] = useState('');
  const [newPrescription, setNewPrescription] = useState({ med: '', dosage: '', duration: '' });

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setNotes({ ...notes, [selectedPet.name]: [...(notes[selectedPet.name] || []), newNote] });
    setNewNote('');
  };

  const handleAddPrescription = (e) => {
    e.preventDefault();
    if (!newPrescription.med || !newPrescription.dosage || !newPrescription.duration) return alert('Please fill all prescription fields.');
    setPrescriptions({
      ...prescriptions,
      [selectedPet.name]: [...(prescriptions[selectedPet.name] || []), newPrescription],
    });
    setNewPrescription({ med: '', dosage: '', duration: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-800">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-teal-500 text-white rounded-lg flex items-center justify-center font-bold">PP</div>
            <div>
              <h1 className="text-2xl font-extrabold text-teal-700">Medical Records & Prescriptions</h1>
              <p className="text-sm text-gray-600">View and manage each pet’s medical history and prescriptions</p>
            </div>
          </div>
        </header>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pets list */}
          <aside className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="font-semibold text-gray-700 mb-2">Pets</h3>
            <ul className="space-y-2">
              {pets.map((pet) => (
                <li
  key={pet.id}
  onClick={() => setSelectedPet(pet)}
  className={`p-2 rounded-md cursor-pointer ${
    selectedPet.id === pet.id
      ? 'bg-teal-50 text-teal-700 font-medium'
      : 'hover:bg-gray-50'
  }`}
>
  {pet.name} <span className="text-xs text-gray-500">({pet.type})</span>
</li>

              ))}
            </ul>
          </aside>

          {/* Notes section */}
          <section className="bg-white rounded-xl shadow-sm p-4 lg:col-span-1">
            <h3 className="font-semibold text-gray-700 mb-2">Medical Notes for {selectedPet.name}</h3>
            <ul className="space-y-2 mb-4">
              {(notes[selectedPet.name] || []).map((n, i) => (
                <li key={i} className="p-2 border border-gray-100 rounded-md text-sm text-gray-700">{n}</li>
              ))}
            </ul>
            <form onSubmit={handleAddNote} className="space-y-2">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add new note..."
                className="w-full border border-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-400 focus:outline-none"
              />
              <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 w-full">Add Note</button>
            </form>
          </section>

          {/* Prescriptions */}
          <section className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="font-semibold text-gray-700 mb-2">Prescriptions for {selectedPet.name}</h3>
            <ul className="space-y-3 mb-4">
              {(prescriptions[selectedPet.name] || []).map((p, i) => (
                <li key={i} className="p-3 border border-gray-100 rounded-md">
                  <div className="font-medium text-teal-700">{p.med}</div>
                  <div className="text-sm text-gray-600">{p.dosage}</div>
                  <div className="text-xs text-gray-500">Duration: {p.duration}</div>
                </li>
              ))}
            </ul>

            <form onSubmit={handleAddPrescription} className="space-y-2">
              <input
                type="text"
                placeholder="Medication"
                value={newPrescription.med}
                onChange={(e) => setNewPrescription({ ...newPrescription, med: e.target.value })}
                className="w-full border border-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-400 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Dosage"
                value={newPrescription.dosage}
                onChange={(e) => setNewPrescription({ ...newPrescription, dosage: e.target.value })}
                className="w-full border border-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-400 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Duration"
                value={newPrescription.duration}
                onChange={(e) => setNewPrescription({ ...newPrescription, duration: e.target.value })}
                className="w-full border border-gray-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-400 focus:outline-none"
              />
              <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 w-full">Add Prescription</button>
            </form>
          </section>
        </div>

        {/* Footer */}
        <div className="text-xs text-gray-500 text-center py-6">
          Pet Paws • Medical Records & Prescriptions module — link this to pet profiles and backend storage.
        </div>
      </div>
    </div>
  );
}