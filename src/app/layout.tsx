import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Jenkins AI Chatbot Plugin — Docs",
  description:
    "Documentation for the Jenkins Resources AI Chatbot Plugin — a RAG-powered assistant integrated directly into Jenkins.",
  keywords: ["Jenkins", "AI", "chatbot", "plugin", "documentation", "RAG"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="root-layout">
            <Navbar />
            <div className="content-layout">
              <Sidebar />
              <main className="main-content">{children}</main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
