'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ConfessPage() {
  const [confession, setConfession] = useState('');
  const [miracle, setMiracle] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCrisis, setShowCrisis] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMiracle('');
    setShowCrisis(false);

    try {
      const res = await fetch('/api/confess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confession }),
      });

      const data = await res.json();
      
      if (data.crisisDetected) {
        setShowCrisis(true);
      }
      
      setMiracle(data.miracle);
    } catch (error) {
      setMiracle('Error transforming your confession. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-cyan-400 hover:text-cyan-300 mb-8 inline-block">
          ← Back to Home
        </Link>

        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Share Your Confession
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          Anonymous. Private. Transformed into a miracle by AI.
        </p>

        {showCrisis && (
          <div className="bg-red-900/30 border-2 border-red-500 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-red-400 mb-4">🆘 We Detected Crisis Language</h2>
            <p className="text-white mb-6">
              You are not alone. Help is available 24/7:
            </p>
            <div className="space-y-3 text-lg">
              <p className="text-white">
                📞 <strong>988 Suicide & Crisis Lifeline</strong><br />
                <span className="text-gray-300">Call or text 988</span>
              </p>
              <p className="text-white">
                💬 <strong>Crisis Text Line</strong><br />
                <span className="text-gray-300">Text HOME to 741741</span>
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <textarea
              value={confession}
              onChange={(e) => setConfession(e.target.value)}
              placeholder="Write your confession here... Everything you share is anonymous and will never be stored."
              className="w-full h-64 px-6 py-4 bg-gray-900 border border-cyan-500/30 rounded-2xl text-white text-lg resize-none focus:outline-none focus:border-cyan-500 transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !confession.trim()}
            className="w-full py-4 dual-flame-gradient text-white text-xl font-bold rounded-full cosmic-glow hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? 'Transforming...' : 'Transform into Miracle 🔥'}
          </button>
        </form>

        {miracle && (
          <div className="mt-12 bg-gray-900 border border-purple-500/30 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-purple-400 mb-6">Your Miracle</h2>
            <p className="text-xl text-gray-200 leading-relaxed whitespace-pre-wrap">
              {miracle}
            </p>
            
            <div className="mt-8 pt-8 border-t border-gray-700">
              <Link 
                href="/feed"
                className="inline-block px-8 py-3 border border-cyan-500 text-cyan-400 rounded-full hover:bg-cyan-500/10 transition-colors"
              >
                View Miracles Feed →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
