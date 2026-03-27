"use client";
import { useState } from "react";
import { Bell } from "lucide-react";

export default function Updates() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section id="updates" className="py-24 px-6 max-w-2xl mx-auto text-center">
      <Bell className="w-12 h-12 text-[#F7931A] mx-auto mb-6" />
      <h2 className="text-4xl font-black mb-4">Stay <span className="text-[#F7931A]">Ahead</span></h2>
      <p className="text-gray-400 mb-8">Get alerts when quantum milestones are reached, new Bitcoin vulnerabilities are discovered, or urgent OpSec threats emerge. No spam. Only signal.</p>
      {done ? (
        <div className="bg-[#F7931A]/10 border border-[#F7931A]/30 rounded-xl p-6 text-[#F7931A] font-semibold">
          ? You're on the list. We'll alert you when it matters.
        </div>
      ) : (
        <div className="flex gap-3">
          <input value={email} onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 bg-[#111] border border-gray-700 focus:border-[#F7931A] rounded-lg px-4 py-3 text-sm outline-none transition-colors" />
          <button onClick={() => email && setDone(true)}
            className="bg-[#F7931A] hover:bg-[#d4780f] text-black font-bold px-6 py-3 rounded-lg transition-colors">
            Alert Me
          </button>
        </div>
      )}
    </section>
  );
}
