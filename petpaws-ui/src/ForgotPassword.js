import React, { useState } from 'react';

/* -------------------------
   Forgot Password Demo Flow (UI 5)
   - Step 1: User enters email and sends code
   - Step 2: Email Auth screen appears for code verification
   ------------------------- */

function ForgotPassword({ onSend }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    setError('');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setSending(true);
    const nextCode = Math.floor(100000 + Math.random() * 900000).toString();
    await new Promise((r) => setTimeout(r, 800));
    onSend(email, nextCode);
    setSending(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="px-8 py-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-teal-500 text-white rounded-xl flex items-center justify-center font-bold">PP</div>
            <div>
              <h3 className="text-lg font-semibold text-teal-700">Forgot password</h3>
              <p className="text-sm text-gray-600">Enter your email to receive a verification code.</p>
            </div>
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSend}>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 mb-4 w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-teal-400 focus:outline-none"
              placeholder="you@example.com"
              required
            />
            <button
              type="submit"
              disabled={sending}
              className={`w-full py-2 rounded-md text-white font-semibold ${
                sending ? 'bg-teal-300' : 'bg-teal-600 hover:bg-teal-700'
              }`}
            >
              {sending ? 'Sending...' : 'Send code'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function EmailAuth({ email, codeSent, onVerified }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    setError('');
    if (code !== codeSent) {
      setError('Incorrect code.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onVerified();
    }, 600);
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
                Enter the code sent to <strong>{email}</strong>
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
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="mt-1 mb-4 w-full px-4 py-3 border border-gray-200 rounded-md text-lg tracking-widest text-center focus:ring-2 focus:ring-teal-400 focus:outline-none"
              placeholder="123456"
              required
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

          <div className="mt-4 text-xs text-center text-gray-500">
            (preview) code sent: <span className="font-medium">{codeSent}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ForgotPasswordDemo() {
  const [stage, setStage] = useState('forgot');
  const [email, setEmail] = useState('');
  const [sentCode, setSentCode] = useState('');

  const handleSend = (userEmail, code) => {
    setEmail(userEmail);
    setSentCode(code);
    setStage('verify');
  };

  const handleVerified = () => {
    alert('Email verified — now allow password reset.');
    setStage('forgot');
  };

  return stage === 'forgot' ? (
    <ForgotPassword onSend={handleSend} />
  ) : (
    <EmailAuth email={email} codeSent={sentCode} onVerified={handleVerified} />
  );
}
