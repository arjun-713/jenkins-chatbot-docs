import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-left">
          <Link href="/" className="navbar-brand">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Jenkins_logo.svg" 
              alt="Jenkins Logo" 
              width={22} 
              height={30} 
              style={{ objectFit: 'contain' }}
            />
            <span className="navbar-brand-text">resources-ai-chatbot-plugin</span>
          </Link>
        </div>

        <div className="navbar-center">
          <SearchBar />
        </div>

        <div className="navbar-right">
          <a
            href="https://github.com/jenkinsci/resources-ai-chatbot-plugin"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar-icon-btn"
            aria-label="GitHub repository"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
