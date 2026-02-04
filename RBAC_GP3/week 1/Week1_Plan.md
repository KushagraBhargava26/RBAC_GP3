# 📅 Week 1 Plan: Environment Setup & Data Exploration

## 🎯 Objective
Configure your development environment, explore the company documents, and create a role-to-document mapping for the RBAC chatbot system.

---

## ✅ Tasks Checklist

### Task 1: Set Up Python Virtual Environment
```bash
# Step 1: Create a virtual environment
python -m venv venv

# Step 2: Activate the virtual environment
# On Windows:
venv\Scripts\activate

# On Mac/Linux:
source venv/bin/activate
```

### Task 2: Install Required Dependencies
```bash
pip install fastapi streamlit langchain sentence-transformers pandas uvicorn python-dotenv
```

> **Tip:** Create a `requirements.txt` file to store all dependencies.

---

### Task 3: Clone the RAG Documents Repository
```bash
git clone https://github.com/springboardmentor441p-coderr/Fintech-data.git
```

This repository contains all the company documents (markdown and CSV files) that will be used for the RAG pipeline.

---

### Task 4: Explore the Documents
Review all documents in these folders:
- **Finance/** - Financial reports, budgets, revenue data
- **Marketing/** - Marketing strategies, campaign reports
- **HR/** - Employee policies, handbooks
- **Engineering/** - Technical documentation
- **General/** - Company-wide information, general handbook

**What to look for:**
- Document format (markdown `.md` or CSV `.csv`)
- Content type and structure
- Keywords and topics covered
- Sensitive information levels

---

### Task 5: Create Role-to-Document Mapping

| Role | Documents Access |
|------|------------------|
| **Finance** | Financial reports, budgets, revenue docs |
| **Marketing** | Marketing reports, campaign data |
| **HR** | Employee data, HR policies |
| **Engineering** | Technical docs, architecture files |
| **C-Level** | ✅ ALL documents (full access) |
| **Employees** | General handbook, company policies |

Create this mapping in a JSON file: `config/document_mapping.json`

```json
{
  "roles": {
    "Finance": ["Finance/*"],
    "Marketing": ["marketing/*"],
    "HR": ["HR/*"],
    "Engineering": ["engineering/*"],
    "C-Level": ["*"],
    "Employees": ["general/*"]
  }
}
```

---

### Task 6: Create Project Folder Structure
Set up this folder organization:

```
RBAC-Week-1-GP3/
├── config/
│   └── document_mapping.json     # Role-document mapping
├── data/
│   └── raw/                      # Clone Fintech-data here
├── docs/
│   └── data_exploration_report.md # Your exploration findings
├── src/
│   ├── __init__.py
│   └── data_loader.py            # Document loading utilities
├── requirements.txt
├── .env                          # Environment variables
└── README.md
```

---

## 📋 Week 1 Deliverables

| Deliverable | Status |
|-------------|--------|
| Python virtual environment configured | ⬜ |
| All dependencies installed | ⬜ |
| GitHub repo cloned | ⬜ |
| Project folder structure created | ⬜ |
| Documents explored and understood | ⬜ |
| Role-document mapping created | ⬜ |
| Data exploration report written | ⬜ |

---

## 📊 Data Exploration Report Template

Create a file `docs/data_exploration_report.md` with:

```markdown
# Data Exploration Report

## Summary
- Total documents: [count]
- Markdown files: [count]
- CSV files: [count]

## Document Breakdown by Department

### Finance
- Files: [list files]
- Content: [brief description]

### Marketing
- Files: [list files]
- Content: [brief description]

### HR
- Files: [list files]
- Content: [brief description]

### Engineering
- Files: [list files]
- Content: [brief description]

### General
- Files: [list files]
- Content: [brief description]

## Key Observations
- [Your findings]

## Next Steps
- Prepare documents for embedding (Week 2)
```

---

## 🔗 Architecture Overview

**Data Ingestion Flow (What you're preparing for):**
```
GitHub Repo → Document Processing → Metadata Tagging → Vector Database
   (md, csv)    (Parse, Chunk)     (Assign Roles)    (Embeddings)
```

---

## ⏰ Estimated Time
- Environment setup: 30 minutes
- Cloning & exploring docs: 1-2 hours
- Role mapping creation: 1 hour
- Exploration report: 2-3 hours

**Total: ~5-6 hours**

---

## 💡 Tips for Success
1. **Document everything** - Take notes as you explore each document
2. **Understand the content** - Know what each department's documents contain
3. **Think about access control** - Which roles should see which documents?
4. **Prepare for Week 2** - The vector database indexing comes next

---

Good luck with Week 1! 🚀
