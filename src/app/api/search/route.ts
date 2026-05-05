import { NextResponse } from "next/server";
import { getAllDocSlugs, getDocBySlug } from "@/lib/docs";

export async function GET() {
  const slugs = getAllDocSlugs();
  const searchIndex = slugs.map((slug) => {
    const doc = getDocBySlug(slug);
    if (!doc) return null;
    return {
      title: doc.meta.title,
      href: `/docs/${slug.join("/")}`,
      section: slug[0] ? slug[0].charAt(0).toUpperCase() + slug[0].slice(1).replace("-", " ") : "Docs",
      content: doc.content.replace(/[#*`_\[\]()]/g, " "), // strip some markdown
    };
  }).filter(Boolean);

  return NextResponse.json(searchIndex);
}
