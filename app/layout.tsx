import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RYVYNN v8.0 - From Our Darkest Hours to Our Brightest Days',
  description: 'Privacy-first AI mental wellness platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        {/* Crisis Support Banner - Always Visible */}
        <div className="sticky top-0 z-50 bg-red-600 text-white py-2 px-4 text-center text-sm font-semibold">
          🆘 In Crisis? Call/Text 988 (Suicide & Crisis Lifeline) | Text HOME to 741741 (Crisis Text Line)
        </div>
        <main>{children}</main>
      </body>
    </html>
  );
}
