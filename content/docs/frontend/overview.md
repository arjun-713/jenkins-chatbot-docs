# Frontend

The chatbot UI is built with **React + TypeScript + Vite** and is injected into every Jenkins page via a global decorator extension.

## Directory Structure

```
frontend/
├── src/
│   ├── api/          # API utilities for backend communication
│   ├── components/   # React components
│   ├── data/         # Static text used in the UI
│   ├── model/        # TypeScript interfaces and types
│   ├── styles/       # Style definitions
│   ├── tests/        # Unit and integration tests
│   └── utils/        # Utility functions
├── dist/             # Build output (Vite, ignored in Git)
├── vite.config.ts
└── package.json
```

## Setup and Build

> Use the latest **Node.js LTS** (project built with Node 24). Ensure `npm` is available.

```bash
cd frontend
npm install
npm run build
```

The build output is copied to `src/main/webapp/static/`.

Then start Jenkins:
```bash
cd ..
mvn hpi:run
```

## Using the Chatbot in Jenkins

Once Jenkins is running, look for the **💬 button** in the **bottom-right corner**.

| Action | How |
|--------|-----|
| Send a message | Type and press `Enter` |
| New line | `Shift + Enter` |
| Attach a file | Click the attachment icon |
| Clear conversation | **"Clear chat"** button in the header |
| Cancel in-progress response | Click the cancel button |
| Export chat | Use the export menu (TXT, MD, DOCX, PDF) |

> Sessions persist on page refresh but are cleared when the tab or browser is closed.

## UI Integration in Jenkins

The plugin uses a **`PageDecorator`** extension to inject the React chatbot into every Jenkins page globally.

### `ChatbotGlobalDecorator.java`

Located at:
```
src/main/java/io/jenkins/plugins/chatbot/ChatbotGlobalDecorator.java
```

Registers a decorator that looks for a corresponding Jelly template to render additional content on all pages.

### `footer.jelly`

Located at:
```
src/main/resources/io/jenkins/plugins/chatbot/ChatbotGlobalDecorator/footer.jelly
```

Injects the React root element and the compiled JavaScript bundle:
- `<div id="chatbot-root"></div>` — mount point for the React app
- Script loads `src/main/webapp/static/assets/index.js`

## Features

| Feature | Description |
|---------|-------------|
| Real-time streaming | Responses stream token-by-token via WebSocket |
| File attachments | 30+ file types including logs, code, configs, images |
| Session persistence | Chat history survives page refreshes |
| Export chat | TXT, MD, DOCX, PDF formats |
| Cancel messages | Abort in-flight generation |
| Multiline input | `Shift + Enter` for new lines |
