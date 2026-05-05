"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLHeadingElement>("article h2, article h3")
    );
    setHeadings(
      els.map((el) => ({
        id: el.id,
        text: el.textContent ?? "",
        level: parseInt(el.tagName[1]),
      }))
    );

    const handleScroll = () => {
      // Offset slightly above the middle of the screen
      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;
      const yOffset = innerHeight * 0.4;
      
      let currentActive = "";
      for (const el of els) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= yOffset) {
          currentActive = el.id;
        } else {
          break;
        }
      }

      // Force last element to be active if scrolled to absolute bottom
      if (scrollY + innerHeight >= document.body.offsetHeight - 50) {
        currentActive = els[els.length - 1]?.id || currentActive;
      }

      if (currentActive) {
        setActive(currentActive);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (headings.length === 0) return null;

  return (
    <aside className="toc">
      <p className="toc-title">On this page</p>
      <ul className="toc-list">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? "toc-item-sub" : ""}>
            <a
              href={`#${h.id}`}
              className={`toc-link ${active === h.id ? "toc-link-active" : ""}`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
