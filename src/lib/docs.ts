import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content/docs");

export interface DocMeta {
  title: string;
  description?: string;
}

export interface Doc {
  slug: string[];
  meta: DocMeta;
  content: string;
}

export function getAllDocSlugs(): string[][] {
  function walk(dir: string, base: string[] = []): string[][] {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const slugs: string[][] = [];
    for (const entry of entries) {
      if (entry.isDirectory()) {
        slugs.push(...walk(path.join(dir, entry.name), [...base, entry.name]));
      } else if (entry.name.endsWith(".md") || entry.name.endsWith(".mdx")) {
        const name = entry.name.replace(/\.mdx?$/, "");
        slugs.push([...base, name]);
      }
    }
    return slugs;
  }
  return walk(CONTENT_DIR);
}

export function getDocBySlug(slug: string[]): Doc | null {
  const mdxPath = path.join(CONTENT_DIR, ...slug) + ".mdx";
  const mdPath = path.join(CONTENT_DIR, ...slug) + ".md";
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;
  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  // Extract title from frontmatter or first h1
  let title = data.title as string;
  if (!title) {
    const h1Match = content.match(/^#\s+(.+)$/m);
    title = h1Match ? h1Match[1] : slug[slug.length - 1];
  }

  return {
    slug,
    meta: { title, description: data.description },
    content,
  };
}
