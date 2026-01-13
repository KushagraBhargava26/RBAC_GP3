# 📘 RBAC Metadata Mapping Documentation

## 📌 Project
**Financial Domain Internal Chatbot with Role-Based Access Control (RBAC)**

This document defines the metadata structure and access control rules used to enforce **Role-Based Access Control (RBAC)** in a Retrieval-Augmented Generation (RAG) system.

---

## 1️⃣ Role Hierarchy

### 🔹 Role Hierarchy Diagram

C-Level Executives
↓
Department Heads
↓
Employees

### 🔹 Role Definitions
-----------------------------------------------------------------------------------
| Role             | Access Level     | Description                               |
|------------------|------------------|-------------------------------------------|
| C-Level          | Full Access      | Can access all departmental documents     |
| Department Head  | Department-Level | Access restricted to their own department |
| Employee         | Limited          | Access only to general documents          |
-----------------------------------------------------------------------------------

## 2️⃣ Department–Role Mapping
-------------------------------------------------------------------------------
| Department | Document Types                     | Accessible Roles          |
|------------|------------------------------------|---------------------------|
| Finance    | Budgets, Invoices, Revenue Reports | C-Level, Finance Head     |
| HR         | Payroll, Policies, Hiring Documents| C-Level, HR Head          |
| Marketing  | Campaign Reports, Advertising Data | C-Level, Marketing Head   |
| Engineering| API Docs, Architecture Files       | C-Level, Engineering Head |
| General    | Company Policies                   | All Roles                 |
-------------------------------------------------------------------------------

## 3️⃣ Document Classification Rules

### 📂 Folder-Based Classification
---------------------------------------------
| Folder Path         | Assigned Department |
|---------------------|---------------------|
| `/data/finance/`    | Finance             |
| `/data/hr/`         | HR                  |
| `/data/marketing/`  | Marketing           |
| `/data/engineering/`| Engineering         |
| `/data/general/`    | General             |
---------------------------------------------

### 🔑 Keyword-Based Classification
--------------------------------------------------
| Keyword                  | Assigned Department |
|--------------------------|-------------------- |
| invoice, tax, revenue    | Finance             |
| payroll, employee, leave | HR                  |
| campaign, ads, SEO       | Marketing           |
| API, backend, deployment | Engineering         |
--------------------------------------------------

### ⚠️ Default Classification Rule

If no rule matches, assign:

department = "General"


## 4️⃣ Chunk Metadata Schema

Each document chunk must follow the schema below:

```json
{
  "chunk_id": "finance_023",
  "content": "This section explains quarterly revenue analysis...",
  "department": "Finance",
  "accessible_roles": ["C-Level", "Finance Head"],
  "source": "finance_reports/Q1_2025.md"
}

----------------------------------------------------------
| Field            | Description                         |
| ---------------- | ----------------------------------- |
| chunk_id         | Unique identifier for each chunk    |
| content          | Text content of the chunk           |
| department       | Classified department               |
| accessible_roles | Roles permitted to access the chunk |
| source           | Original document reference         |
----------------------------------------------------------
## 5️⃣ Access Control Matrix

This matrix defines which **roles** are permitted to access documents from each department.
------------------------------------------------------
| Department  | Roles with Access                    |
|-------------|--------------------------------------|
| Finance     | C-Level, Finance Head                |
| HR          | C-Level, HR Head                     |
| Marketing   | C-Level, Marketing Head              |
| Engineering | C-Level, Engineering Head            |
| General     | C-Level, Department Heads, Employees |
------------------------------------------------------

### 🔎 Access Rules Explanation

- **C-Level** users have unrestricted access to all departments.
- **Department Heads** can access documents related only to their respective departments.
- **Employees** can access only **General** documents shared across the organization.

6️⃣ Examples
🔍 Example 1: Finance User Query

User Role: Finance Head
Query: "Show quarterly revenue details"

Accessible:

Finance documents

General company policies

Restricted:

HR payroll files 

Engineering system designs

🔍 Example 2: C-Level User Query

User Role: CEO
Query: "Show all internal reports"

Accessible:

Finance

HR

Marketing

Engineering

General

➡️ Full access granted

✅ Conclusion

This RBAC metadata mapping ensures:

Secure, role-based document access

Department-level isolation

Scalable metadata-driven authorization

Compliance with enterprise security practices