// Central sidebar navigation config used by sidebar + search
export interface NavItem {
  title: string;
  href: string;
  slug: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navigation: NavSection[] = [
  {
    title: "Introduction",
    items: [
      { title: "Overview", href: "/docs/introduction/overview", slug: "introduction/overview" },
      { title: "Getting Started", href: "/docs/introduction/getting-started", slug: "introduction/getting-started" },
    ],
  },
  {
    title: "Setup",
    items: [
      { title: "Linux", href: "/docs/setup/linux", slug: "setup/linux" },
      { title: "Windows / WSL2", href: "/docs/setup/windows", slug: "setup/windows" },
      { title: "Troubleshooting", href: "/docs/setup/troubleshooting", slug: "setup/troubleshooting" },
    ],
  },
  {
    title: "Data Pipeline",
    items: [
      { title: "Overview", href: "/docs/data-pipeline/overview", slug: "data-pipeline/overview" },
      { title: "Data Collection", href: "/docs/data-pipeline/collection", slug: "data-pipeline/collection" },
      { title: "Preprocessing", href: "/docs/data-pipeline/preprocessing", slug: "data-pipeline/preprocessing" },
      { title: "Chunking", href: "/docs/data-pipeline/chunking", slug: "data-pipeline/chunking" },
    ],
  },
  {
    title: "API",
    items: [
      { title: "API Reference", href: "/docs/api/reference", slug: "api/reference" },
    ],
  },
  {
    title: "Frontend",
    items: [
      { title: "Overview", href: "/docs/frontend/overview", slug: "frontend/overview" },
    ],
  },
  {
    title: "Architecture",
    items: [
      { title: "Agentic Retrieval", href: "/docs/architecture/agentic-retrieval", slug: "architecture/agentic-retrieval" },
      { title: "Vector Store", href: "/docs/architecture/vectorstore", slug: "architecture/vectorstore" },
      { title: "Embedding", href: "/docs/architecture/embedding", slug: "architecture/embedding" },
      { title: "Retriever", href: "/docs/architecture/retriever", slug: "architecture/retriever" },
      { title: "Testing", href: "/docs/architecture/testing", slug: "architecture/testing" },
    ],
  },
];
