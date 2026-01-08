# Week 2: Document Chunking & Tokenization

## 📋 Overview

This module handles the chunking and tokenization of documents for the RBAC Chatbot project. It processes all markdown files from the Week 1 data folder and splits them into manageable chunks suitable for embedding and retrieval.

## 🎯 Objectives

- Read all markdown files from `week 1/data/` recursively
- Split documents into chunks of 300-512 tokens
- Apply 50-token overlap between chunks for context preservation
- Assign unique chunk IDs (e.g., `chunk_0001`, `chunk_0002`)
- Output structured JSON for downstream processing

## 📁 Folder Structure

```
week 2/
├── src/
│   └── chunking.py          # Main chunking script
├── output/
│   └── chunked_documents.json   # Generated output
└── README.md                # This file
```

## 🔧 Dependencies

- `tiktoken` - OpenAI tokenizer for accurate token counting
- `langchain-text-splitters` - RecursiveCharacterTextSplitter for intelligent chunking

## 🚀 Usage

### 1. Install Dependencies

```bash
pip install tiktoken langchain langchain-text-splitters
```

### 2. Run the Script

```bash
cd "week 2/src"
python chunking.py
```

### 3. Verify Output

Check that `week 2/output/chunked_documents.json` exists and contains the chunked documents.

## 📤 Output Format

The output JSON file contains an array of chunk objects:

```json
[
  {
    "chunk_id": "chunk_0001",
    "content": "The actual text content of the chunk...",
    "source_file": "week 1/data/Finance/financial_summary.md",
    "token_count": 342
  },
  ...
]
```

## ⚙️ Configuration

The chunking parameters can be adjusted in `chunking.py`:

| Parameter | Value | Description |
|-----------|-------|-------------|
| `CHUNK_SIZE_MIN` | 300 | Minimum tokens per chunk |
| `CHUNK_SIZE_MAX` | 512 | Maximum tokens per chunk |
| `CHUNK_OVERLAP` | 50 | Token overlap between consecutive chunks |

## 👥 Team

- **Lead**: Arshad (Document Chunking & Tokenization)

## 📅 Timeline

- **Created**: Week 2 of RBAC Chatbot Project
- **Branch**: `arshad/week2`
