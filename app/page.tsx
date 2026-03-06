export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Dual Flame Logo */}
        <div className="flex justify-center gap-4 text-6xl">
          <span className="text-orange-500">🔥</span>
          <span className="text-purple-500">🔥</span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
          RYVYNN v8.0 NEXXT GEN
        </h1>

        {/* Tagline */}
        <p className="text-2xl md:text-3xl text-gray-300 font-light">
          From Our Darkest Hours to Our Brightest Days
        </p>

        {/* Description */}
        <div className="max-w-2xl mx-auto space-y-4 text-gray-400">
          <p className="text-lg">
            Zero-surveillance AI mental wellness platform transforming confessions into miracles.
          </p>
          <p className="text-base">
            Built with privacy-first architecture, crisis detection, and compassionate AI.
          </p>
        </div>

        {/* Status */}
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6 max-w-md mx-auto">
          <h2 className="text-green-400 font-semibold mb-2">✅ Deployment Successful</h2>
          <p className="text-sm text-gray-400">
            RYVYNN v8.0 NEXXT GEN is now live on Vercel.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Build Date: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto text-left">
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
            <div className="text-2xl mb-2">🔐</div>
            <h3 className="font-semibold text-white mb-1">Privacy First</h3>
            <p className="text-sm text-gray-400">
              Zero surveillance. Your data, your control.
            </p>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
            <div className="text-2xl mb-2">🛡️</div>
            <h3 className="font-semibold text-white mb-1">Crisis Detection</h3>
            <p className="text-sm text-gray-400">
              Four-layer safety system with 988 integration.
            </p>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
            <div className="text-2xl mb-2">✨</div>
            <h3 className="font-semibold text-white mb-1">AI Companion</h3>
            <p className="text-sm text-gray-400">
              Context-aware responses powered by Claude.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-gray-500 text-sm">
          <p>By AONIXX / NEXXT GEN INNOVATIONS LLC</p>
          <p className="mt-2">Target: 10 Million Lives Saved by 2030</p>
        </div>
      </div>
    </div>
  );
}
