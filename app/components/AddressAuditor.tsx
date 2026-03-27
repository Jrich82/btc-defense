"use client";
import { useState } from "react";
import { Search, Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface AuditResult {
  address: string;
  type: string;
  tx_count: number;
  balance_btc: string;
  balance_sats: number;
  quantum_risk: string;
  public_key_exposed: boolean;
  has_balance: boolean;
}

export default function AddressAuditor() {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState<AuditResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const audit = async () => {
    if (!address.trim()) return;
    setLoading(true); setError(""); setResult(null);
    try {
      const res = await fetch(`/api/audit?address=${encodeURIComponent(address.trim())}`);
      const data = await res.json();
      if (data.error) setError(data.error);
      else setResult(data);
    } catch {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  const riskColor = (risk: string) => {
    if (risk.startsWith("CRITICAL")) return "text-red-400";
    if (risk.startsWith("HIGH")) return "text-orange-400";
    if (risk.startsWith("MEDIUM")) return "text-yellow-400";
    return "text-green-400";
  };

  const riskBg = (risk: string) => {
    if (risk.startsWith("CRITICAL")) return "bg-red-900/20 border-red-800/50";
    if (risk.startsWith("HIGH")) return "bg-orange-900/20 border-orange-800/50";
    if (risk.startsWith("MEDIUM")) return "bg-yellow-900/20 border-yellow-800/50";
    return "bg-green-900/20 border-green-800/50";
  };

  return (
    <section id="auditor" className="py-24 px-6 bg-[#0d0d0d]">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <Shield className="w-12 h-12 text-[#F7931A] mx-auto mb-4" />
          <h2 className="text-4xl font-black mb-4">Address <span className="text-[#F7931A]">Auditor</span></h2>
          <p className="text-gray-400">Paste any Bitcoin address to instantly check its type, balance, and quantum exposure risk.</p>
        </div>
        <div className="flex gap-3">
          <input
            value={address}
            onChange={e => setAddress(e.target.value)}
            onKeyDown={e => e.key === "Enter" && audit()}
            placeholder="bc1q... or 1... or 3..."
            className="flex-1 bg-[#111] border border-gray-700 focus:border-[#F7931A] rounded-lg px-4 py-3 text-sm outline-none transition-colors font-mono"
          />
          <button
            onClick={audit}
            disabled={loading || !address.trim()}
            className="bg-[#F7931A] hover:bg-[#d4780f] disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold px-6 py-3 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <Search className="w-4 h-4" />
            {loading ? "Scanning..." : "Audit"}
          </button>
        </div>

        {error && (
          <div className="mt-4 bg-red-900/20 border border-red-800 rounded-lg p-4 text-red-400 text-sm flex items-center gap-2">
            <XCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {result && (
          <div className="mt-6 bg-[#111] border border-gray-800 rounded-xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-[#F7931A] text-lg">Audit Report</h3>
              {result.public_key_exposed
                ? <span className="flex items-center gap-1 text-red-400 text-sm font-semibold"><XCircle className="w-4 h-4" /> Key Exposed</span>
                : <span className="flex items-center gap-1 text-green-400 text-sm font-semibold"><CheckCircle className="w-4 h-4" /> Key Protected</span>
              }
            </div>

            <div className="font-mono text-xs text-gray-500 break-all bg-[#0a0a0a] rounded p-3">{result.address}</div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-[#0a0a0a] rounded-lg p-3">
                <div className="text-gray-500 text-xs mb-1">Address Type</div>
                <div className="font-semibold text-xs">{result.type}</div>
              </div>
              <div className="bg-[#0a0a0a] rounded-lg p-3">
                <div className="text-gray-500 text-xs mb-1">Transactions</div>
                <div className="font-semibold">{result.tx_count.toLocaleString()}</div>
              </div>
              <div className="bg-[#0a0a0a] rounded-lg p-3">
                <div className="text-gray-500 text-xs mb-1">Balance</div>
                <div className="font-semibold">{result.balance_btc} BTC</div>
              </div>
              <div className="bg-[#0a0a0a] rounded-lg p-3">
                <div className="text-gray-500 text-xs mb-1">Quantum Risk</div>
                <div className={`font-semibold text-xs ${riskColor(result.quantum_risk)}`}>{result.quantum_risk.split(" - ")[0]}</div>
              </div>
            </div>

            <div className={`border rounded-lg p-4 text-sm ${riskBg(result.quantum_risk)}`}>
              <div className={`font-semibold mb-1 ${riskColor(result.quantum_risk)}`}>Risk Assessment</div>
              <div className="text-gray-300">{result.quantum_risk}</div>
            </div>

            {result.public_key_exposed && result.has_balance && (
              <div className="bg-red-900/20 border border-red-800/50 rounded-lg p-4 flex gap-3 text-sm text-red-300">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-400" />
                <div>
                  <div className="font-semibold text-red-400 mb-1">Action Required</div>
                  This address has exposed its public key and still holds funds. Move your Bitcoin to a fresh address immediately.
                </div>
              </div>
            )}

            {result.public_key_exposed && !result.has_balance && (
              <div className="bg-yellow-900/20 border border-yellow-800/50 rounded-lg p-4 flex gap-3 text-sm text-yellow-300">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-yellow-400" />
                <div>This address has transaction history and its public key is on-chain. Do not reuse it for future receives.</div>
              </div>
            )}

            {!result.public_key_exposed && (
              <div className="bg-green-900/20 border border-green-800/50 rounded-lg p-4 flex gap-3 text-sm text-green-300">
                <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-400" />
                <div>This address has never broadcast a transaction. Your public key is not on-chain. You are protected against current quantum threats.</div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}