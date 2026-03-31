import { getBriefing, getAllBriefings } from "../../../lib/briefings";
import { notFound } from "next/navigation";
import Link from "next/link";
import { remark } from "remark";
import remarkHtml from "remark-html";

export async function generateStaticParams() {
  const briefings = getAllBriefings();
  return briefings.map(b => ({ date: b.date }));
}

export async function generateMetadata({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  const briefing = getBriefing(date);
  if (!briefing) return { title: "Briefing Not Found | StackerZero" };
  return {
    title: `${briefing.title} | StackerZero`,
    description: briefing.excerpt,
  };
}

export default async function BriefingPage({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  const briefing = getBriefing(date);
  if (!briefing) notFound();

  const processed = await remark().use(remarkHtml).process(briefing.content);
  const html = processed.toString();

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-100">
      {/* Header */}
      <div className="border-b border-[#F7931A]/20 bg-[#0a0a0a]/90 sticky top-0 z-10 backdrop-blur">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/" className="text-gray-500 hover:text-[#F7931A] transition-colors text-sm font-mono">← stackerzero.com</Link>
          <span className="text-gray-700">/</span>
          <Link href="/briefings" className="text-gray-500 hover:text-[#F7931A] transition-colors text-sm font-mono">briefings</Link>
          <span className="text-gray-700">/</span>
          <span className="text-[#F7931A] font-mono text-sm">{date}</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Meta */}
        <div className="mb-8">
          <p className="text-[#F7931A] font-mono text-sm mb-3">{briefing.date}</p>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">{briefing.title}</h1>
          <p className="text-gray-400 text-lg leading-relaxed border-l-2 border-[#F7931A]/40 pl-4">{briefing.excerpt}</p>
        </div>

        {/* Content */}
        <article
          className="prose prose-invert prose-orange max-w-none
            prose-h2:text-[#F7931A] prose-h2:font-black prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-white prose-h3:font-bold
            prose-p:text-gray-300 prose-p:leading-relaxed
            prose-li:text-gray-300
            prose-strong:text-white
            prose-a:text-[#F7931A] prose-a:no-underline hover:prose-a:underline
            prose-hr:border-[#F7931A]/20
            prose-blockquote:border-[#F7931A]/40 prose-blockquote:text-gray-400"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* Comments */}
        <div className="mt-16 border-t border-[#F7931A]/20 pt-12">
          <h2 className="text-xl font-black text-[#F7931A] mb-4">Comments</h2>
          <div className="border border-[#F7931A]/20 rounded-xl p-6 bg-[#F7931A]/5 text-center">
            <p className="text-gray-400 text-sm font-mono mb-2">💬 Comments coming soon</p>
            <p className="text-gray-600 text-xs">We're setting up community comments via GitHub Discussions. Check back shortly.</p>
          </div>
        </div>

        {/* Back */}
        <div className="mt-12">
          <Link href="/briefings" className="inline-flex items-center gap-2 text-[#F7931A] hover:text-[#d4780f] font-mono text-sm transition-colors">
            ← All briefings
          </Link>
        </div>
      </div>
    </main>
  );
}
