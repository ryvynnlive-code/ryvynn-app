import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* HERO */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 dual-flame-gradient opacity-10"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-24 text-center">
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            RYVYNN
          </h1>
          <p className="text-3xl mb-4 text-cyan-300">
            From Our Darkest Hours
          </p>
          <p className="text-3xl mb-12 text-purple-400">
            to Our Brightest Days
          </p>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            Privacy-first AI mental wellness. Transform your confessions into miracles.
            <span className="block mt-4 text-cyan-400 font-semibold">
              🔥 100% Anonymous • Zero Surveillance • Encrypted
            </span>
          </p>

          <Link 
            href="/confess"
            className="inline-block px-12 py-4 dual-flame-gradient text-white text-xl font-bold rounded-full cosmic-glow hover:scale-105 transition-transform"
          >
            Share Your Confession
          </Link>
        </div>
      </div>

      {/* FEATURES */}
      <div className="max-w-6xl mx-auto px-4 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-900 p-8 rounded-2xl border border-cyan-500/20">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">🔥 Dual Flame AI</h3>
            <p className="text-gray-300">
              Our AI transforms your darkest confessions into miracles of hope and healing.
            </p>
          </div>
          
          <div className="bg-gray-900 p-8 rounded-2xl border border-purple-500/20">
            <h3 className="text-2xl font-bold text-purple-400 mb-4">🛡️ Total Privacy</h3>
            <p className="text-gray-300">
              Zero data collection. No tracking. Your confessions vanish after transformation.
            </p>
          </div>
          
          <div className="bg-gray-900 p-8 rounded-2xl border border-cyan-500/20">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">🌟 Anonymous</h3>
            <p className="text-gray-300">
              No accounts required. No emails. Just you and the AI, nothing more.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="text-4xl font-bold mb-6 text-white">
          Ready to Transform Your Darkness?
        </h2>
        <p className="text-xl text-gray-400 mb-8">
          Your confession becomes a miracle. Your pain becomes power.
        </p>
        <Link 
          href="/feed"
          className="inline-block px-8 py-3 border border-purple-500 text-purple-400 rounded-full hover:bg-purple-500/10 transition-colors mr-4"
        >
          View Miracles Feed
        </Link>
      </div>
    </div>
  );
}
