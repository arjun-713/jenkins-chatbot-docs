# Linux Setup Guide

Full installation instructions for Linux.

## Prerequisites

- Python 3.11 or later
- Git
- Maven (for the Java components)
- At least 5 GB of free disk space (for models and dependencies)

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd resources-ai-chatbot-plugin
```

### 2. Build the Maven Project

```bash
mvn install
```

### 3. Set Up the Python Environment

Navigate to the Python subproject directory:

```bash
cd chatbot-core
```

Create and activate a virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate
```

### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

> **Note:** The backend requires `python-multipart` for multipart form handling. If you encounter runtime errors related to multipart requests, run:
> ```bash
> pip install python-multipart
> ```

### 5. Set `PYTHONPATH`

```bash
export PYTHONPATH=$(pwd)
```

### 6. Download the Required Model

Create the model directory:

```bash
mkdir -p api/models/mistral
```

Download the **Mistral 7B Instruct (v0.2 Q4_K_M)** GGUF model from [Hugging Face](https://huggingface.co/TheBloke/Mistral-7B-Instruct-v0.2-GGUF) and place it in `api/models/mistral/`.

> **Note:** By default, the backend attempts to load the local GGUF model during startup. If the model file is missing, the server will fail to start.

## Automatic Setup with Makefile

To avoid running all steps each time, use the Makefile target:

```bash
make setup-backend
```

For CPU-only setup:

```bash
make setup-backend IS_CPU_REQ=1
```

> **Note:** The `make api` target automatically runs `setup-backend` if the backend has not already been set up.

## Running Without a Local LLM (Test Mode)

Contributors who don't need local inference can use test mode, which disables local LLM loading:

```bash
PYTEST_VERSION=1 make api
```

## Production Hardening: CORS

The default config uses a wildcard origin (`*`) intended **for local development only**. Before exposing the API beyond `localhost`, restrict `allowed_origins` in `chatbot-core/api/config/config.yml`:

```yaml
cors:
  allowed_origins:
    - "http://localhost:8080"        # local Jenkins
    - "https://jenkins.example.com"  # production Jenkins origin
```

Restart the API after changing the config.
