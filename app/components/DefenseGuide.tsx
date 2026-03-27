"use client";
import { useState } from "react";

const tabs = [
  { id:"storage", label:"Cold Storage", content: {
    title:"Cold Storage Architecture",
    items:[
      { tier:"Hot Wallet", desc:"Daily use only. Software wallet on phone or desktop. Less than 1% of holdings." },
      { tier:"Warm Wallet", desc:"Hardware wallet (Coldcard or Foundation Passport). Passphrase-protected. Air-gapped signing." },
      { tier:"Cold Vault", desc:"2-of-3 Multisig. Keys split across: Coldcard + Trezor + Metal seed backup. 3 geographic locations." },
      { tier:"Inheritance", desc:"Documented recovery instructions (encrypted). Trusted party holds 1 key. Shamir Secret Sharing optional." },
    ]
  }},
  { id:"utxo", label:"UTXO Hygiene", content: {
    title:"UTXO and Address Hygiene",
    items:[
      { tier:"Rule 1", desc:"Never reuse a Bitcoin address. Ever. One address, one receive." },
      { tier:"Rule 2", desc:"After spending from an address, move all remaining funds to a fresh address immediately." },
      { tier:"Rule 3", desc:"Use native SegWit (bc1q) or Taproot (bc1p) addresses -- never legacy P2PK." },
      { tier:"Rule 4", desc:"Use coin control to avoid merging UTXOs from different sources (privacy and security)." },
    ]
  }},
  { id:"opsec", label:"OpSec", content: {
    title:"Operational Security",
    items:[
      { tier:"Identity", desc:"Never publicly disclose Bitcoin holdings. Use pseudonyms for crypto activity." },
      { tier:"Hardware", desc:"Buy hardware wallets only from official manufacturer sites. Verify firmware hashes before use." },
      { tier:"Coercion", desc:"Maintain a plausible deniability wallet with a small decoy balance." },
      { tier:"Digital", desc:"No seed phrase photos. No cloud backups. No email. Metal backup only." },
    ]
  }},
  { id:"quantum", label:"Quantum Migration", content: {
    title:"Quantum Migration Plan",
    items:[
      { tier:"Phase 1 -- NOW", desc:"Audit all addresses. Move any P2PK or reused address funds to fresh bech32 (bc1q) addresses." },
      { tier:"Phase 2 -- 2026-28", desc:"Set up multisig cold storage. Monitor NIST post-quantum standards. Track Bitcoin BIPs." },
      { tier:"Phase 3 -- 2028-30", desc:"Have a tested migration path ready before the community scramble. Early movers win." },
      { tier:"Phase 4 -- Fork Day", desc:"Move to quantum-resistant addresses the moment Bitcoin hard fork activates. Do not wait." },
    ]
  }},
];

export default function DefenseGuide() {
  const [active, setActive] = useState("storage");
  const tab = tabs.find(t => t.id === active)!;
  return (
    <section id="defense" className="py-24 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black mb-4">Defense <span className="text-[#F7931A]">Guide</span></h2>
        <p className="text-gray-400">The playbook for protecting your Bitcoin at every layer.</p>
      </div>
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActive(t.id)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${active===t.id ? "bg-[#F7931A] text-black" : "bg-[#111] text-gray-400 hover:text-[#F7931A] border border-gray-800"}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="bg-[#111] border border-gray-800 rounded-xl p-8">
        <h3 className="text-xl font-bold mb-6 text-[#F7931A]">{tab.content.title}</h3>
        <div className="space-y-4">
          {tab.content.items.map((item,i) => (
            <div key={i} className="flex gap-4 items-start border-b border-gray-800 pb-4 last:border-0 last:pb-0">
              <span className="text-sm font-bold text-[#F7931A] min-w-[140px] flex-shrink-0">{item.tier}</span>
              <span className="text-gray-300 text-sm">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}