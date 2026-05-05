# Getting Started

There are two ways to run the API locally, depending on your use case.

## Prerequisites

| Requirement | Version |
|------------|---------|
| Python | 3.11+ |
| Java (JDK) | 11+ |
| Maven | 3.6+ |
| Build tools | `make`, `cmake` ≥ 3.14, `gcc`/`clang` |

```bash
# Ubuntu / Debian / WSL
sudo apt install -y make cmake gcc g++ python3.11 python3.11-venv python3.11-dev

# macOS
brew install cmake python@3.11 && xcode-select --install
```

## Option 1 — Lite Mode (Recommended)

Use this when working on the API, backend logic, data pipeline, or tests. You do **not** need to test actual chatbot responses.

```bash
make dev-lite
```

This will:
- Set up the Python virtual environment automatically
- Install dependencies (skips the 4 GB model download)
- Start the API server without loading the LLM

The API will be available at `http://127.0.0.1:8000` within a few minutes.

**Verify it's working:**
```bash
curl -X POST http://127.0.0.1:8000/api/chatbot/sessions
```

> **What works:** All API endpoints, session management, context search, data pipeline  
> **What doesn't work:** Actual chat completions (no model loaded)

## Option 2 — Full Mode

Use this when you need to test the chatbot with real LLM responses or work on model-specific features.

First, complete the full setup described in the [Setup Guide](/docs/setup/linux). This includes installing `llama-cpp-python` and downloading the 4 GB Mistral model.

```bash
make api
```

> **What works:** Everything, including actual chat completions with the local LLM

## Video Tutorial

A [setup video tutorial](https://youtu.be/1DnMNA4aLyE) is available that walks through forking the repo, setting up the backend, downloading the LLM model, running the frontend, and verifying the chatbot works.
