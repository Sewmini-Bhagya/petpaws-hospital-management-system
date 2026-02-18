import React, { useState } from 'react';

export default function PetPawsReports() {
  const [range, setRange] = useState('30'); // days

  // mock metrics
  const metrics = {
    visits: 342,
    revenue: 8740000, // in LKR
    newPatients: 48,
    avgSatisfaction: 4.7,
  };

  // mock timeseries (last N days)
  const timeseries = [...Array(30)].map((_, i) => ({
    day: i + 1,
    visits: Math.max(5, Math.round(8 + Math.sin(i / 3) * 6 + Math.random() * 6)),
  }));

  const services = [
    { name: 'Vaccination', count: 102 },
    { name: 'Check-up', count: 86 },
    { name: 'Surgery', count: 28 },
    { name: 'Dental', count: 46 },
    { name: 'Grooming', count: 80 },
  ];

  const vets = [
    { name: 'Dr. Blake', patients: 120, rating: 4.9 },
    { name: 'Dr. Liana', patients: 98, rating: 4.7 },
    { name: 'Dr. Carter', patients: 75, rating: 4.6 },
  ];

  // simple helpers
  const maxVisits = Math.max(...timeseries.map((t) => t.visits));
  const chartPoints = timeseries
    .map((t, idx) => {
      const x = (idx / (timeseries.length - 1)) * 100;
      const y = 100 - (t.visits / maxVisits) * 100;
      return `${x},${y}`;
    })
    .join(' ');

  const formatLKR = (value) => `LKR ${value.toLocaleString()}`;

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-800">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-teal-500 text-white rounded-lg flex items-center justify-center font-bold">
              PP
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-teal-700">
                Reports & Analytics
              </h1>
              <p className="text-sm text-gray-600">
                Overview of clinic performance and trends
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-md"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
            <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">
              Export CSV
            </button>
          </div>
        </header>

        {/* KPI Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-sm text-gray-500">Total visits</div>
            <div className="mt-2 text-2xl font-semibold text-teal-700">
              {metrics.visits}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Compared to previous period +6%
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-sm text-gray-500">Revenue</div>
            <div className="mt-2 text-2xl font-semibold text-teal-700">
              {formatLKR(metrics.revenue)}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Payments received via card & cash
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-sm text-gray-500">New patients</div>
            <div className="mt-2 text-2xl font-semibold text-teal-700">
              {metrics.newPatients}
            </div>
            <div className="text-xs text-gray-400 mt-1">Signups & walk-ins</div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-sm text-gray-500">Avg. satisfaction</div>
            <div className="mt-2 text-2xl font-semibold text-teal-700">
              {metrics.avgSatisfaction} ★
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Based on last {range} days
            </div>
          </div>
        </section>

        {/* Charts */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-700">Appointments trend</h3>
              <div className="text-sm text-gray-500">Visits per day</div>
            </div>

            <div className="mt-4">
              <div className="w-full h-56 bg-gray-50 rounded-md p-3">
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="w-full h-full"
                >
                  <polyline
                    fill="none"
                    stroke="#0d9488"
                    strokeWidth="1.5"
                    points={chartPoints}
                  />
                </svg>
              </div>

              <div className="mt-3 text-xs text-gray-500">
                (mock data for visualization)
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-700">Services breakdown</h3>
            <div className="mt-4 space-y-3">
              {services.map((s) => {
                const total = services.reduce((a, b) => a + b.count, 0);
                const pct = Math.round((s.count / total) * 100);
                return (
                  <div key={s.name}>
                    <div className="flex items-center justify-between text-sm text-gray-700">
                      <div>{s.name}</div>
                      <div className="text-xs text-gray-500">{s.count}</div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 mt-2 overflow-hidden">
                      <div
                        style={{ width: `${pct}%` }}
                        className="h-2 bg-teal-600"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Top vets table */}
        <section className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-gray-700">Top vets</h3>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-xs text-gray-500">
                  <th className="py-2">Vet</th>
                  <th className="py-2">Patients</th>
                  <th className="py-2">Rating</th>
                </tr>
              </thead>
              <tbody>
                {vets.map((v) => (
                  <tr key={v.name} className="border-t">
                    <td className="py-3 font-medium text-gray-800">{v.name}</td>
                    <td className="py-3 text-gray-600">{v.patients}</td>
                    <td className="py-3 text-gray-600">{v.rating} ★</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="text-xs text-gray-500 text-center py-6">
          Pet Paws • Reports & Analytics — replace mock data with real metrics and APIs.
        </div>
      </div>
    </div>
  );
}
