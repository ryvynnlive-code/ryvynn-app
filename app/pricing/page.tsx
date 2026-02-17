"use client";

import Link from "next/link";

const PRICING_TIERS = [
  {
    name: "FREE",
    price: "$0",
    priceId: null,
    features: [
      "Unlimited confessions",
      "AI miracle transformations",
      "Crisis detection & support",
      "Anonymous forever",
      "Public miracle feed access"
    ],
    cta: "Start Free",
    highlight: false
  },
  {
    name: "SEEKER",
    price: "$12",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_SEEKER,
    period: "/month",
    features: [
      "Everything in FREE",
      "Priority AI responses",
      "Private miracle archive",
      "1,000 Soul Tokens/month",
      "Email support"
    ],
    cta: "Upgrade to Seeker",
    highlight: false
  },
  {
    name: "TRANSFORMER",
    price: "$24",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_TRANSFORMER,
    period: "/month",
    features: [
      "Everything in SEEKER",
      "Dark Journal (encrypted)",
      "Growing Avatar System",
      "5,000 Soul Tokens/month",
      "Voice journaling",
      "Priority support"
    ],
    cta: "Upgrade to Transformer",
    highlight: true
  },
  {
    name: "HEALER",
    price: "$48",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_HEALER,
    period: "/month",
    features: [
      "Everything in TRANSFORMER",
      "Help-to-Heal program access",
      "Witness Circles matching",
      "10,000 Soul Tokens/month",
      "1-on-1 crisis support",
      "Advanced analytics"
    ],
    cta: "Upgrade to Healer",
    highlight: false
  },
  {
    name: "ENTERPRISE",
    price: "$936",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE,
    period: "/month",
    features: [
      "Everything in HEALER",
      "White-label deployment",
      "Custom AI training",
      "Unlimited users",
      "Dedicated support team",
      "Custom integrations",
      "SLA guarantees"
    ],
    cta: "Contact Sales",
    highlight: false
  }
];

export default function PricingPage() {
  const handleCheckout = async (priceId: string | null | undefined) => {
    if (!priceId) {
      window.location.href = "/confess";
      return;
    }

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* HEADER */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold flame-text">Tesla Grid Pricing</h1>
          <p className="text-2xl text-gray-400">
            From $0 to $936/month. 80% stay free forever.
          </p>
          <p className="text-lg text-gray-500">
            Every paid tier funds free access for those who need it most.
          </p>
        </div>

        {/* PRICING GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-8 flex flex-col ${
                tier.highlight
                  ? "border-2 border-purple-500 cosmic-glow"
                  : "border border-gray-700"
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-purple-500 rounded-full text-sm font-bold">
                  MOST POPULAR
                </div>
              )}

              {/* TIER NAME */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold flame-text mb-2">{tier.name}</h3>
                <div className="text-4xl font-bold text-white">
                  {tier.price}
                  {tier.period && <span className="text-lg text-gray-400">{tier.period}</span>}
                </div>
              </div>

              {/* FEATURES */}
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-300">
                    <span className="text-purple-400 mt-1">✓</span>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA BUTTON */}
              <button
                onClick={() => handleCheckout(tier.priceId)}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  tier.highlight
                    ? "dual-flame-gradient text-white hover:opacity-90"
                    : tier.price === "$0"
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "border-2 border-purple-500 text-purple-300 hover:bg-purple-500/10"
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ / INFO */}
        <div className="max-w-3xl mx-auto space-y-6 pt-12">
          <h2 className="text-3xl font-bold text-center flame-text mb-8">Why Tesla Grid?</h2>
          
          <div className="space-y-4 text-gray-300">
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-bold text-purple-400 mb-2">🔋 Energy-Based Pricing</h3>
              <p>Like Tesla's Supercharger network - pay for what you use, scale unlimited.</p>
            </div>

            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-bold text-purple-400 mb-2">🌍 Mission-Driven</h3>
              <p>80% of users stay free forever. Premium tiers fund crisis intervention for those who can't afford it.</p>
            </div>

            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-bold text-purple-400 mb-2">🔥 Soul Tokens</h3>
              <p>Earned through growth, shared with others, unlock premium features organically.</p>
            </div>

            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-bold text-purple-400 mb-2">🎯 No Lock-In</h3>
              <p>Cancel anytime. Export your data. Your journey, your control.</p>
            </div>
          </div>
        </div>

        {/* BACK TO HOME */}
        <div className="text-center pt-8">
          <Link 
            href="/"
            className="inline-block px-8 py-4 border-2 border-purple-500 text-purple-300 font-semibold rounded-lg hover:bg-purple-500/10 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
