# Windows / WSL2 Setup Guide

Full installation instructions for Windows machines.

## Prerequisites

- Windows 10 or 11
- Python 3.11 or later
- Git
- Maven (for the Java components)
- At least 5 GB of free disk space

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

```bash
cd chatbot-core
python3 -m venv venv
.\\venv\\Scripts\\activate
```

### 4. Install Dependencies (CPU-only)

On Windows, use the CPU-only requirements file to avoid NVIDIA CUDA dependency issues:

```bash
pip install -r requirements-cpu.txt
```

> **Note:** If you encounter dependency issues with NVIDIA packages, always use `requirements-cpu.txt`.

### 5. Set `PYTHONPATH`

```powershell
$env:PYTHONPATH = (Get-Location).Path
```

### 6. Download the Required Model

```bash
mkdir -p api\\models\\mistral
```

Download **Mistral 7B Instruct (v0.2 Q4_K_M)** from [Hugging Face](https://huggingface.co/TheBloke/Mistral-7B-Instruct-v0.2-GGUF) and place the `.gguf` file in `api\\models\\mistral\\`.

## Running Without a Local LLM (Test Mode)

```bash
PYTEST_VERSION=1 make api
```

## Troubleshooting

### llama-cpp-python fails to install

**Symptoms:** `pip install llama-cpp-python` fails with errors mentioning `cmake`, `gcc`, or "failed building wheel".

**Cause:** `llama-cpp-python` requires a working C/C++ toolchain and CMake.

**Solution (WSL2/Ubuntu):**
```bash
sudo apt install build-essential cmake
pip install llama-cpp-python
```

### Python Version Mismatch

- Ensure you're using **Python 3.11+**: `python --version`
- Ensure the virtual environment is activated

### Memory Limits

If the process is killed (OOM), ensure you have at least 8 GB of RAM. Try **Lite Mode** first:

```bash
make dev-lite
```
