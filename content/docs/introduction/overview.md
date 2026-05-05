# Overview

**Resources AI Chatbot Plugin** is a Jenkins plugin that integrates an AI-powered assistant directly into the Jenkins interface. It reduces the learning curve for newcomers while improving accessibility and productivity for experienced users through a simple conversational UI.

This plugin was developed as part of **Google Summer of Code 2025** and is now available through the official Jenkins plugin registry.

## What It Does

- Answers questions about Jenkins features, configuration, and troubleshooting
- Draws context from Jenkins documentation, plugin pages, Discourse community threads, and Stack Overflow
- Streams responses in real-time via WebSocket
- Supports file uploads (logs, configs, code, images) for richer context
- Persists sessions across page refreshes and server restarts

## Architecture at a Glance

The plugin is built on a **Retrieval-Augmented Generation (RAG)** architecture:

1. **Data Pipeline** — Collects and processes Jenkins-related content from multiple sources
2. **Vector Store** — Stores embeddings in FAISS for fast semantic search
3. **API Backend** — FastAPI service that orchestrates retrieval and LLM inference
4. **Frontend** — React UI injected into every Jenkins page via a global decorator

## Key Features

| Feature | Description |
|---------|-------------|
| Real-time streaming | WebSocket-based token streaming for immediate feedback |
| File attachments | Upload logs, configs, code, or images for context-aware answers |
| Session persistence | Chat history survives page refreshes and server restarts |
| Export chat | Download conversations as TXT, MD, DOCX, or PDF |
| Agentic retrieval | LLM dynamically selects the best retrieval tool per query |
| Hybrid search | Combines semantic (FAISS) and keyword (BM25) search |

## Repository

- **GitHub**: [jenkinsci/resources-ai-chatbot-plugin](https://github.com/jenkinsci/resources-ai-chatbot-plugin)
- **License**: MIT
