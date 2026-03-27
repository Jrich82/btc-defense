import { Shield } from "lucide-react";
export default function Footer() {
  return (
    <footer className="border-t border-gray-900 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#F7931A]" />
          <span className="font-bold text-gray-400">Bitcoin <span className="text-[#F7931A]">Defense</span></span>
        </div>
        <div className="text-center">Not financial advice. Protect your keys. Verify everything.</div>
        <div className="text-[#F7931A]/50">Not your keys, not your Bitcoin.</div>
      </div>
    </footer>
  );
}
