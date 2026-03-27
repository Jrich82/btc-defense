import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bitcoin Defense | Protect Your Bitcoin",
  description: "Advanced Bitcoin security intelligence. Protect your holdings from quantum threats, key exposure, and all attack vectors.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-gray-100 antialiased">{children}</body>
    </html>
  );
}
