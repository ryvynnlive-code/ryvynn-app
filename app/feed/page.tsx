import Link from 'next/link';

async function getMiracles() {
  // In production, fetch from database
  // For now, return demo data
  return [
    {
      id: '1',
      miracle: 'From the ashes of your pain rises a Phoenix of strength. Your vulnerability today becomes tomorrow\'s wisdom that heals not just you, but countless others walking similar paths.',
      blessings: 142,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      miracle: 'The darkness you\'ve endured has carved depth into your soul. This depth is your superpower - it allows you to understand suffering and transform it into compassion that lights the way for others.',
      blessings: 98,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
  ];
}

export default async function FeedPage() {
  const miracles = await getMiracles();

  return (
    <div className="min-h-screen bg-black px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-cyan-400 hover:text-cyan-300 mb-8 inline-block">
          ← Back to Home
        </Link>

        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Miracles Feed
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          Confessions transformed into hope. Anonymous miracles from real people.
        </p>

        <div className="space-y-6">
          {miracles.map((miracle) => (
            <div 
              key={miracle.id}
              className="bg-gray-900 border border-purple-500/20 rounded-2xl p-8 hover:border-purple-500/40 transition-colors"
            >
              <p className="text-xl text-gray-200 leading-relaxed mb-6">
                {miracle.miracle}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>🔥 {miracle.blessings} blessings</span>
                <span>{new Date(miracle.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link 
            href="/confess"
            className="inline-block px-12 py-4 dual-flame-gradient text-white text-xl font-bold rounded-full cosmic-glow hover:scale-105 transition-transform"
          >
            Share Your Confession
          </Link>
        </div>
      </div>
    </div>
  );
}
