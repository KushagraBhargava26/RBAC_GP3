# 📘 Vector Database Architecture

## 📌 Project
**Financial Domain Internal Chatbot with Role-Based Access Control (RBAC)**

## 📅 Week
**Week 3 – Vector Database Architecture Documentation**

---

## 1️⃣ Overview

### 🔹 What is a Vector Database?
A vector database is a specialized data storage system designed to:
- Store high-dimensional vector embeddings
- Perform fast similarity (semantic) search
- Retrieve information based on meaning rather than exact keywords

Vector databases are a foundational component of **Retrieval-Augmented Generation (RAG)** systems.

---

### 🔹 Why ChromaDB?
ChromaDB is used in this project because it provides:
- A Python-first and developer-friendly API
- Fast local development and testing capabilities
- Native support for metadata-based filtering
- Seamless integration with LangChain
- Lightweight, open-source, and production-ready design

---

### 🔹 Use Case for RBAC Chatbot
In the RBAC-enabled chatbot:
- Documents are split into chunks
- Each chunk is embedded and stored in a vector database
- User queries retrieve only **authorized content**
- Metadata-based RBAC filtering prevents data leakage

---

## 2️⃣ Embedding Model

### 🔹 Model Details
- **Model Name:** `all-MiniLM-L6-v2`
- **Embedding Dimension:** 384

---

### 🔹 Why This Model?
The `all-MiniLM-L6-v2` model is chosen due to its balance of:

- **Speed:** Fast embedding generation for real-time queries
- **Quality:** Strong semantic understanding
- **Size:** Lightweight and memory-efficient
- **Stability:** Widely adopted and well-supported

This makes it ideal for scalable chatbot systems.

---

## 3️⃣ Architecture Diagram

### 🔹 Vector Indexing & Query Flow (ASCII Diagram)

Raw Document
     ↓
Text Chunking
     ↓
Embedding Generation
     ↓
Vector Index (ChromaDB)
     ↓
Similarity Search
     ↓
Metadata Filtering (RBAC)
     ↓
Authorized Results


---

## 4️⃣ Collection Schema

Each vector collection follows the schema below:

### 🔹 Core Fields

-----------------------------------------------------
| Field     | Description                           |
|-----------|---------------------------------------|
| chunk_id  | Unique identifier for each text chunk |
| content   | Original chunk text                   |
| embedding | 384-dimensional vector representation |
| metadata  | RBAC and source-related information   |
-----------------------------------------------------

---

### 🔹 Metadata Structure

```json
{
  "department": "Finance",
  "accessible_roles": ["C-Level", "Finance Head"],
  "source": "finance_reports/Q1_2025.md"
}
5️⃣ Query Flow
🔹 Step-by-Step Query Execution

User Query → Embedding
The user query is converted into a vector using the same embedding model.

Similarity Search
The vector database performs nearest-neighbor search to find relevant chunks.

Metadata Filtering
RBAC filters are applied using:

department

accessible_roles

Return Results
Only authorized and relevant document chunks are returned to the chatbot.

6️⃣ Performance Considerations
⚡ Batch Indexing

Documents are processed in batches during ingestion

Improves indexing speed and reduces overhead

⚡ Query Optimization

Limit top-k search results

Use cosine similarity for efficient matching

Apply metadata filters early to reduce search space

⚡ Scaling Strategies

Separate collections by department if data volume increases

Persist embeddings to disk

Migrate to distributed vector databases when required

Cache frequently asked queries for faster responses

✅ Conclusion

This vector database architecture enables:

Efficient semantic search through high-quality embeddings

Secure role-based retrieval using metadata-driven RBAC filtering

Scalable and maintainable RAG pipelines

Enterprise-grade access control for internal chatbot systems