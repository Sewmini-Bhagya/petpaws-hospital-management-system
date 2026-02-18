import React, { useState } from 'react';

/* -------------------------
   Pet Paws Admin Settings (UI 12)
   - Manage users (owners, vets, receptionists, admins)
   - Add / edit / deactivate users
   - Role filter and search
   - Matches teal theme
   ------------------------- */

function UserForm({ initial = {}, onCancel, onSave }) {
  const [form, setForm] = useState({ role: 'Owner', active: true, ...initial });
  return (
    <form onSubmit={(e)=>{e.preventDefault(); onSave(form);}} className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          required
          placeholder="Full name"
          value={form.name || ''}
          onChange={(e)=>setForm({...form, name: e.target.value})}
          className="border border-gray-200 rounded-md px-3 py-2 w-full"
        />
        <input
          required
          type="email"
          placeholder="email@example.com"
          value={form.email || ''}
          onChange={(e)=>setForm({...form, email: e.target.value})}
          className="border border-gray-200 rounded-md px-3 py-2 w-full"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <select value={form.role} onChange={(e)=>setForm({...form, role: e.target.value})} className="border border-gray-200 rounded-md px-3 py-2">
          <option>Owner</option>
          <option>Vet</option>
          <option>Receptionist</option>
          <option>Admin</option>
        </select>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked={!!form.active} onChange={(e)=>setForm({...form, active: e.target.checked})} />
          <span className="text-sm text-gray-600">Active account</span>
        </label>
      </div>

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="px-3 py-2 rounded-md border">Cancel</button>
        <button type="submit" className="px-3 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-700">Save</button>
      </div>
    </form>
  );
}

function PetPawsAdminSettings() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Jess', email: 'jess.petpaws@gmail.com', role: 'Owner', active: true },
    { id: 2, name: 'Dr. Blake', email: 'blake@petpaws.com', role: 'Vet', active: true },
    { id: 3, name: 'Liana', email: 'liana@petpaws.com', role: 'Vet', active: true },
    { id: 4, name: 'Reception', email: 'reception@petpaws.com', role: 'Receptionist', active: true },
    { id: 5, name: 'Admin', email: 'admin@petpaws.com', role: 'Admin', active: true },
  ]);

  const [query, setQuery] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [editing, setEditing] = useState(null); // user object when editing
  const [showNew, setShowNew] = useState(false);

  const filtered = users.filter(u => (
    (filterRole === 'All' || u.role === filterRole) &&
    (u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase()))
  ));

  const handleSave = (user) => {
    if (user.id) {
      setUsers(users.map(u => u.id === user.id ? user : u));
    } else {
      const next = { ...user, id: Date.now() };
      setUsers([next, ...users]);
    }
    setEditing(null);
    setShowNew(false);
  };

  const handleDeactivate = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, active: !u.active } : u));
  };

  const handleDelete = (id) => {
    if (!confirm('Delete this user? This cannot be undone in demo.')) return;
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-800">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-teal-500 text-white rounded-lg flex items-center justify-center font-bold">PP</div>
            <div>
              <h1 className="text-2xl font-extrabold text-teal-700">Admin Settings</h1>
              <p className="text-sm text-gray-600">Manage users, roles and account status</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search by name or email" className="px-3 py-2 border border-gray-200 rounded-md" />
            <select value={filterRole} onChange={(e)=>setFilterRole(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-md">
              <option>All</option>
              <option>Owner</option>
              <option>Vet</option>
              <option>Receptionist</option>
              <option>Admin</option>
            </select>
            <button onClick={()=>{setShowNew(true); setEditing(null);}} className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">Add user</button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User list */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-4">
            <h3 className="font-semibold text-gray-700 mb-3">Users ({filtered.length})</h3>
            <div className="divide-y">
              {filtered.map(u => (
                <div key={u.id} className={`flex items-center justify-between p-3 ${u.active ? '' : 'opacity-60'}`}>
                  <div>
                    <div className="font-medium text-gray-800">{u.name} <span className="text-xs text-gray-500">({u.role})</span></div>
                    <div className="text-sm text-gray-500">{u.email}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={()=>{setEditing(u); setShowNew(false);}} className="px-3 py-1 border rounded-md text-sm">Edit</button>
                    <button
                      onClick={() => handleDeactivate(u.id)}
                      className={`px-3 py-1 rounded-md text-sm ${u.active ? 'bg-yellow-100 text-yellow-800' : 'bg-green-50 text-green-700'}`}>{u.active ? 'Deactivate' : 'Activate'}</button>

                    <button onClick={()=>handleDelete(u.id)} className="px-3 py-1 bg-red-50 text-red-600 rounded-md text-sm">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Side panel: details or form */}
          <aside className="bg-white rounded-xl shadow-sm p-4">
            {editing || showNew ? (
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">{editing ? 'Edit user' : 'Add new user'}</h4>
                <UserForm initial={editing || {}} onCancel={()=>{setEditing(null); setShowNew(false);}} onSave={(data)=>handleSave(editing ? {...editing, ...data} : data)} />
              </div>
            ) : (
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">User details</h4>
                <p className="text-sm text-gray-600">Select a user from the list to see details, or click <strong>Add user</strong> to create a new account.</p>
                <div className="mt-4 text-sm text-gray-700">
                  <div><strong>Total users:</strong> {users.length}</div>
                  <div className="mt-2"><strong>Active:</strong> {users.filter(u=>u.active).length}</div>
                  <div className="mt-2"><strong>Vets:</strong> {users.filter(u=>u.role==='Vet').length}</div>
                </div>
              </div>
            )}
          </aside>
        </div>

        <div className="text-xs text-gray-500 text-center py-6">Pet Paws • Admin Settings — demo only. In production, connect to backend and enforce role-based access control.</div>
      </div>
    </div>
  );
}

/* Preview export for canvas */
export default function Preview() { return <PetPawsAdminSettings />; }