import React, { useState } from 'react';

/* -------------------------
   Pet Paws Edit Profile + My Pets Integration
   - This file now contains both the Edit Profile screen and a My Pets manager
   - Users can toggle between editing personal info and managing multiple pets
   - Changes in the My Pets manager sync back to the profile state
   ------------------------- */

function MyPetsManager({ pets, onAdd, onUpdate, onDelete, onBack }) {
  const [newPet, setNewPet] = useState({ name: '', type: '', age: '', condition: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newPet.name || !newPet.type || !newPet.age) return alert('Please fill required pet fields');
    onAdd({ ...newPet });
    setNewPet({ name: '', type: '', age: '', condition: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-800">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-teal-500 text-white rounded-lg flex items-center justify-center font-bold">PP</div>
            <div>
              <h1 className="text-2xl font-extrabold text-teal-700">Manage My Pets</h1>
              <p className="text-sm text-gray-600">Add, edit or remove the pets associated with this account</p>
            </div>
          </div>
          <div>
            <button onClick={onBack} className="px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50">Back to profile</button>
          </div>
        </header>

        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Your Pets</h2>
          {pets.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pets.map((pet, idx) => (
                <div key={idx} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-teal-700 font-bold">{pet.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{pet.type} • {pet.age}</p>
                      {pet.condition && <p className="text-xs text-gray-500 mt-2 italic">{pet.condition}</p>}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button onClick={() => {
                        const updated = { ...pet };
                        const name = prompt('Edit pet name', pet.name);
                        if (name === null) return; // cancelled
                        updated.name = name;
                        const type = prompt('Edit pet type', pet.type);
                        if (type === null) return;
                        updated.type = type;
                        const age = prompt('Edit pet age', pet.age);
                        if (age === null) return;
                        updated.age = age;
                        const cond = prompt('Edit condition (optional)', pet.condition || '');
                        if (cond === null) return;
                        updated.condition = cond;
                        onUpdate(idx, updated);
                      }} className="px-3 py-1 border border-gray-200 rounded-md text-sm hover:bg-gray-50">Edit</button>

                      <button onClick={() => onDelete(idx)} className="px-3 py-1 bg-red-50 text-red-600 rounded-md text-sm hover:bg-red-100">Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No pets yet — add one below.</p>
          )}
        </section>

        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Add a new pet</h2>
          <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <input value={newPet.name} onChange={(e)=>setNewPet({...newPet, name: e.target.value})} placeholder="Pet name" className="border border-gray-200 rounded-md px-4 py-2" required />
            <input value={newPet.type} onChange={(e)=>setNewPet({...newPet, type: e.target.value})} placeholder="Type (Dog, Cat...)" className="border border-gray-200 rounded-md px-4 py-2" required />
            <input value={newPet.age} onChange={(e)=>setNewPet({...newPet, age: e.target.value})} placeholder="Age (e.g., 2 years)" className="border border-gray-200 rounded-md px-4 py-2" required />
            <input value={newPet.condition} onChange={(e)=>setNewPet({...newPet, condition: e.target.value})} placeholder="Condition (optional)" className="border border-gray-200 rounded-md px-4 py-2" />
            <div className="col-span-full text-right">
              <button type="submit" className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">Add pet</button>
            </div>
          </form>
        </section>

        <div className="text-xs text-gray-500 text-center py-6">Pet Paws • Manage My Pets — changes sync to profile on save.</div>
      </div>
    </div>
  );
}

export default function PetPawsEditProfile() {
  const [profile, setProfile] = useState({
    name: 'Jess',
    email: 'jess.petpaws@gmail.com',
    phone: '+94 712 345 678',
    address: '45 Pet Care Street, Colombo',
    pets: [
      { name: 'Bella', type: 'Dog', age: '3 years' },
      { name: 'Milo', type: 'Cat', age: '2 years' },
    ],
  });

  const [view, setView] = useState('profile'); // 'profile' or 'pets'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  // MyPets handlers — keep data in sync with profile.pets
  const addPet = (pet) => {
    setProfile({ ...profile, pets: [...profile.pets, { ...pet }] });
  };
  const updatePet = (index, pet) => {
    const copied = [...profile.pets];
    copied[index] = pet;
    setProfile({ ...profile, pets: copied });
  };
  const deletePet = (index) => {
    const copied = profile.pets.filter((_, i) => i !== index);
    setProfile({ ...profile, pets: copied });
  };

  if (view === 'pets') {
    return (
      <MyPetsManager pets={profile.pets} onAdd={addPet} onUpdate={updatePet} onDelete={deletePet} onBack={()=>setView('profile')} />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-800">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-teal-500 text-white rounded-lg flex items-center justify-center font-bold">PP</div>
            <div>
              <h1 className="text-2xl font-extrabold text-teal-700">Edit Profile</h1>
              <p className="text-sm text-gray-600">Update your account and manage your pet details</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={()=>setView('pets')} className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">Manage my pets</button>
          </div>
        </header>

        {/* Profile Form */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-200 rounded-md px-4 py-2 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-200 rounded-md px-4 py-2 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-200 rounded-md px-4 py-2 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-200 rounded-md px-4 py-2 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                />
              </div>
            </div>

            <h2 className="text-lg font-semibold text-gray-700 mt-6 mb-4">My Pets</h2>
            <div className="space-y-4">
              {profile.pets.map((pet, index) => (
                <div key={index} className="border border-gray-100 p-4 rounded-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Pet Name</label>
                      <input
                        value={pet.name}
                        onChange={(e) => {
                          const updatedPets = [...profile.pets];
                          updatedPets[index].name = e.target.value;
                          setProfile({ ...profile, pets: updatedPets });
                        }}
                        className="mt-1 w-full border border-gray-200 rounded-md px-4 py-2 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Type</label>
                      <input
                        value={pet.type}
                        onChange={(e) => {
                          const updatedPets = [...profile.pets];
                          updatedPets[index].type = e.target.value;
                          setProfile({ ...profile, pets: updatedPets });
                        }}
                        className="mt-1 w-full border border-gray-200 rounded-md px-4 py-2 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Age</label>
                      <input
                        value={pet.age}
                        onChange={(e) => {
                          const updatedPets = [...profile.pets];
                          updatedPets[index].age = e.target.value;
                          setProfile({ ...profile, pets: updatedPets });
                        }}
                        className="mt-1 w-full border border-gray-200 rounded-md px-4 py-2 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 text-right">
              <button type="submit" className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">Save Changes</button>
            </div>
          </form>
        </section>

        {/* Footer */}
        <div className="text-xs text-gray-500 text-center py-6">
          Pet Paws • Edit Profile module — supports multiple pets for each user and syncs with My Pets manager.
        </div>
      </div>
    </div>
  );
}