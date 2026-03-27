import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get("address");
  if (!address) return NextResponse.json({ error: "No address" }, { status: 400 });

  try {
    const res = await fetch(`https://mempool.space/api/address/${address}`);
    if (!res.ok) return NextResponse.json({ error: "Invalid address" }, { status: 400 });
    const data = await res.json();

    const txCount = data.chain_stats.tx_count;
    const balance = data.chain_stats.funded_txo_sum - data.chain_stats.spent_txo_sum;

    // Detect address type
    let type = "Unknown";
    let quantum_risk = "Unknown";
    if (address.startsWith("bc1q")) { type = "P2WPKH (Native SegWit)"; quantum_risk = txCount > 0 ? "MEDIUM - Public key exposed after first spend" : "LOW - Public key not yet exposed"; }
    else if (address.startsWith("bc1p")) { type = "P2TR (Taproot)"; quantum_risk = txCount > 0 ? "MEDIUM - Key path spend exposes key" : "LOW - Public key not yet exposed"; }
    else if (address.startsWith("3")) { type = "P2SH (SegWit wrapped)"; quantum_risk = "LOW-MEDIUM"; }
    else if (address.startsWith("1")) { type = "P2PKH (Legacy)"; quantum_risk = txCount > 0 ? "HIGH - Public key exposed on chain" : "MEDIUM - Public key hidden until spend"; }
    else if (address.startsWith("04") || address.startsWith("02") || address.startsWith("03")) { type = "P2PK (Raw Public Key)"; quantum_risk = "CRITICAL - Public key permanently exposed"; }

    return NextResponse.json({
      address,
      type,
      tx_count: txCount,
      balance_sats: balance,
      balance_btc: (balance / 1e8).toFixed(8),
      quantum_risk,
      public_key_exposed: txCount > 0 || type.includes("P2PK"),
    });
  } catch {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}
