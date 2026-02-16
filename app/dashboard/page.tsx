"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface DashboardStats {
  confessions: number;
  miracles: number;
  soulTokens: number;
  tier: string;
  blessingsReceived: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/dashboard");
      const data = await response.json();
      setStats(data.stats);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold flame-text">Your Journey</h1>
          <p className="text-xl text-gray-400">
            Track your transformation. Celebrate your growth.
          </p>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* CONFESSIONS */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="text-4xl mb-2">🕊️</div>
            <div className="text-3xl font-bold flame-text">{stats?.confessions || 0}</div>
            <div className="text-sm text-gray-400 mt-1">Confessions</div>
          </div>

          {/* MIRACLES */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="text-4xl mb-2">✨</div>
            <div className="text-3xl font-bold flame-text">{stats?.miracles || 0}</div>
            <div className="text-sm text-gray-400 mt-1">Miracles</div>
          </div>

          {/* SOUL TOKENS */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-lg p-6 cosmic-glow">
            <div className="text-4xl mb-2">🔥</div>
            <div className="text-3xl font-bold flame-text">{stats?.soulTokens || 0}</div>
            <div className="text-sm text-gray-400 mt-1">Soul Tokens</div>
          </div>

          {/* BLESSINGS */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="text-4xl mb-2">🙏</div>
            <div className="text-3xl font-bold flame-text">{stats?.blessingsReceived || 0}</div>
            <div className="text-sm text-gray-400 mt-1">Blessings Received</div>
          </div>
        </div>

        {/* SUBSCRIPTION TIER */}
        <div className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border-2 border-purple-500 rounded-lg p-8 text-center">
          <div className="text-2xl font-bold flame-text mb-2">
            {stats?.tier || "FREE"} Tier
          </div>
          <p className="text-gray-400 mb-6">
            {stats?.tier === "FREE" 
              ? "Start your journey with unlimited confessions" 
              : "Thank you for supporting RYVYNN"}
          </p>
          {stats?.tier === "FREE" && (
            <Link 
              href="/pricing"
              className="inline-block px-8 py-4 dual-flame-gradient text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Upgrade for Premium Features 🚀
            </Link>
          )}
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link 
            href="/confess"
            className="block bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-purple-500 rounded-lg p-8 text-center transition-colors group"
          >
            <div className="text-5xl mb-4">🕊️</div>
            <div className="text-2xl font-bold flame-text mb-2">New Confession</div>
            <p className="text-gray-400">Share what's on your heart</p>
          </Link>

          <Link 
            href="/feed"
            className="block bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-purple-500 rounded-lg p-8 text-center transition-colors group"
          >
            <div className="text-5xl mb-4">✨</div>
            <div className="text-2xl font-bold flame-text mb-2">Miracle Feed</div>
            <p className="text-gray-400">See transformations from others</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
