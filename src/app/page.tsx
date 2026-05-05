import Link from "next/link";
import { ArrowRightIcon, BookOpenIcon, CpuChipIcon, GlobeAltIcon, BoltIcon } from "@heroicons/react/24/outline";

export default function HomePage() {
  const features = [
    {
      icon: <BookOpenIcon className="w-[22px] h-[22px]" />,
      title: "RAG Architecture",
      desc: "Retrieval-Augmented Generation grounded in Jenkins docs, plugins, Discourse, and Stack Overflow.",
    },
    {
      icon: <BoltIcon className="w-[22px] h-[22px]" />,
      title: "Real-time Streaming",
      desc: "Token-by-token WebSocket streaming for an interactive, low-latency chat experience.",
    },
    {
      icon: <CpuChipIcon className="w-[22px] h-[22px]" />,
      title: "Local LLM",
      desc: "Runs Mistral 7B locally via llama.cpp. No external API key required.",
    },
    {
      icon: <GlobeAltIcon className="w-[22px] h-[22px]" />,
      title: "Jenkins Native",
      desc: "Injected into every Jenkins page via a global decorator — always one click away.",
    },
  ];

  return (
    <div className="home-page">
      <div className="hero">
        <div className="hero-badge">Google Summer of Code 2025 & 2026</div>
        <h1 className="hero-title">
          Jenkins AI Chatbot Plugin
        </h1>
        <p className="hero-desc">
          An AI-powered assistant embedded directly in Jenkins. Ask questions, get answers — from
          Jenkins docs, plugins, community threads, and Stack Overflow.
        </p>
        <div className="hero-actions">
          <Link href="/docs/introduction/overview" className="btn-primary">
            Read the Docs <ArrowRightIcon className="w-4 h-4" />
          </Link>
          <Link href="/docs/introduction/getting-started" className="btn-secondary">
            Quick Start
          </Link>
        </div>
      </div>

      <div className="features-grid">
        {features.map((f) => (
          <div key={f.title} className="feature-card">
            <div className="feature-icon">{f.icon}</div>
            <h3 className="feature-title">{f.title}</h3>
            <p className="feature-desc">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="home-links">
        <h2 className="home-links-title">Explore the Documentation</h2>
        <div className="home-links-grid">
          {[
            { href: "/docs/setup/linux", label: "Linux Setup" },
            { href: "/docs/setup/windows", label: "Windows / WSL2" },
            { href: "/docs/data-pipeline/overview", label: "Data Pipeline" },
            { href: "/docs/api/reference", label: "API Reference" },
            { href: "/docs/frontend/overview", label: "Frontend UI" },
            { href: "/docs/architecture/agentic-retrieval", label: "Agentic Retrieval" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="home-link-card">
              {l.label}
              <ArrowRightIcon className="w-[14px] h-[14px]" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
