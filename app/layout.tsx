import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RYVYNN - From Our Darkest Hours to Our Brightest Days",
  description: "Privacy-first AI mental wellness platform transforming confessions into miracles",
  keywords: ["mental health", "crisis support", "AI therapy", "anonymous", "privacy-first"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white min-h-screen">
        {/* CRISIS SUPPORT BANNER - ALWAYS VISIBLE */}
        <div className="sticky top-0 z-50 bg-red-600 text-white py-3 px-4 text-center">
          <div className="max-w-6xl mx-auto flex items-center justify-center gap-6 flex-wrap text-sm font-semibold">
            <span>🆘 In Crisis?</span>
            <a href="tel:988" className="hover:underline">📞 Call/Text 988 (Suicide & Crisis Lifeline)</a>
            <a href="sms:741741" className="hover:underline">💬 Text HOME to 741741 (Crisis Text Line)</a>
          </div>
        </div>
        <div className="pt-2">
          {children}
        </div>
      </body>
    </html>
  );
}
