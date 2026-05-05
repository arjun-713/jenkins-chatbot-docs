import { notFound } from "next/navigation";
import { getAllDocSlugs, getDocBySlug } from "@/lib/docs";
import { MDXRemote } from "next-mdx-remote/rsc";
import TableOfContents from "@/components/TableOfContents";
import Mermaid from "@/components/Mermaid";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";

const mdxComponents = {
  pre: (props: any) => {
    const child = props.children;
    if (child && child.type === "code" && child.props.className === "language-mermaid") {
      return <Mermaid chart={child.props.children} />;
    }
    return <pre {...props} />;
  },
};

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const slugs = getAllDocSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);
  if (!doc) return {};
  return {
    title: `${doc.meta.title} — Jenkins AI Plugin Docs`,
    description: doc.meta.description,
  };
}

import { Suspense } from "react";
import SearchHighlighter from "@/components/SearchHighlighter";

export default async function DocPage({ params }: Props) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);
  if (!doc) notFound();

  return (
    <div className="doc-layout">
      <Suspense fallback={null}>
        <SearchHighlighter />
      </Suspense>
      <article className="prose-content">
        <MDXRemote
          source={doc.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                rehypeSlug,
                [rehypeAutolinkHeadings, { behavior: "wrap" }],
              ],
            },
          }}
        />
      </article>
      <TableOfContents />
    </div>
  );
}
