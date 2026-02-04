# 🤖 RAG Pipeline Documentation

## 📌 Project
**Financial Domain Internal Chatbot with Role-Based Access Control (RBAC)**

This document describes the **Retrieval-Augmented Generation (RAG) pipeline**, explaining how user queries are authenticated, relevant knowledge is retrieved securely, and accurate responses are generated.

---

## 1️⃣ Architecture Overview

### 🔹 End-to-End RAG Flow (ASCII Diagram)

User Query
↓
Authentication (JWT + RBAC)
↓
Knowledge Retrieval (Vector DB)
↓
RBAC Filtering
↓
Response Generation (LLM)
↓
Final Answer to User

yaml
Copy code

### 🔹 Overview Explanation
The RAG pipeline combines **semantic retrieval** with **large language models (LLMs)** while enforcing **role-based access control**, ensuring users receive accurate and authorized responses.

---

## 2️⃣ Component Descriptions

### 🔹 LLM Client
- Interfaces with the selected Large Language Model
- Generates natural-language responses
- Uses retrieved context as grounding knowledge

---

### 🔹 Prompt Builder
- Constructs structured prompts for the LLM
- Combines:
  - User query
  - Retrieved document chunks
  - System instructions
- Ensures consistent and safe output formatting

---

### 🔹 Citation System
- Tracks which document chunks contributed to the answer
- Provides source references for transparency
- Improves trust and auditability

---

### 🔹 Confidence Scorer
- Evaluates confidence of the generated response
- Based on:
  - Similarity scores
  - Number of supporting chunks
- Helps decide whether to:
  - Return the answer
  - Ask for clarification
  - Provide a fallback response

---

## 3️⃣ API Reference

### 🔹 POST `/rag/query`

Executes the full RAG pipeline for a user query.

---

### 🔹 Request Format

```json
{
  "query": "What was the Q1 revenue?",
  "user_role": "finance",
  "department": "Finance"
}
🔹 Response Format
json
Copy code
{
  "answer": "The Q1 revenue was ₹25 crores.",
  "confidence_score": 0.87,
  "sources": [
    "finance_reports/Q1_2025.md"
  ]
}
4️⃣ Usage Examples
🔹 Finance User Query Example
Input:

json
Copy code
{
  "query": "What is the quarterly financial summary?",
  "user_role": "finance",
  "department": "Finance"
}
Behavior:

Retrieves Finance documents

Passes RBAC filter

Generates answer using financial reports only

🔹 HR User Query Example
Input:

json
Copy code
{
  "query": "What are the employee leave policies?",
  "user_role": "hr",
  "department": "HR"
}
Behavior:

Searches HR documents

Blocks access to Finance data

Responds using HR policy documents

5️⃣ Configuration Guide
🔹 Changing the LLM Provider
To switch the LLM provider:

Update the LLM client configuration

Modify API keys and model name

Ensure prompt format compatibility

Test response quality and latency

🔹 Tuning Confidence Thresholds
Increase threshold to reduce hallucinations

Decrease threshold for broader answers

Recommended range: 0.7 – 0.85

Configure fallback responses for low confidence

✅ Conclusion
This RAG pipeline design enables secure, role-aware, and context-grounded responses by integrating semantic retrieval with large language models. Through RBAC filtering, citation tracking, and confidence scoring, the system ensures reliability, transparency, and enterprise-grade security for internal chatbot applications.