"use client";

import { useState } from "react";

export default function ConfessPage() {
  const [confession, setConfession] = useState("");
  const [mood, setMood] = useState(5);
  const [shareToFeed, setShareToFeed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [miracle, setMiracle] = useState<string | null>(null);
  const [showCrisis, setShowCrisis] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confession.trim()) return;

    setIsSubmitting(true);
    setMiracle(null);
    setShowCrisis(false);

    try {
      const response = await fetch("/api/confess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          confession: confession.trim(),
          mood,
          shareToFeed,
        }),
      });

      const data = await response.json();

      if (data.crisis) {
        setShowCrisis(true);
      }

      if (data.miracle) {
        setMiracle(data.miracle);
      }

      if (response.ok) {
        setConfession("");
        setMood(5);
        setShareToFeed(false);
      }
    } catch (error) {
      console.error("Error submitting confession:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full space-y-8">
        
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold flame-text">Share Your Truth</h1>
          <p className="text-xl text-gray-400">
            100% anonymous. AI-powered transformation. Your darkest hour becomes your brightest day.
          </p>
        </div>

        {showCrisis && (
          <div className="bg-red-900/20 border-2 border-red-500 rounded-lg p-6 crisis-pulse">
            <h3 className="text-2xl font-bold text-red-400 mb-4">🆘 We're Here For You</h3>
            <p className="text-red-200 mb-4">
              You're not alone. Please reach out to a crisis counselor right now:
            </p>
            <div className="space-y-3">
              <a 
                href="tel:988" 
                className="block w-full py-3 px-6 bg-red-600 hover:bg-red-700 rounded-lg font-semibold text-center transition-colors"
              >
                📞 Call 988 - Suicide & Crisis Lifeline
              </a>
              <a 
                href="sms:741741" 
                className="block w-full py-3 px-6 bg-red-600 hover:bg-red-700 rounded-lg font-semibold text-center transition-colors"
              >
                💬 Text HOME to 741741 - Crisis Text Line
              </a>
            </div>
          </div>
        )}

        {miracle && (
          <div className="bg-gradient-to-br from-cyan-900/20 to-purple-900/20 border-2 border-purple-500 rounded-lg p-6 cosmic-glow">
            <h3 className="text-2xl font-bold flame-text mb-4">✨ Your Miracle</h3>
            <p className="text-lg text-gray-200 leading-relaxed whitespace-pre-wrap">{miracle}</p>
            {shareToFeed && (
              <p className="text-sm text-purple-400 mt-4">
                🌟 Shared to Miracle Feed - Your light is now visible to others
              </p>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              What's on your heart?
            </label>
            <textarea
              value={confession}
              onChange={(e) => setConfession(e.target.value)}
              placeholder="I'm struggling with..."
              className="w-full h-40 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              maxLength={2000}
              required
            />
            <p className="text-xs text-gray-500 mt-1">{confession.length}/2000 characters</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              How are you feeling? (1=worst, 10=best)
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={mood}
              onChange={(e) => setMood(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>😢 Worst</span>
              <span className="font-bold text-purple-400">{mood}/10</span>
              <span>😊 Best</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="shareToFeed"
              checked={shareToFeed}
              onChange={(e) => setShareToFeed(e.target.checked)}
              className="w-5 h-5 accent-purple-500 cursor-pointer"
            />
            <label htmlFor="shareToFeed" className="text-sm text-gray-300 cursor-pointer">
              Share my miracle to the public feed (still 100% anonymous)
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !confession.trim()}
            className="w-full py-4 dual-flame-gradient text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {isSubmitting ? "Transforming..." : "Transform My Confession ✨"}
          </button>
        </form>

        <div className="text-center text-xs text-gray-500 space-y-1">
          <p>🔒 100% Anonymous • Zero Data Retention • Encrypted</p>
          <p>Your confession is never stored with your identity</p>
        </div>
      </div>
    </div>
  );
}
