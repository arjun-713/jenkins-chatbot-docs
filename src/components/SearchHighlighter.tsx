"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SearchHighlighter() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    if (!search) return;
    
    const timeoutId = setTimeout(() => {
      const article = document.querySelector("article.prose-content");
      if (!article) return;

      const walker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT, {
        acceptNode: function(node) {
          if (node.parentNode?.nodeName === 'SCRIPT' || node.parentNode?.nodeName === 'STYLE') return NodeFilter.FILTER_REJECT;
          if (node.nodeValue?.toLowerCase().includes(search.toLowerCase())) return NodeFilter.FILTER_ACCEPT;
          return NodeFilter.FILTER_SKIP;
        }
      });

      const firstNode = walker.nextNode();
      if (firstNode && firstNode.parentNode) {
        const parent = firstNode.parentNode as HTMLElement;
        const text = firstNode.nodeValue || "";
        const index = text.toLowerCase().indexOf(search.toLowerCase());
        
        if (index !== -1) {
          const before = document.createTextNode(text.substring(0, index));
          const highlight = document.createElement("span");
          highlight.className = "search-highlight-active";
          highlight.textContent = text.substring(index, index + search.length);
          const after = document.createTextNode(text.substring(index + search.length));
          
          parent.insertBefore(before, firstNode);
          parent.insertBefore(highlight, firstNode);
          parent.insertBefore(after, firstNode);
          parent.removeChild(firstNode);

          highlight.scrollIntoView({ behavior: "smooth", block: "center" });

          setTimeout(() => {
            highlight.classList.add("fade-out");
            setTimeout(() => {
              // cleanup
              const parentElem = highlight.parentNode;
              if (parentElem) {
                parentElem.replaceChild(document.createTextNode(highlight.textContent || ""), highlight);
                parentElem.normalize();
              }
            }, 500); // Wait for transition
          }, 2000); // Hold for 2 seconds
        }
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [search]);

  return null;
}
