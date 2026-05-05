# Data Pipeline

The data pipeline forms the backbone of the chatbot. It collects Jenkins-related content from multiple sources, cleans and normalizes it, converts it to embeddings, and stores it for efficient semantic search.

## Pipeline Phases

```
Data Sources → Collection → Preprocessing → Chunking → Embedding → Vector Storage
```

### Run the Full Pipeline

```bash
make run-data-pipeline
```

> **Note:** StackOverflow data collection is not included by default. See [Data Collection](/docs/data-pipeline/collection) for instructions.

## Data Sources

Four categories of resources were selected as the most valuable information sources:

| Source | URL | Collection Method |
|--------|-----|-------------------|
| Jenkins Official Docs | https://www.jenkins.io/doc/ | Web crawler |
| Plugin Documentation | https://plugins.jenkins.io/ | Two-step crawler |
| Discourse Community | https://community.jenkins.io | Discourse API |
| Stack Overflow | https://data.stackexchange.com | StackExchange Data Explorer |

## Pipeline Stages Overview

### 1. Data Collection
Each source has a tailored collection strategy. See [Data Collection](/docs/data-pipeline/collection) for per-source instructions.

### 2. Preprocessing
Raw data is cleaned and filtered per source:
- **Jenkins Docs**: Removes navigation, scripts, images, and low-value pages (&lt;300 chars or excessive link density)
- **Plugins**: Removes boilerplate, filters trivial descriptions (&lt;60 chars)
- **Discourse**: Cleaning handled during collection via structured API
- **Stack Overflow**: Pre-filtered during SQL export (accepted answers, score ≥ 1, post-2020)

### 3. Chunking
Large documents are split into manageable chunks using [LangChain's Text Splitter](https://python.langchain.com/docs/modules/data_connection/document_transformers/), following these principles:
- Preserve semantic coherence (no mid-sentence splits)
- Leverage HTML structure (headings, lists) where possible
- Apply sliding windows for context overlap between adjacent chunks

### 4. Embedding
Chunks are converted to vectors using `all-MiniLM-L6-v2` — a sentence transformer model balancing accuracy and computational cost.

### 5. Vector Storage
Embeddings are stored in **FAISS** (Facebook AI Similarity Search):
- All sources are stored in a unified index
- Supports fast semantic similarity search at query time
- Later extended with hybrid search (semantic + BM25 keyword)
