import fs from "fs";
import path from "path";
import matter from "gray-matter";

const briefingsDir = path.join(process.cwd(), "content/briefings");

export interface BriefingMeta {
  date: string;
  title: string;
  excerpt: string;
}

export interface Briefing extends BriefingMeta {
  content: string;
}

export function getAllBriefings(): BriefingMeta[] {
  if (!fs.existsSync(briefingsDir)) return [];
  const files = fs.readdirSync(briefingsDir).filter(f => f.endsWith(".md"));
  return files
    .map(file => {
      const raw = fs.readFileSync(path.join(briefingsDir, file), "utf-8");
      const { data } = matter(raw);
      return {
        date: data.date as string,
        title: data.title as string,
        excerpt: data.excerpt as string,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBriefing(date: string): Briefing | null {
  const filePath = path.join(briefingsDir, `${date}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    date: data.date as string,
    title: data.title as string,
    excerpt: data.excerpt as string,
    content,
  };
}
