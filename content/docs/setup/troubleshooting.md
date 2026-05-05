# Troubleshooting

Common issues encountered during setup and how to resolve them.

## Model Download Stuck / Frozen

**Symptom:** The application appears "stuck" or frozen during the first run.

**Cause:** The system is downloading the embedding model (`all-MiniLM-L6-v2`, ~80 MB) or initializing the LLM.

**Solution:** This is normal on first run. Please wait a few minutes. Ensure you have a stable internet connection.

---

## Python Version Mismatch

**Symptom:** `SyntaxError` or `ModuleNotFoundError` during setup or execution.

**Solution:**
1. Verify you're using **Python 3.11+**:
   ```bash
   python --version
   ```
2. Ensure the virtual environment is activated:
   ```bash
   source chatbot-core/venv/bin/activate
   ```

---

## llama-cpp-python Fails to Install

**Symptom:** `pip install llama-cpp-python` fails with errors mentioning `cmake`, `gcc`, or "failed building wheel".

**Cause:** `llama-cpp-python` requires a C/C++ toolchain and CMake to build native extensions.

**Solution:**

For Linux (Ubuntu/Debian/WSL2):
```bash
sudo apt install build-essential cmake
pip install llama-cpp-python
```

For macOS:
```bash
brew install cmake
pip install llama-cpp-python
```

---

## Memory Limits (OOM Killed)

**Symptom:** The process is killed during startup or inference.

**Cause:** The full LLM requires significant RAM (8 GB+).

**Solution:** Run in **Lite Mode** first:
```bash
make dev-lite
```

---

## Missing Dependencies

**Symptom:** Import errors during startup.

**Solution:** Re-run dependency installation:
```bash
pip install -r chatbot-core/requirements.txt
```

---

## API Not Responding

**Symptom:** `curl` to `http://127.0.0.1:8000` fails or times out.

**Verification steps:**
1. Check that `(venv)` appears in your terminal prompt
2. Run `make dev-lite` — it should start without errors
3. Test the API:
   ```bash
   curl -X POST http://127.0.0.1:8000/api/chatbot/sessions
   ```
   It should return a session response with a `session_id`.

---

## CORS Errors in Production

**Symptom:** Browser console shows CORS policy errors when accessing from Jenkins.

**Cause:** The default config uses `*` as the allowed origin, which some browsers block in certain contexts.

**Solution:** Edit `chatbot-core/api/config/config.yml`:
```yaml
cors:
  allowed_origins:
    - "http://localhost:8080"
    - "https://jenkins.example.com"
```

Restart the API after saving.
