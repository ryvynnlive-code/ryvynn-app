import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RYVYNN - From Our Darkest Hours to Our Brightest Days",
  description: "Privacy-first AI mental wellness platform. Anonymous. Encrypted. No surveillance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white">
        {/* CRISIS BANNER - ALWAYS VISIBLE */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white py-2 px-4 text-center text-sm font-semibold">
          🆘 Crisis? Call 988 (Suicide & Crisis Lifeline) or text 741741 (Crisis Text Line)
        </div>
        <div className="pt-12">
          {children}
        </div>
      </body>
    </html>
  );
}
