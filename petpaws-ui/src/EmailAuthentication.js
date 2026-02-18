import React, { useState, useEffect } from 'react';

// ==========================
// Pet Paws UI Components
// - Create Account (UI 3)
// - Email Authentication (UI 4)
// Theme: Final teal design (matches Home + Login)
// ==========================

export function PetPawsCreateAccount() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('Dog');
  const [petBreed, setPetBreed] = useState('');
  const [petAge, setPetAge] = useState('');
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!fullName.trim()) return 'Please enter your full name.';
    if (!email.trim()) return 'Please enter your email.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email.';
    if (!password) return 'Please enter a password.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    if (password !== confirm) return 'Passwords do not match.';
    if (!petName.trim()) return "Please enter your pet's name.";
    if (!terms) return 'You must accept the terms and conditions.';
    return '';
  };

  const handleCreate = (e) => {
    e.preventDefault();
    setError('');
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Account created for ${fullName} (${email}) — Pet: ${petName}`);
      setFullName('');
      setEmail('');
      setPhone('');
      setPassword('');
      setConfirm('');
      setPetName('');
      setPetType('Dog');
      setPetBreed('');
      setPetAge('');
      setTerms(false);
    }, 900);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-800 p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-8 py-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-extrabold text-teal-700 mb-2">Create your account</h2>
            <p className="text-sm text-gray-600 mb-6">
              Sign up to book appointments, view records and get personalized pet care.
            </p>

            {error && (
              <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleCreate}>
              <label className="block text-sm font-medium text-gray-700">Full name</label>
              <input
                className="mt-1 mb-3 w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
              />

              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                className="mt-1 mb-3 w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
              />

              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                className="mt-1 mb-3 w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(123) 456-7890"
              />

              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                className="mt-1 mb-3 w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Create a password"
              />

              <label className="block text-sm font-medium text-gray-700">Confirm password</label>
              <input
                className="mt-1 mb-3 w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                type="password"
                placeholder="Confirm your password"
              />

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Pet details</h4>
                <label className="block text-sm text-gray-600">Pet name</label>
                <input
                  className="mt-1 mb-3 w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  placeholder="Fluffy"
                />

                <label className="block text-sm text-gray-600">Pet type</label>
                <select
                  className="mt-1 mb-3 w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none"
                  value={petType}
                  onChange={(e) => setPetType(e.target.value)}
                >
                  <option>Dog</option>
                  <option>Cat</option>
                  <option>Bird</option>
                  <option>Other</option>
                </select>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-gray-600">Breed</label>
                    <input
                      className="mt-1 mb-3 w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none"
                      value={petBreed}
                      onChange={(e) => setPetBreed(e.target.value)}
                      placeholder="Labrador"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">Age</label>
                    <input
                      className="mt-1 mb-3 w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none"
                      value={petAge}
                      onChange={(e) => setPetAge(e.target.value)}
                      placeholder="2 years"
                    />
                  </div>
                </div>
              </div>

              <label className="inline-flex items-center mt-3">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={terms}
                  onChange={(e) => setTerms(e.target.checked)}
                />
                <span className="text-sm text-gray-600">
                  I agree to the{' '}
                  <a href="#terms" className="text-teal-600 underline">
                    terms &amp; privacy
                  </a>
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className={`mt-6 w-full py-2 rounded-md text-white font-semibold ${
                  loading ? 'bg-teal-300' : 'bg-teal-600 hover:bg-teal-700'
                }`}
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </form>
          </div>

          <div className="hidden lg:block bg-teal-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-teal-700 mb-3">Why join Pet Paws?</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Manage appointments & medical records</li>
              <li>• Get reminders for vaccinations</li>
              <li>• Quick access to prescriptions & pharmacy</li>
            </ul>

            <div className="mt-6">
              <img
                src="/assets/hero-pets.jpg"
                alt="happy pet"
                className="w-full h-40 object-cover rounded-md shadow-sm"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=800&q=60';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ------------------------------
// Email Authentication (UI 4)
// ------------------------------

export function PetPawsEmailAuth({ maskedEmail = 'pet.paw@gmail.com', onVerified }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [sent, setSent] = useState(true);

  useEffect(() => {
    let t;
    if (sent && seconds > 0) {
      t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    }
    return () => clearTimeout(t);
  }, [sent, seconds]);

  const handleVerify = (e) => {
    e.preventDefault();
    setError('');
    if (!/^[0-9]{4,6}$/.test(code)) {
      setError('Enter the verification code (4-6 digits).');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (typeof onVerified === 'function') onVerified();
      else alert('Email verified — demo');
    }, 800);
  };

  const handleResend = () => {
    setSent(true);
    setSeconds(60);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-8 py-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-teal-500 text-white rounded-xl flex items-center justify-center font-bold">PP</div>
            <div>
              <h3 className="text-lg font-semibold text-teal-700">Email verification</h3>
              <p className="text-sm text-gray-600">
                Enter the code sent to <strong>{maskedEmail}</strong>
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleVerify}>
            <label className="block text-sm font-medium text-gray-700">Verification code</label>
            <input
              type="text"
              inputMode="numeric"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))}
              className="mt-1 mb-4 w-full px-4 py-3 border border-gray-200 rounded-md text-lg tracking-widest text-center focus:ring-2 focus:ring-teal-400 focus:outline-none"
              placeholder="123456"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md text-white font-semibold ${
                loading ? 'bg-teal-300' : 'bg-teal-600 hover:bg-teal-700'
              }`}
            >
              {loading ? 'Verifying...' : 'Verify email'}
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600">
            {seconds > 0 ? (
              <div>
                Resend code in{' '}
                <span className="font-medium text-gray-800">{seconds}s</span>
              </div>
            ) : (
              <button
                onClick={handleResend}
                className="text-teal-600 font-medium hover:underline"
              >
                Resend code
              </button>
            )}
          </div>

          <div className="mt-4 text-center text-sm">
            <button
              onClick={() => alert('Change email clicked')}
              className="text-sm text-gray-600 hover:underline"
            >
              Change email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Preview Component
export default function Preview() {
  return <PetPawsEmailAuth maskedEmail={'pet.paw@gmail.com'} />;
}
