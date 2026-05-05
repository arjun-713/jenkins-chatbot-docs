# Data Collection

Scripts for collecting data from four key sources. All scripts live under `chatbot-core/data/collection/`.

> **Note:** Make sure you're in the `chatbot-core/` directory with the virtual environment activated before running any script.

## Jenkins Documentation

**Script:** `data/collection/docs_crawler.py`

Recursively crawls the [Jenkins official documentation](https://www.jenkins.io/doc/) from the base URL. Collects main content from each page and stores it in a structured JSON file.

- **Input:** None — the script crawls from the base URL automatically
- **Output:** `chatbot-core/data/raw/jenkins_docs.json`

```bash
python data/collection/docs_crawler.py
```

## Discourse Topics

A three-step pipeline that fetches community discussions from the [Jenkins Discourse forum](https://community.jenkins.io) under the "Using Jenkins" category.

### Step 1 — Fetch Topic List

**Script:** `discourse_topics_retriever.py`

```bash
python data/collection/discourse_topics_retriever.py
```
- **Output:** `chatbot-core/data/raw/discourse_topic_list.json`

### Step 2 — Filter Topics

**Script:** `collection_utils/filter_discourse_threads.py`

Keeps only topics with an accepted answer.

```bash
python data/collection/collection_utils/filter_discourse_threads.py
```
- **Input:** `discourse_topic_list.json`
- **Output:** `chatbot-core/data/raw/filtered_discourse_topics.json`

### Step 3 — Fetch Post Content

**Script:** `discourse_fetch_posts.py`

```bash
python data/collection/discourse_fetch_posts.py
```
- **Input:** `filtered_discourse_topics.json`
- **Output:** `chatbot-core/data/raw/topics_with_posts.json`

## Stack Overflow Threads

### Step 1 — Export CSV from StackExchange Data Explorer

Run the following SQL query at [StackExchange Data Explorer](https://data.stackexchange.com/stackoverflow/query/new):

```sql
SELECT TOP 1000
    q.Id AS [Question ID],
    q.Title AS [Question Title],
    q.Body AS [Question Body],
    q.Tags AS [Tags],
    q.CreationDate,
    q.Score AS [Question Score],
    a.Id AS [Accepted Answer ID],
    a.Score AS [Answer Score],
    a.Body AS [Answer Body]
FROM Posts q
INNER JOIN Posts a ON q.AcceptedAnswerId = a.Id
WHERE
    q.Tags LIKE '%<jenkins>%'
    AND q.Score >= 1
    AND q.CreationDate >= '2020-01-01'
ORDER BY q.Score DESC
```

Download the result as CSV and place it at: `chatbot-core/data/raw/QueryResults.csv`

### Step 2 — Convert CSV to JSON

```bash
python data/collection/collection_utils/convert_stack_threads.py
```
- **Output:** `chatbot-core/data/raw/stack_overflow_threads.json`

## Jenkins Plugins

### Step 1 — Retrieve Plugin Names

**Script:** `fetch_list_plugins.py`

Fetches all available plugin names from the [Jenkins update site](https://updates.jenkins.io/experimental/latest/).

```bash
python data/collection/fetch_list_plugins.py
```
- **Output:** `chatbot-core/data/raw/plugin_names.json`

### Step 2 — Fetch Plugin Documentation

**Script:** `jenkins_plugin_fetch.py`

```bash
python data/collection/jenkins_plugin_fetch.py
```
- **Input:** `plugin_names.json`
- **Output:** `chatbot-core/data/raw/plugin_docs.json`
