import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get("address");
  if (!address) return NextResponse.json({ error: "No address provided" }, { status: 400 });

  const trimmed = address.trim();
  if (trimmed.length < 25 || trimmed.length > 90) {
    return NextResponse.json({ error: "Invalid Bitcoin address" }, { status: 400 });
  }

  try {
    const res = await fetch(`https://mempool.space/api/address/${trimmed}`, { next: { revalidate: 30 } });
    if (!res.ok) return NextResponse.json({ error: "Address not found or invalid" }, { status: 400 });
    const data = await res.json();

    const txCount = data.chain_stats.tx_count + data.mempool_stats.tx_count;
    const confirmedBalance = data.chain_stats.funded_txo_sum - data.chain_stats.spent_txo_sum;
    const unconfirmedBalance = data.mempool_stats.funded_txo_sum - data.mempool_stats.spent_txo_sum;
    const balance = confirmedBalance + unconfirmedBalance;

    // Detect address type
    let type = "Unknown";
    let quantum_risk = "Unknown";

    if (trimmed.startsWith("bc1q")) {
      type = "P2WPKH (Native SegWit)";
      quantum_risk = txCount > 0 ? "MEDIUM - Public key exposed after first spend" : "LOW - Public key not yet exposed";
    } else if (trimmed.startsWith("bc1p")) {
      type = "P2TR (Taproot)";
      quantum_risk = txCount > 0 ? "MEDIUM - Key path spend may expose key" : "LOW - Public key not yet exposed";
    } else if (trimmed.startsWith("3")) {
      type = "P2SH (SegWit Wrapped)";
      quantum_risk = txCount > 0 ? "MEDIUM - Script exposed on spend" : "LOW";
    } else if (trimmed.startsWith("1")) {
      type = "P2PKH (Legacy)";
      quantum_risk = txCount > 0 ? "HIGH - Public key exposed on chain" : "MEDIUM - Public key hidden until first spend";
    } else if (trimmed.startsWith("bc1")) {
      type = "Bech32 (SegWit)";
      quantum_risk = txCount > 0 ? "MEDIUM" : "LOW";
    }

    return NextResponse.json({
      address: trimmed,
      type,
      tx_count: txCount,
      balance_sats: balance,
      balance_btc: (balance / 1e8).toFixed(8),
      quantum_risk,
      public_key_exposed: txCount > 0,
      has_balance: balance > 0,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch address data. Try again." }, { status: 500 });
  }
}