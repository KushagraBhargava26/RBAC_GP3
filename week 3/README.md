# Week 3: Vector Embedding Generation

## Overview
This module generates vector embeddings for the chunked documents created in Week 2. The embeddings enable semantic search capabilities for the RBAC (Role-Based Access Control) chatbot.

## Author
**Arshad** - Lead for Vector Embedding Generation

## Dependencies
- Python 3.8+
- sentence-transformers
- torch

## Installation
```bash
pip install sentence-transformers torch
```

## Folder Structure
```
week 3/
├── src/
│   └── embeddings.py        # Main embedding generation script
├── output/
│   └── chunk_embeddings.json # Generated embeddings (output)
└── README.md
```

## Input
- **File**: `../week 2/output/chunked_documents.json`
- **Format**: JSON array of document chunks
- **Fields per chunk**:
  - `chunk_id`: Unique identifier
  - `content`: Text content
  - `source_file`: Original document path
  - `token_count`: Number of tokens

## Output
- **File**: `output/chunk_embeddings.json`
- **Format**: JSON array of embedded chunks
- **Fields per chunk**:
  - `chunk_id`: Unique identifier
  - `content`: Original text content
  - `source_file`: Original document path
  - `token_count`: Number of tokens
  - `embedding`: 384-dimensional vector (list of floats)

## Model
- **Name**: `all-MiniLM-L6-v2`
- **Embedding Dimension**: 384
- **Provider**: SentenceTransformers (Hugging Face)
- **Use Case**: General-purpose semantic similarity and search

## Usage
```bash
cd "week 3/src"
python embeddings.py
```

## Expected Output
```
============================================================
VECTOR EMBEDDING GENERATION - Week 3
============================================================

Loading chunked documents from: ...\week 2\output\chunked_documents.json
Loaded X chunks successfully!

Initializing SentenceTransformer model: all-MiniLM-L6-v2
Model loaded successfully! Embedding dimension: 384

============================================================
Starting embedding generation...
============================================================

Generated embedding for chunk 1/X - chunk_0001
Generated embedding for chunk 2/X - chunk_0002
...

============================================================
EMBEDDING GENERATION SUMMARY
============================================================
Total embeddings: X, Dimension: 384
✅ SUCCESS: All chunks have 384-dimensional embeddings!
============================================================
```

## Next Steps
The generated embeddings will be used in:
- **Week 4**: Role-Based Search & Query Processing
- Vector database integration (ChromaDB/FAISS)
- Semantic similarity search for RAG chatbot

## Notes
- First run may take longer as the model is downloaded (~80MB)
- Embeddings are stored as JSON for compatibility
- For production, consider using binary format (pickle/HDF5) for efficiency
