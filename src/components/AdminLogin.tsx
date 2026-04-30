import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (res.ok) {
        window.location.href = '/admin';
      } else {
        setError('Unauthorized access. Invalid credentials.');
      }
    } catch (err) {
      setError('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#141414] flex flex-col items-center justify-center p-6 bg-noise">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-12">
          <div className="inline-flex p-4 rounded-full bg-[#1E3328] border border-[#B6915E]/20 mb-6">
            <Lock className="w-8 h-8 text-[#B6915E]" />
          </div>
          <h1 className="font-serif text-4xl text-[#F5F1EA] mb-2">Access Portal</h1>
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#B6915E]">Private Administration Area</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="password"
              placeholder="Secure Passphrase"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1E3328] border border-[#B6915E]/30 p-4 font-sans text-[#F5F1EA] focus:border-[#B6915E] outline-none transition-all placeholder:text-[#F5F1EA]/20 text-center text-lg tracking-[0.5em]"
              required
              autoFocus
            />
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-xs text-center font-sans uppercase tracking-widest bg-red-400/10 py-2 border border-red-400/20"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#B6915E] text-[#141414] p-4 font-sans font-bold uppercase tracking-[0.2em] hover:bg-[#A07D4F] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Validate Access'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-12 text-center">
          <a href="/" className="text-[10px] uppercase tracking-widest text-[#F5F1EA]/20 hover:text-[#B6915E] transition-colors">
            Return to Public Grounds
          </a>
        </div>
      </motion.div>
    </div>
  );
}
