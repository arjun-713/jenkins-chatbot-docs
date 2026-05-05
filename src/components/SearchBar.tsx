"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { navigation } from "@/lib/navigation";
import { MagnifyingGlassIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import Fuse from "fuse.js";

interface SearchItem {
  title: string;
  href: string;
  section: string;
  content?: string;
}

const fallbackItems: SearchItem[] = navigation.flatMap((section) =>
  section.items.map((item) => ({
    title: item.title,
    href: item.href,
    section: section.title,
  }))
);

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [indexData, setIndexData] = useState<SearchItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (open && indexData.length === 0) {
      fetch("/api/search")
        .then((res) => res.json())
        .then((data) => setIndexData(data))
        .catch(() => setIndexData(fallbackItems));
    }
  }, [open, indexData.length]);

  const searchData = indexData.length > 0 ? indexData : fallbackItems;

  const fuse = useMemo(
    () =>
      new Fuse(searchData, {
        keys: [
          { name: "title", weight: 2 },
          { name: "section", weight: 1 },
          { name: "content", weight: 0.5 },
        ],
        threshold: 0.4,
        ignoreLocation: true,
        includeMatches: true,
      }),
    [searchData]
  );

  const filtered = query.trim()
    ? fuse.search(query).map((res) => {
        let excerpt = "";
        let matchText = "";

        const contentMatch = res.matches?.find((m) => m.key === "content");
        if (contentMatch && contentMatch.indices.length > 0) {
          const [start, end] = contentMatch.indices[0];
          matchText = contentMatch.value?.substring(start, end + 1) || "";
          
          const excerptStart = Math.max(0, start - 30);
          const excerptEnd = Math.min(contentMatch.value?.length || 0, end + 40);
          excerpt = contentMatch.value?.substring(excerptStart, excerptEnd) || "";
          if (excerptStart > 0) excerpt = "..." + excerpt;
          if (excerptEnd < (contentMatch.value?.length || 0)) excerpt = excerpt + "...";
        }

        return { ...res.item, excerpt, matchText };
      })
    : searchData.map(item => ({ ...item, excerpt: "", matchText: "" }));

  const navigate = useCallback(
    (href: string, matchText?: string) => {
      const url = matchText ? `${href}?search=${encodeURIComponent(matchText)}` : href;
      router.push(url);
      setOpen(false);
      setQuery("");
      setSelected(0);
    },
    [router]
  );

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowDown") setSelected((s) => Math.min(s + 1, filtered.length - 1));
      if (e.key === "ArrowUp") setSelected((s) => Math.max(s - 1, 0));
      if (e.key === "Enter" && filtered[selected]) {
        navigate(filtered[selected].href, filtered[selected].matchText);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, filtered, selected, navigate]);

  return (
    <>
      <button className="search-trigger" onClick={() => setOpen(true)} aria-label="Open search">
        <MagnifyingGlassIcon className="w-4 h-4" />
        <span className="search-trigger-text">Search docs...</span>
        <kbd className="search-kbd">⌘K</kbd>
      </button>

      {open && (
        <div className="search-overlay" onClick={() => setOpen(false)}>
          <div className="search-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="search-input-row">
              <MagnifyingGlassIcon className="w-[18px] h-[18px] search-icon" />
              <input
                autoFocus
                className="search-input"
                placeholder="Search documentation…"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelected(0);
                }}
              />
              <kbd className="search-esc">Esc</kbd>
            </div>

            {filtered.length > 0 ? (
              <ul className="search-results">
                {filtered.map((item, i) => (
                  <li key={item.href}>
                    <button
                      className={`search-result ${i === selected ? "search-result-active" : ""}`}
                      onClick={() => navigate(item.href, item.matchText)}
                      onMouseEnter={() => setSelected(i)}
                    >
                      <DocumentTextIcon className="w-[15px] h-[15px] search-result-icon" />
                      <div className="search-result-text">
                        <span className="search-result-title">{item.title}</span>
                        <span className="search-result-section">{item.section}</span>
                        {item.excerpt && (
                          <span className="search-result-excerpt text-xs text-gray-500 block mt-1 truncate">
                            {item.excerpt}
                          </span>
                        )}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="search-empty">No results for &quot;{query}&quot;</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
