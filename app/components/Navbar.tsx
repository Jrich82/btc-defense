"use client";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = ["Threats","Timeline","Defense","Auditor","Updates"];
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/90 backdrop-blur border-b border-[#F7931A]/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="text-[#F7931A] w-6 h-6" />
          <span className="font-bold text-lg tracking-tight">Bitcoin <span className="text-[#F7931A]">Defense</span></span>
        </div>
        <div className="hidden md:flex gap-8 text-sm text-gray-400">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-[#F7931A] transition-colors">{l}</a>
          ))}
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-gray-400">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-[#F7931A]/20 px-6 py-4 flex flex-col gap-4 text-sm text-gray-400">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} className="hover:text-[#F7931A]">{l}</a>
          ))}
        </div>
      )}
    </nav>
  );
}
