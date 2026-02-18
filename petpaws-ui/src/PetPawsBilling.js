import React, { useState } from 'react';

function InvoiceRow({ invoice, onView, onTogglePaid, onDelete }) {
  return (
    <div
      className={`flex items-center justify-between p-3 border-b ${
        invoice.paid ? 'opacity-80' : ''
      }`}
    >
      <div>
        <div className="font-medium text-gray-800">
          #{invoice.number} — {invoice.client}
        </div>
        <div className="text-sm text-gray-500">
          {invoice.pet} • {invoice.date}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-teal-700 font-semibold">
          LKR {invoice.total.toLocaleString()}
        </div>
        <button
          onClick={() => onView(invoice)}
          className="px-3 py-1 border rounded-md text-sm"
        >
          View
        </button>
        <button
          onClick={() => onTogglePaid(invoice.id)}
          className={`px-3 py-1 rounded-md text-sm ${
            invoice.paid
              ? 'bg-green-50 text-green-700'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {invoice.paid ? 'Mark Unpaid' : 'Mark Paid'}
        </button>
        <button
          onClick={() => onDelete(invoice.id)}
          className="px-3 py-1 bg-red-50 text-red-600 rounded-md text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default function PetPawsBilling() {
  const [invoices, setInvoices] = useState([
    {
      id: 1,
      number: 'INV-1001',
      client: 'Jess',
      pet: 'Bella',
      date: '2025-10-18',
      items: [
        { desc: 'Vaccination', price: 1500 },
        { desc: 'Consultation', price: 800 },
      ],
      total: 2300,
      paid: true,
    },
    {
      id: 2,
      number: 'INV-1002',
      client: 'Jackson',
      pet: 'Milo',
      date: '2025-10-19',
      items: [{ desc: 'Dental cleaning', price: 4500 }],
      total: 4500,
      paid: false,
    },
    {
      id: 3,
      number: 'INV-1003',
      client: 'Hailey',
      pet: 'Luna',
      date: '2025-10-20',
      items: [
        { desc: 'Surgery', price: 20000 },
        { desc: 'Medication', price: 2500 },
      ],
      total: 22500,
      paid: false,
    },
  ]);

  const [query, setQuery] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [previewInvoice, setPreviewInvoice] = useState(null);

  const handleCreate = (data) => {
    const next = {
      id: Date.now(),
      number: `INV-${1000 + invoices.length + 1}`,
      ...data,
    };
    setInvoices([next, ...invoices]);
    setShowCreate(false);
  };

  const togglePaid = (id) => {
    setInvoices(
      invoices.map((inv) =>
        inv.id === id ? { ...inv, paid: !inv.paid } : inv
      )
    );
  };

  const deleteInvoice = (id) => {
    if (!window.confirm('Delete invoice? This cannot be undone in demo.')) return;
    setInvoices(invoices.filter((inv) => inv.id !== id));
  };

  const exportInvoice = (inv) => {
    const content = `
      <html>
        <head><title>Invoice ${inv.number}</title></head>
        <body>
          <h2>Pet Paws Clinic</h2>
          <h3>Invoice ${inv.number}</h3>
          <div>Client: ${inv.client}</div>
          <div>Pet: ${inv.pet}</div>
          <div>Date: ${inv.date}</div>
          <hr />
          <div>
            ${inv.items
              .map(
                (i) =>
                  `<div>${i.desc} - LKR ${i.price.toLocaleString()}</div>`
              )
              .join('')}
          </div>
          <hr />
          <h3>Total: LKR ${inv.total.toLocaleString()}</h3>
        </body>
      </html>
    `;
    const w = window.open('', '_blank');
    if (w) {
      w.document.write(content);
      w.document.close();
      w.print();
    } else {
      alert('Unable to open print window in this environment.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-800">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-teal-500 text-white rounded-lg flex items-center justify-center font-bold">
              PP
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-teal-700">
                Billing & Invoices
              </h1>
              <p className="text-sm text-gray-600">
                Create, view and export invoices
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by client, pet or invoice"
              className="px-3 py-2 border border-gray-200 rounded-md"
            />
            <button
              onClick={() => setShowCreate(true)}
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
            >
              New Invoice
            </button>
          </div>
        </header>

        <section className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="font-semibold text-gray-700 mb-3">
            Invoices ({invoices.length})
          </h3>
          <div className="divide-y">
            {invoices
              .filter(
                (inv) =>
                  inv.client.toLowerCase().includes(query.toLowerCase()) ||
                  inv.pet.toLowerCase().includes(query.toLowerCase()) ||
                  inv.number.toLowerCase().includes(query.toLowerCase())
              )
              .map((inv) => (
                <InvoiceRow
                  key={inv.id}
                  invoice={inv}
                  onView={(i) => setPreviewInvoice(i)}
                  onTogglePaid={togglePaid}
                  onDelete={deleteInvoice}
                />
              ))}
          </div>
        </section>

        {/* Create modal */}
        {showCreate && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-teal-700">
                  Create Invoice
                </h3>
                <button
                  onClick={() => setShowCreate(false)}
                  className="text-gray-500"
                >
                  Close
                </button>
              </div>
              <CreateInvoiceForm
                onCancel={() => setShowCreate(false)}
                onCreate={handleCreate}
              />
            </div>
          </div>
        )}

        {/* Preview modal */}
        {previewInvoice && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-teal-700">
                  Invoice {previewInvoice.number}
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => exportInvoice(previewInvoice)}
                    className="px-3 py-1 border rounded-md text-sm"
                  >
                    Print
                  </button>
                  <button
                    onClick={() => setPreviewInvoice(null)}
                    className="px-3 py-1 border rounded-md text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>

              <div className="text-sm text-gray-700">
                <div>
                  <strong>Client:</strong> {previewInvoice.client}
                </div>
                <div>
                  <strong>Pet:</strong> {previewInvoice.pet}
                </div>
                <div className="mt-3">
                  {previewInvoice.items.map((it, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between py-1 border-b"
                    >
                      <div>{it.desc}</div>
                      <div>LKR {it.price.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 font-semibold">
                  Total: LKR {previewInvoice.total.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500 text-center py-6">
          Pet Paws • Billing module — demo only. Integrate with payment gateway
          for real payments.
        </div>
      </div>
    </div>
  );
}

function CreateInvoiceForm({ onCancel, onCreate }) {
  const [client, setClient] = useState('');
  const [pet, setPet] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [items, setItems] = useState([{ desc: '', price: 0 }]);

  const updateItem = (idx, key, value) => {
    const copy = [...items];
    copy[idx][key] = key === 'price' ? Number(value) : value;
    setItems(copy);
  };

  const addItem = () => setItems([...items, { desc: '', price: 0 }]);
  const removeItem = (idx) =>
    setItems(items.filter((_, i) => i !== idx));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!client || !pet || items.length === 0)
      return alert('Please fill required fields');
    const total = items.reduce((s, it) => s + (it.price || 0), 0);
    onCreate({ client, pet, date, items, total, paid: false });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          value={client}
          onChange={(e) => setClient(e.target.value)}
          placeholder="Client name"
          className="border border-gray-200 rounded-md px-3 py-2"
          required
        />
        <input
          value={pet}
          onChange={(e) => setPet(e.target.value)}
          placeholder="Pet name"
          className="border border-gray-200 rounded-md px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="text-sm text-gray-600">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-200 rounded-md px-3 py-2 w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-600">Items</label>
        {items.map((it, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 sm:grid-cols-6 gap-2 items-center"
          >
            <input
              className="sm:col-span-4 border border-gray-200 rounded-md px-3 py-2"
              value={it.desc}
              onChange={(e) => updateItem(idx, 'desc', e.target.value)}
              placeholder="Description"
              required
            />
            <input
              className="sm:col-span-1 border border-gray-200 rounded-md px-3 py-2"
              type="number"
              value={it.price}
              onChange={(e) => updateItem(idx, 'price', e.target.value)}
              placeholder="Price"
              required
            />
            <div className="sm:col-span-1">
              <button
                type="button"
                onClick={() => removeItem(idx)}
                className="px-3 py-2 rounded-md bg-red-50 text-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div>
          <button
            type="button"
            onClick={addItem}
            className="px-3 py-2 rounded-md border"
          >
            Add item
          </button>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-2 rounded-md border"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-700"
        >
          Create Invoice
        </button>
      </div>
    </form>
  );
}
