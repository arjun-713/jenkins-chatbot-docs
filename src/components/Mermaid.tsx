"use client";

import React, { useEffect, useState } from "react";
import mermaid from "mermaid";
import { useTheme } from "next-themes";

export default function Mermaid({ chart }: { chart: string }) {
  const { resolvedTheme } = useTheme();
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: resolvedTheme === "dark" ? "dark" : "default",
      fontFamily: "var(--font-sans)",
      securityLevel: "loose",
    });

    const renderChart = async () => {
      try {
        const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
        const { svg: renderedSvg } = await mermaid.render(id, chart);
        setSvg(renderedSvg);
      } catch (err) {
        console.error("Mermaid parsing error:", err);
      }
    };

    if (chart) {
      renderChart();
    }
  }, [chart, resolvedTheme]);

  if (!svg) {
    return <div className="animate-pulse bg-bg-secondary h-48 w-full rounded-md" />;
  }

  return (
    <div
      className="my-8 flex justify-center"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
