"use client";

import { useEffect, useState } from "react";

interface MiracleItem {
  id: string;
  content: string;
  blessings: number;
  createdAt: string;
}

export default function FeedPage() {
  const [miracles, setMiracles] = useState<MiracleItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMiracles();
  }, []);

  const fetchMiracles = async () => {
    try {
      const response = await fetch("/api/miracles");
      const data = await response.json();
      setMiracles(data.miracles || []);
    } catch (error) {
      console.error("Error fetching miracles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBless = async (miracleId: string) => {
    try {
      await fetch(`/api/miracles/${miracleId}/bless`, {
        method: "POST",
      });
      // Refresh miracles to show updated blessing count
      fetchMiracles();
    } catch (error) {
      console.error("Error blessing miracle:", error);
    }
  };

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold flame-text">Miracle Feed</h1>
          <p className="text-xl text-gray-400">
            Real struggles. Real transformations. Real hope.
          </p>
        </div>

        {/* LOADING STATE */}
        {isLoading && (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 mt-4">Loading miracles...</p>
          </div>
        )}

        {/* EMPTY STATE */}
        {!isLoading && miracles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400 mb-6">No miracles yet. Be the first!</p>
            <a 
              href="/confess" 
              className="inline-block px-8 py-4 dual-flame-gradient text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Share Your Truth ✨
            </a>
          </div>
        )}

        {/* MIRACLE CARDS */}
        {!isLoading && miracles.length > 0 && (
          <div className="space-y-6">
            {miracles.map((miracle) => (
              <div 
                key={miracle.id}
                className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-lg p-6 hover:border-purple-500 transition-colors"
              >
                <p className="text-lg text-gray-200 leading-relaxed whitespace-pre-wrap mb-4">
                  {miracle.content}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>{new Date(miracle.createdAt).toLocaleDateString()}</span>
                  
                  <button
                    onClick={() => handleBless(miracle.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-900/30 hover:bg-purple-900/50 transition-colors text-purple-300 font-medium"
                  >
                    ✨ Bless ({miracle.blessings})
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center pt-8">
          <a 
            href="/confess" 
            className="inline-block px-8 py-4 dual-flame-gradient text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Add Your Miracle ✨
          </a>
        </div>
      </div>
    </div>
  );
}
