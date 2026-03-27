"use client";
const events = [
  { year:"2019", label:"Google claims quantum supremacy (53 qubits)", status:"past" },
  { year:"2023", label:"IBM reaches 1,000+ qubit processor", status:"past" },
  { year:"2024", label:"Google Willow: 105 qubits, error correction milestone", status:"past" },
  { year:"2025", label:"NIST finalizes post-quantum cryptography standards", status:"past" },
  { year:"2026", label:"~1,000-2,000 noisy qubits. Bitcoin safe -- for now.", status:"now" },
  { year:"2028", label:"Bitcoin community begins quantum-resistant BIP proposals", status:"future" },
  { year:"2030", label:"WARNING: Quantum Event Horizon approaches", status:"warning" },
  { year:"2030-35", label:"Estimated window: ECDSA becomes breakable", status:"danger" },
  { year:"2035+", label:"Bitcoin hard fork to quantum-resistant signatures", status:"future" },
];

export default function QuantumTimeline() {
  const colors: Record<string,string> = { past:"#6b7280", now:"#F7931A", future:"#3b82f6", warning:"#eab308", danger:"#ef4444" };
  return (
    <section id="timeline" className="py-24 px-6 bg-[#0d0d0d]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">Quantum <span className="text-[#F7931A]">Timeline</span></h2>
          <p className="text-gray-400">The race between quantum computing and Bitcoin cryptography.</p>
        </div>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-gray-700 via-[#F7931A]/50 to-red-900" />
          <div className="space-y-8">
            {events.map((e,i) => (
              <div key={i} className="flex gap-6 items-start pl-4">
                <div className="relative z-10 w-16 text-right flex-shrink-0">
                  <span className="text-xs font-bold" style={{color:colors[e.status]}}>{e.year}</span>
                </div>
                <div className="w-3 h-3 rounded-full mt-1 flex-shrink-0 border-2" style={{backgroundColor:colors[e.status], borderColor:colors[e.status], boxShadow: e.status==="now" ? `0 0 12px ${colors[e.status]}` : "none"}} />
                <div className={`flex-1 pb-2 text-sm ${e.status==="danger"?"text-red-400 font-semibold":e.status==="warning"?"text-yellow-400":e.status==="now"?"text-[#F7931A] font-semibold":"text-gray-400"}`}>
                  {e.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 bg-[#111] border border-red-900/50 rounded-xl p-6">
          <h3 className="font-bold text-red-400 mb-2">The Quantum Event Horizon</h3>
          <p className="text-gray-400 text-sm">The point where the quantum threat timeline crosses the Bitcoin upgrade timeline. Charles Edwards (March 2026): "We are closer to that horizon than most people realize." Your address hygiene today determines your exposure when that day comes.</p>
        </div>
      </div>
    </section>
  );
}