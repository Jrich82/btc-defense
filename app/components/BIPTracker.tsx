"use client";
import { useState } from "react";

const BIPS = [
  {
    number: "360",
    title: "Pay-to-Quantum-Resistant Hash",
    status: "testnet",
    statusLabel: "Live on Testnet",
    category: "post-quantum",
    risk: "critical",
    summary: "Introduces quantum-resistant address format (bc1z). Uses Merkle tree to support multiple post-quantum signature schemes simultaneously — SPHINCS+, FALCON, and ECDSA. The single most important upgrade for Bitcoin's long-term survival.",
    why: "A sufficiently powerful quantum computer could derive private keys from exposed public keys. BIP 360 is the fix.",
    action: "Watch BTQ testnet progress. Migrate coins when mainnet activates.",
    link: "https://github.com/bitcoin/bips/blob/master/bip-0360.mediawiki",
  },
  {
    number: "352",
    title: "Silent Payments",
    status: "active",
    statusLabel: "Live on Mainnet",
    category: "privacy",
    risk: "high",
    summary: "Send Bitcoin to someone without address reuse or coordination. Every payment generates a unique address for the receiver — no interaction required. Growing wallet support (Cake Wallet, Sparrow).",
    why: "Address reuse is one of the biggest privacy and security mistakes Bitcoiners make. Silent Payments eliminates it by design.",
    action: "Use a wallet that supports Silent Payments. Stop giving out the same address twice.",
    link: "https://github.com/bitcoin/bips/blob/master/bip-0352.mediawiki",
  },
  {
    number: "340",
    title: "Schnorr Signatures",
    status: "active",
    statusLabel: "Live on Mainnet",
    category: "foundation",
    risk: "foundational",
    summary: "Replaces ECDSA with Schnorr signatures — smaller, faster, and enables key aggregation. The cryptographic foundation for Taproot and everything that comes after, including BIP 360.",
    why: "Schnorr enables multisig that looks like single-sig on-chain — massive privacy and efficiency win. BIP 360 builds on top of it.",
    action: "Use Taproot addresses (bc1p). Understand what you're using.",
    link: "https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki",
  },
  {
    number: "341",
    title: "Taproot",
    status: "active",
    statusLabel: "Live on Mainnet",
    category: "foundation",
    risk: "foundational",
    summary: "Merges pay-to-pubkey and pay-to-script into a single output type. Complex scripts look identical to simple payments on-chain. Activated November 2021 at block 709,632.",
    why: "Taproot (bc1p) exposes your public key from the moment you receive — important quantum context. But it's the foundation for BIP 360.",
    action: "Understand the public key exposure tradeoff. BIP 360 will build on Taproot's infrastructure.",
    link: "https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki",
  },
  {
    number: "85",
    title: "Deterministic Entropy From BIP32 Keychains",
    status: "active",
    statusLabel: "Live on Mainnet",
    category: "custody",
    risk: "high",
    summary: "Derive multiple child seeds from one master seed. One backup rules them all. Coldcard supports it natively — generate wallet seeds, WIF keys, and more from a single root.",
    why: "Most people have multiple wallets with multiple backups — a security nightmare. BIP 85 reduces that to one master seed.",
    action: "If you use Coldcard, explore BIP 85 in the Advanced menu. One seed, infinite wallets.",
    link: "https://github.com/bitcoin/bips/blob/master/bip-0085.mediawiki",
  },
  {
    number: "39",
    title: "Mnemonic Seed Phrases",
    status: "active",
    statusLabel: "Live on Mainnet",
    category: "custody",
    risk: "foundational",
    summary: "The 12 or 24 words that back up your wallet. Encodes entropy into human-readable words from a 2048-word list. Almost every Bitcoin wallet uses this standard.",
    why: "Your seed phrase IS your Bitcoin. Most people don't understand the entropy behind it, how passphrases work, or why metal backup matters.",
    action: "Use 24 words. Add a passphrase. Back up to metal. Never store digitally.",
    link: "https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki",
  },
  {
    number: "329",
    title: "Wallet Label Export Format",
    status: "active",
    statusLabel: "Live on Mainnet",
    category: "custody",
    risk: "medium",
    summary: "Standardizes how wallets export transaction labels and UTXO metadata. Lets you move your labels between wallets without losing context. Very new — low adoption but growing.",
    why: "UTXO management and coin control require knowing where your coins came from. Without labels, you're flying blind.",
    action: "Label every UTXO in your wallet. Use wallets that support BIP 329 export.",
    link: "https://github.com/bitcoin/bips/blob/master/bip-0329.mediawiki",
  },
  {
    number: "158",
    title: "Compact Block Filters (Neutrino)",
    status: "active",
    statusLabel: "Live on Mainnet",
    category: "privacy",
    risk: "high",
    summary: "Lets light wallets verify transactions privately without trusting a server or running a full node. The privacy foundation for mobile Bitcoin wallets. Used by Lightning Network nodes.",
    why: "Most mobile wallets leak your addresses to third-party servers. Neutrino lets you verify without revealing which addresses you're watching.",
    action: "Use wallets that support BIP 158 (e.g. Breez, Phoenix for Lightning). Run your own node if possible.",
    link: "https://github.com/bitcoin/bips/blob/master/bip-0158.mediawiki",
  },
  {
    number: "119",
    title: "CheckTemplateVerify (CTV)",
    status: "proposed",
    statusLabel: "Proposed — Not Activated",
    category: "network",
    risk: "medium",
    summary: "Enables covenants — Bitcoin outputs that restrict how they can be spent. Enables vaults, congestion control, and complex smart contracts. Highly controversial. Debated for years without activation.",
    why: "CTV is a window into how Bitcoin upgrades (or doesn't) happen. Understanding it teaches you Bitcoin governance, miner politics, and the activation debate.",
    action: "Read the debate. Understand both sides. Form an opinion.",
    link: "https://github.com/bitcoin/bips/blob/master/bip-0119.mediawiki",
  },
];

const CATEGORIES = ["all", "post-quantum", "privacy", "custody", "foundation", "network"];
const RISK_COLORS: Record<string, string> = {
  critical: "bg-red-500/20 text-red-400 border-red-500/30",
  high: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  foundational: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};
const STATUS_COLORS: Record<string, string> = {
  testnet: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  active: "bg-green-500/20 text-green-400 border-green-500/30",
  proposed: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

export default function BIPTracker() {
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = filter === "all" ? BIPS : BIPS.filter(b => b.category === filter);

  return (
    <section id="bips" className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-[#F7931A]/10 border border-[#F7931A]/30 rounded-full px-4 py-2 text-sm text-[#F7931A] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#F7931A] inline-block" />
            Plain-English BIP Intelligence
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            <span className="text-[#F7931A]">BIP</span> Tracker
          </h2>
          <p className="text-gray-400 max-w-2xl">
            Every Bitcoin Improvement Proposal that matters for security, privacy, and long-term survival — translated into plain English. No PhD required.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono border transition-all ${
                filter === cat
                  ? "bg-[#F7931A] text-black border-[#F7931A] font-bold"
                  : "border-[#F7931A]/20 text-gray-400 hover:border-[#F7931A]/50 hover:text-[#F7931A]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* BIP Cards */}
        <div className="flex flex-col gap-3">
          {filtered.map(bip => (
            <div
              key={bip.number}
              className="border border-[#F7931A]/20 rounded-xl overflow-hidden bg-[#F7931A]/5 hover:border-[#F7931A]/40 transition-all"
            >
              {/* Card header */}
              <button
                className="w-full text-left px-6 py-5 flex items-start justify-between gap-4"
                onClick={() => setExpanded(expanded === bip.number ? null : bip.number)}
              >
                <div className="flex items-start gap-4 flex-1">
                  <span className="text-[#F7931A] font-black font-mono text-lg min-w-[60px]">
                    BIP {bip.number}
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-white font-bold">{bip.title}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${STATUS_COLORS[bip.status]}`}>
                        {bip.statusLabel}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${RISK_COLORS[bip.risk]}`}>
                        {bip.risk}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full border border-gray-700 text-gray-500">
                        {bip.category}
                      </span>
                    </div>
                  </div>
                </div>
                <span className={`text-[#F7931A] transition-transform mt-1 ${expanded === bip.number ? "rotate-180" : ""}`}>▼</span>
              </button>

              {/* Expanded content */}
              {expanded === bip.number && (
                <div className="px-6 pb-6 border-t border-[#F7931A]/10">
                  <div className="grid md:grid-cols-3 gap-6 mt-5">
                    <div>
                      <p className="text-xs text-[#F7931A] font-mono mb-2 uppercase tracking-wider">What it is</p>
                      <p className="text-sm text-gray-300 leading-relaxed">{bip.summary}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#F7931A] font-mono mb-2 uppercase tracking-wider">Why it matters</p>
                      <p className="text-sm text-gray-300 leading-relaxed">{bip.why}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#F7931A] font-mono mb-2 uppercase tracking-wider">What to do</p>
                      <p className="text-sm text-gray-300 leading-relaxed">{bip.action}</p>
                      <a
                        href={bip.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-3 text-xs text-[#F7931A] hover:underline font-mono"
                      >
                        Read the BIP →
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-600 font-mono mt-8 text-center">
          // Updated regularly by the StackerZero team. Click any BIP to expand.
        </p>
      </div>
    </section>
  );
}
