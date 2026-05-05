"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation, NavSection } from "@/lib/navigation";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  function toggle(title: string) {
    setCollapsed((prev) => ({ ...prev, [title]: !prev[title] }));
  }

  return (
    <nav className="sidebar">
      <div className="sidebar-nav">
        {navigation.map((section: NavSection) => {
          const isOpen = !collapsed[section.title];
          return (
            <div key={section.title} className="nav-section">
              <button
                className="nav-section-title"
                onClick={() => toggle(section.title)}
                aria-expanded={isOpen}
              >
                <ChevronRightIcon
                  className={`w-[14px] h-[14px] nav-chevron ${isOpen ? "nav-chevron-open" : ""}`}
                />
                {section.title}
              </button>

              {isOpen && (
                <ul className="nav-items">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`nav-link ${isActive ? "nav-link-active" : ""}`}
                        >
                          {item.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
