# Testing

Testing plays a central role in the development of this project. The test suite covers the full stack — from data processing to API endpoints and frontend interactions — and is integrated into the CI pipeline.

## Backend Testing

Backend testing uses **pytest**, the de-facto testing framework for Python.

### Unit Tests

Covered individual modules:
- Data preprocessing utilities
- API services
- Memory management
- File processing and validation

**Strategy:** Extensive use of mocks to focus on each function's specific behavior.

### Integration Tests

Ensured the full request-response cycle works correctly, validating interactions between:
- API
- Retriever
- Language model
- File upload handling

**Strategy:** Only the generation function is mocked, allowing real component interactions to be tested end-to-end.

### Running Backend Tests

```bash
make run-test
```

Or with test mode (no local LLM needed):
```bash
PYTEST_VERSION=1 pytest chatbot-core/tests/
```

## Frontend Testing

Frontend testing uses **Jest** and **React Testing Library**.

### Unit Tests

Validated isolated components:
- Buttons and input fields
- Chat messages
- File attachment UI
- Export functionality

### Running Frontend Tests

```bash
cd frontend
npm test
```

## Static Analysis

Static analysis tools are configured for both Python and TypeScript to maintain code quality.

### Python
```bash
# From chatbot-core/
flake8 .
black --check .
```

### TypeScript / React
```bash
cd frontend
npm run lint
```

**Benefits:**
- Enforces consistent style conventions
- Catches common programming mistakes
- Improves readability for future contributors
- Aligns with best practices across both language ecosystems

## CI Integration

All tests run automatically in the **Continuous Integration** pipeline. Every pull request triggers the full test suite, verifying new changes don't break existing functionality.
