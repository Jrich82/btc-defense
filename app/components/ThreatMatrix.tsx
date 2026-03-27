"use client";
const threats = [
  { title:"Quantum Computing", level:"CRITICAL", color:"#ef4444", desc:"Shor's algorithm can derive private keys from exposed public keys. ~4,000 logical qubits needed. Estimated threat window: 2030-2035.", icon:"[QC]" },
  { title:"Address Reuse", level:"HIGH", color:"#f97316", desc:"Spending from an address exposes your public key on-chain. Any reused address is permanently vulnerable to future quantum attacks.", icon:"[AR]" },
  { title:"Custodial Risk", level:"CRITICAL", color:"#ef4444", desc:"Exchanges hold your keys. Hacks, insolvency, and regulatory seizure can wipe your holdings overnight. Not your keys, not your Bitcoin.", icon:"[CR]" },
  { title:"Seed Exposure", level:"HIGH", color:"#f97316", desc:"Digital seed phrase copies (photos, cloud, email) are catastrophic. Single-location backups are single points of failure.", icon:"[SE]" },
  { title:"Supply Chain Attack", level:"MEDIUM", color:"#eab308", desc:"Tampered hardware wallets shipped pre-compromised. Always buy direct from manufacturers and verify firmware hashes.", icon:"[SC]" },
  { title:"Physical Coercion", level:"MEDIUM", color:"#eab308", desc:"The $5 wrench attack. If people know you hold Bitcoin, you become a target. OpSec and plausible deniability are essential.", icon:"[PC]" },
];

export default function ThreatMatrix() {
  return (
    <section id="threats" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black mb-4">Threat Matrix</h2>
        <p className="text-gray-400 max-w-xl mx-auto">Every vector that threatens your Bitcoin. Know the enemy.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {threats.map(t => (
          <div key={t.title} className="bg-[#111] border border-gray-800 hover:border-[#F7931A]/50 rounded-xl p-6 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <span className="text-xs font-mono text-gray-600">{t.icon}</span>
              <span className="text-xs font-bold px-2 py-1 rounded" style={{color:t.color, border:`1px solid ${t.color}40`, background:`${t.color}10`}}>{t.level}</span>
            </div>
            <h3 className="font-bold text-lg mb-2 group-hover:text-[#F7931A] transition-colors">{t.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{t.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}