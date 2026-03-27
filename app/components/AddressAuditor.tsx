"use client";
import { useState } from "react";
import { Search, Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface AuditResult {
  address: string;
  type: string;
  tx_count: number;
  balance_btc: string;
  quantum_risk: string;
  public_key_exposed: boolean;
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
      const res = await fetch(`/api/audit?address=${address.trim()}`);
      const data = await res.json();
      if (data.error) setError(data.error);
      else setResult(data);
    } catch { setError("Network error. Try again."); }
    setLoading(false);
  };

  const riskColor = (risk: string) => {
    if (risk.startsWith("CRITICAL")) return "text-red-400";
    if (risk.startsWith("HIGH")) return "text-orange-400";
    if (risk.startsWith("MEDIUM")) return "text-yellow-400";
    return "text-green-400";
  };

  return (
    <section id="auditor" className="py-24 px-6 bg-[#0d0d0d]">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <Shield className="w-12 h-12 text-[#F7931A] mx-auto mb-4" />
          <h2 className="text-4xl font-black mb-4">Address <span className="text-[#F7931A]">Auditor</span></h2>
          <p className="text-gray-400">Paste any Bitcoin address to check its type, balance, and quantum exposure risk.</p>
        </div>
        <div className="flex gap-3">
          <input
            value={address}
            onChange={e => setAddress(e.target.value)}
            onKeyDown={e => e.key === "Enter" && audit()}
            placeholder="bc1q... or 1... or 3..."
            className="flex-1 bg-[#111] border border-gray-700 focus:border-[#F7931A] rounded-lg px-4 py-3 text-sm outline-none transition-colors font-mono"
          />
          <button onClick={audit} disabled={loading}
            className="bg-[#F7931A] hover:bg-[#d4780f] disabled:opacity-50 text-black font-bold px-6 py-3 rounded-lg transition-colors flex items-center gap-2">
            <Search className="w-4 h-4" />
            {loading ? "Scanning..." : "Audit"}
          </button>
        </div>
        {error && <div className="mt-4 bg-red-900/20 border border-red-800 rounded-lg p-4 text-red-400 text-sm">{error}</div>}
        {result && (
          <div className="mt-6 bg-[#111] border border-gray-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-[#F7931A]">Audit Complete</h3>
              {result.public_key_exposed
                ? <span className="flex items-center gap-1 text-red-400 text-sm"><XCircle className="w-4 h-4" /> Key Exposed</span>
                : <span className="flex items-center gap-1 text-green-400 text-sm"><CheckCircle className="w-4 h-4" /> Key Protected</span>
              }
            </div>
            <div className="font-mono text-xs text-gray-500 break-all">{result.address}</div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-gray-500">Type</span><div className="font-semibold mt-1">{result.type}</div></div>
              <div><span className="text-gray-500">Transactions</span><div className="font-semibold mt-1">{result.tx_count}</div></div>
              <div><span className="text-gray-500">Balance</span><div className="font-semibold mt-1">{result.balance_btc} BTC</div></div>
              <div><span className="text-gray-500">Quantum Risk</span><div className={`font-semibold mt-1 text-xs ${riskColor(result.quantum_risk)}`}>{result.quantum_risk}</div></div>
            </div>
            {result.tx_count > 0 && (
              <div className="bg-yellow-900/20 border border-yellow-800/50 rounded-lg p-3 flex gap-2 text-sm text-yellow-400">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                This address has transaction history. Public key is on-chain. Move funds to a fresh address.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
