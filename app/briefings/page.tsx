import { getAllBriefings } from "../../lib/briefings";
import Link from "next/link";

export const metadata = {
  title: "Daily Briefings | StackerZero",
  description: "Daily Bitcoin defense intelligence — quantum threats, BIP 360 updates, market pulse, and action items for serious holders.",
};

export default function BriefingsPage() {
  const briefings = getAllBriefings();

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-100">
      {/* Header */}
      <div className="border-b border-[#F7931A]/20 bg-[#0a0a0a]/90 sticky top-0 z-10 backdrop-blur">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/" className="text-gray-500 hover:text-[#F7931A] transition-colors text-sm font-mono">← stackerzero.com</Link>
          <span className="text-gray-700">/</span>
          <span className="text-[#F7931A] font-mono text-sm">briefings</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-[#F7931A]/10 border border-[#F7931A]/30 rounded-full px-4 py-2 text-sm text-[#F7931A] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#F7931A] animate-pulse inline-block" />
            Daily Bitcoin Defense Intelligence
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="text-[#F7931A]">Morning</span> Briefings
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Every morning: threat level, BIP 360 status, market pulse, and one thing you can do today to protect your stack.
          </p>
        </div>

        {briefings.length === 0 ? (
          <div className="border border-[#F7931A]/20 rounded-xl p-8 text-center text-gray-500 font-mono">
            No briefings yet. Check back tomorrow.
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {briefings.map((b) => (
              <Link key={b.date} href={`/briefings/${b.date}`}>
                <div className="border border-[#F7931A]/20 hover:border-[#F7931A]/60 rounded-xl p-6 bg-[#F7931A]/5 hover:bg-[#F7931A]/10 transition-all group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-xs text-[#F7931A] font-mono mb-2">{b.date}</p>
                      <h2 className="text-lg font-bold text-white group-hover:text-[#F7931A] transition-colors mb-2">{b.title}</h2>
                      <p className="text-sm text-gray-400 leading-relaxed">{b.excerpt}</p>
                    </div>
                    <span className="text-[#F7931A] text-xl mt-1">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
