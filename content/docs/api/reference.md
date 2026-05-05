# API Reference

The API is a FastAPI application that exposes chatbot functionality as a RESTful service.

## Starting the Server

### Quick Start (Lite Mode — No LLM)

```bash
make dev-lite
```

The API will be available at `http://127.0.0.1:8000`.

### Full Mode (With LLM)

1. Download **Mistral 7B Instruct (v0.2 Q4_K_M)** from [Hugging Face](https://huggingface.co/TheBloke/Mistral-7B-Instruct-v0.2-GGUF)
2. Place the `.gguf` file in `api/models/mistral/`
3. Run:

```bash
cd chatbot-core
source venv/bin/activate
uvicorn api.main:app --reload
```

> Adding `--host 0.0.0.0` makes the server accessible from other devices on the network.

## Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/chatbot/sessions` | POST | Create a new chat session |
| `/api/chatbot/sessions/{session_id}/message` | POST | Send a message |
| `/api/chatbot/sessions/{session_id}/message` | GET | Get conversation history |
| `/api/chatbot/sessions/{session_id}/message/upload` | POST | Send message with file attachments |
| `/api/chatbot/sessions/{session_id}` | DELETE | Delete a session |
| `/api/chatbot/sessions/{session_id}/stream` | WebSocket | Real-time token streaming |
| `/api/chatbot/files/supported-extensions` | GET | List supported file types |
| `/health` | GET | Health check |

---

### `POST /api/chatbot/sessions`

Creates a new chat session.

**Response:**
```json
{
  "session_id": "string"
}
```

---

### `POST /api/chatbot/sessions/{session_id}/message`

Sends a user message and receives a generated response.

**Request:**
```json
{
  "message": "string"
}
```

**Response:**
```json
{
  "reply": "string"
}
```

---

### `GET /api/chatbot/sessions/{session_id}/message`

Retrieves conversation history. Restores persisted sessions from disk if not in memory.

**Response:**
```json
{
  "session_id": "string",
  "messages": [
    { "role": "human", "content": "string" },
    { "role": "ai", "content": "string" }
  ]
}
```

**Errors:** `404` — Session does not exist.

---

### `POST /api/chatbot/sessions/{session_id}/message/upload`

Sends a message with optional file attachments. Files are processed and included in LLM context.

- **Content-Type:** `multipart/form-data`
- `message` (form field, required)
- `files` (file field, optional) — supports text files (`.txt`, `.log`, `.md`, `.json`, `.yaml`, code files) and images (`.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`, `.bmp`)

**Response:**
```json
{
  "reply": "string"
}
```

**Errors:** `404` session not found · `400` unsupported file type or file too large · `422` empty message and no files

---

### `WebSocket /api/chatbot/sessions/{session_id}/stream`

Real-time token streaming. Streams responses token-by-token.

**Send:**
```json
{ "message": "string" }
```

**Receive (streamed):**
```json
{ "token": "partial response text" }
```

**End of stream:**
```json
{ "end": true }
```

**Errors (JSON over WebSocket):**
- `{"error": "Session not found"}`
- `{"error": "Invalid JSON format."}`
- `{"error": "An unexpected error occurred."}`

---

### `GET /api/chatbot/files/supported-extensions`

Returns supported file extensions and size limits.

**Response:**
```json
{
  "text": [".bash", ".cfg", ".conf", ".cpp", ".css", ".csv", ".env", ".go", ".groovy", ".html", ".java", ".js", ".json", ".log", ".md", ".php", ".properties", ".py", ".rb", ".rs", ".sh", ".sql", ".toml", ".ts", ".tsx", ".txt", ".xml", ".yaml", ".yml"],
  "image": [".bmp", ".gif", ".jpeg", ".jpg", ".png", ".webp"],
  "max_text_size_mb": 1.0,
  "max_image_size_mb": 5.0
}
```

---

### `GET /health`

Health check for container orchestration.

**Response:**
```json
{
  "status": "healthy",
  "llm_available": true
}
```

> `llm_available` is `false` in lite/test mode.

## Architecture

The API follows a clean separation of concerns:

- **`api/routes/`** — FastAPI routes, request validation, HTTP status codes
- **`api/services/`** — Core logic: memory management, retrieval, LLM generation
- **`api/models/`** — Pydantic schemas and LLM abstraction interface
- **`api/prompts/`** — Prompt formatting utilities
- **`api/config/`** — YAML-based configuration loader

## Session Memory Management

Conversation context is managed using **LangChain's `ConversationBufferMemory`**, stored per session:
- Persisted to disk as JSON files for recovery across server restarts
- Background task periodically cleans up expired sessions
- Atomic writes prevent data corruption

## LLM Abstraction

The `LLMProvider` abstract base class decouples chatbot logic from the underlying model. Currently implemented by `llama_cpp_provider` (Mistral 7B Instruct, local GGUF).

**Future providers:**
- OpenAI `gpt-3.5` / `gpt-4` via API
- Google Gemini via API
- Any externally hosted LLM
