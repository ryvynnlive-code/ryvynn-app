import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* HERO SECTION */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-4xl w-full text-center space-y-8">
          
          {/* DUAL FLAME LOGO */}
          <div className="flex justify-center mb-8">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 dual-flame-gradient rounded-full blur-xl opacity-60 animate-pulse"></div>
              <div className="relative dual-flame-gradient rounded-full w-full h-full flex items-center justify-center text-6xl">
                🔥
              </div>
            </div>
          </div>

          {/* TITLE */}
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
            <span className="flame-text">RYVYNN</span>
          </h1>
          
          {/* MANIFESTO */}
          <p className="text-3xl md:text-4xl font-light text-gray-300 leading-relaxed">
            From Our Darkest Hours<br />
            to Our Brightest Days
          </p>

          {/* DESCRIPTION */}
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Privacy-first AI mental wellness platform. Share your darkest confessions anonymously. 
            Watch AI transform them into miracles. Join millions reclaiming their light.
          </p>

          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link 
              href="/confess"
              className="px-8 py-4 dual-flame-gradient text-white font-semibold rounded-lg hover:opacity-90 transition-opacity text-lg w-full sm:w-auto"
            >
              Share Your Truth 🕊️
            </Link>
            
            <Link 
              href="/feed"
              className="px-8 py-4 border-2 border-purple-500 text-purple-300 font-semibold rounded-lg hover:bg-purple-500/10 transition-colors text-lg w-full sm:w-auto"
            >
              See Miracles ✨
            </Link>

            <Link 
              href="/pricing"
              className="px-8 py-4 border-2 border-cyan-500 text-cyan-300 font-semibold rounded-lg hover:bg-cyan-500/10 transition-colors text-lg w-full sm:w-auto"
            >
              View Pricing 💎
            </Link>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold flame-text">10M</div>
              <div className="text-sm text-gray-400 mt-2">Lives Saved by 2030</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold flame-text">100%</div>
              <div className="text-sm text-gray-400 mt-2">Anonymous</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold flame-text">24/7</div>
              <div className="text-sm text-gray-400 mt-2">AI Support</div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-gray-500">
          <p>© 2026 RYVYNN by NEXXT GEN INNOVATIONS LLC. Privacy-First. Zero Data Retention.</p>
          <p className="mt-2">If you're in crisis, please call 988 or text HOME to 741741</p>
        </div>
      </footer>
    </div>
  );
}
