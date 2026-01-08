// RBAC Group 3 - Offline Task Manager (Manual Mode)
// ---------------------------------------------------------
// Milestone 1: Data Preparation & Vector DB (Weeks 1-2)
// ---------------------------------------------------------

// Team Members
const teamMembers = [
    'Arshad Pasha', 'Depuru Joshika Reddy', 'Guru Karthik Reddy Marthala',
    'Kavya Ghantasala', 'Kushagra Bhargava', 'Mandha Shirisha',
    'Sri Saranya Chandrapati', 'Vinuthna Jangam'
];

// =====================================================
// WEEK 2 TASKS (Module 2: Document Preprocessing)
// =====================================================
const week2Tasks = [
    // 1. Arshad (HARDEST) - Document Chunking & Tokenization
    {
        id: 201,
        title: 'Document Chunking & Tokenization (300-512 tokens)',
        assignee: 'Arshad Pasha',
        priority: 'high',
        description: `<strong>Goal:</strong> Split documents into optimal chunks for RAG.<br><br>
1. Load cleaned documents from preprocessing.<br>
2. Implement chunking logic (300-512 tokens per chunk).<br>
3. Add sequential identifiers to each chunk.<br>
4. Preserve context overlap between chunks.<br>
5. Test tokenization accuracy.<br><br>
<strong>📌 Output:</strong> Chunked document files with token counts.`,
        deepExplanation: `<h3>📘 Step-by-Step Guide: Document Chunking & Tokenization</h3>
<hr>
<h4>Step 1: Understand Token Limits</h4>
<p>RAG systems work best with chunks of 300-512 tokens. A "token" is roughly 4 characters or 0.75 words.</p>
<ul>
    <li>300 tokens ≈ 225 words</li>
    <li>512 tokens ≈ 384 words</li>
</ul>

<h4>Step 2: Install Required Libraries</h4>
<pre><code>pip install tiktoken langchain sentence-transformers</code></pre>

<h4>Step 3: Load Documents</h4>
<pre><code>from langchain.document_loaders import DirectoryLoader
loader = DirectoryLoader('./data/cleaned/', glob="**/*.md")
documents = loader.load()</code></pre>

<h4>Step 4: Implement Chunking</h4>
<pre><code>from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=400,  # ~300-512 tokens
    chunk_overlap=50,
    length_function=len,
    separators=["\\n\\n", "\\n", " ", ""]
)

chunks = splitter.split_documents(documents)</code></pre>

<h4>Step 5: Add Sequential IDs</h4>
<pre><code>for i, chunk in enumerate(chunks):
    chunk.metadata['chunk_id'] = f"chunk_{i:04d}"
    chunk.metadata['source_doc'] = chunk.metadata.get('source', 'unknown')</code></pre>

<h4>Step 6: Save Chunked Output</h4>
<pre><code>import json
with open('chunked_documents.json', 'w') as f:
    json.dump([{
        'id': c.metadata['chunk_id'],
        'content': c.page_content,
        'metadata': c.metadata
    } for c in chunks], f, indent=2)</code></pre>

<h4>Step 7: Validate Token Counts</h4>
<pre><code>import tiktoken
enc = tiktoken.get_encoding("cl100k_base")
for chunk in chunks[:5]:
    tokens = len(enc.encode(chunk.page_content))
    print(f"{chunk.metadata['chunk_id']}: {tokens} tokens")</code></pre>

<p><strong>✅ Success Criteria:</strong> All chunks are between 300-512 tokens with proper IDs.</p>`
    },

    // 2. Bhargava (Medium) - Parse Markdown Documents
    {
        id: 202,
        title: 'Parse Markdown Documents from GitHub',
        assignee: 'Kushagra Bhargava',
        priority: 'medium',
        description: `<strong>Goal:</strong> Extract content from all .md files.<br><br>
1. Clone the Fintech-data repository.<br>
2. Identify all markdown files in the repo.<br>
3. Parse titles, headings, and content.<br>
4. Save extracted data in structured format.<br><br>
<strong>📌 Output:</strong> Parsed markdown data (JSON/CSV).`,
        deepExplanation: `<h3>📘 Step-by-Step Guide: Parse Markdown Documents</h3>
<hr>
<h4>Step 1: Clone the Repository</h4>
<pre><code>git clone https://github.com/springboardmentor441p-coderr/Fintech-data.git
cd Fintech-data</code></pre>

<h4>Step 2: Find All Markdown Files</h4>
<pre><code>import os
import glob

md_files = glob.glob('**/*.md', recursive=True)
print(f"Found {len(md_files)} markdown files")</code></pre>

<h4>Step 3: Parse Each File</h4>
<pre><code>import re

def parse_markdown(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract title (first H1)
    title_match = re.search(r'^# (.+)$', content, re.MULTILINE)
    title = title_match.group(1) if title_match else os.path.basename(filepath)
    
    # Extract sections
    sections = re.split(r'^## ', content, flags=re.MULTILINE)
    
    return {
        'filename': filepath,
        'title': title,
        'content': content,
        'sections': len(sections)
    }</code></pre>

<h4>Step 4: Process All Files</h4>
<pre><code>parsed_docs = []
for md_file in md_files:
    parsed = parse_markdown(md_file)
    parsed_docs.append(parsed)
    print(f"Parsed: {parsed['title']}")</code></pre>

<h4>Step 5: Save Output</h4>
<pre><code>import json
with open('parsed_markdown.json', 'w') as f:
    json.dump(parsed_docs, f, indent=2)</code></pre>

<p><strong>✅ Success Criteria:</strong> All markdown files parsed with titles and content extracted.</p>`
    },

    // 3. Karthik (Medium) - Parse CSV Documents
    {
        id: 203,
        title: 'Parse CSV Documents from GitHub',
        assignee: 'Guru Karthik Reddy Marthala',
        priority: 'medium',
        description: `<strong>Goal:</strong> Extract and structure CSV data.<br><br>
1. Identify all CSV files in Fintech-data repo.<br>
2. Load each CSV using pandas.<br>
3. Analyze columns and data types.<br>
4. Convert to text format for RAG ingestion.<br><br>
<strong>📌 Output:</strong> Processed CSV data ready for embedding.`,
        deepExplanation: `<h3>📘 Step-by-Step Guide: Parse CSV Documents</h3>
<hr>
<h4>Step 1: Find All CSV Files</h4>
<pre><code>import glob
csv_files = glob.glob('Fintech-data/**/*.csv', recursive=True)
print(f"Found {len(csv_files)} CSV files")</code></pre>

<h4>Step 2: Load with Pandas</h4>
<pre><code>import pandas as pd

def load_csv(filepath):
    df = pd.read_csv(filepath)
    return {
        'filename': filepath,
        'columns': list(df.columns),
        'rows': len(df),
        'data': df
    }</code></pre>

<h4>Step 3: Convert to Text Format</h4>
<pre><code>def csv_to_text(df, filename):
    text_rows = []
    for idx, row in df.iterrows():
        row_text = "; ".join([f"{col}: {val}" for col, val in row.items()])
        text_rows.append(row_text)
    return "\\n".join(text_rows)</code></pre>

<h4>Step 4: Process and Save</h4>
<pre><code>csv_docs = []
for csv_file in csv_files:
    data = load_csv(csv_file)
    text = csv_to_text(data['data'], csv_file)
    csv_docs.append({
        'filename': csv_file,
        'text_content': text,
        'columns': data['columns']
    })

import json
with open('parsed_csv.json', 'w') as f:
    json.dump(csv_docs, f, indent=2)</code></pre>

<p><strong>✅ Success Criteria:</strong> All CSV data converted to text format for embedding.</p>`
    },

    // 4. Kavya (Medium) - Text Cleaning
    {
        id: 204,
        title: 'Text Cleaning & Normalization',
        assignee: 'Kavya Ghantasala',
        priority: 'medium',
        description: `<strong>Goal:</strong> Clean all extracted text data.<br><br>
1. Normalize whitespace (remove extra spaces/newlines).<br>
2. Remove special characters that break encoding.<br>
3. Handle UTF-8 encoding issues.<br>
4. Standardize formatting across documents.<br><br>
<strong>📌 Output:</strong> Cleaned text files ready for chunking.`,
        deepExplanation: `<h3>📘 Step-by-Step Guide: Text Cleaning</h3>
<hr>
<h4>Step 1: Create Cleaning Function</h4>
<pre><code>import re
import unicodedata

def clean_text(text):
    # Normalize unicode
    text = unicodedata.normalize('NFKC', text)
    
    # Remove special characters (keep basic punctuation)
    text = re.sub(r'[^\\w\\s.,!?;:\\-\\n]', '', text)
    
    # Normalize whitespace
    text = re.sub(r'\\s+', ' ', text)
    text = re.sub(r'\\n\\s*\\n', '\\n\\n', text)
    
    return text.strip()</code></pre>

<h4>Step 2: Handle Encoding Issues</h4>
<pre><code>def fix_encoding(text):
    try:
        # Try to fix common encoding issues
        text = text.encode('utf-8', errors='ignore').decode('utf-8')
    except:
        pass
    return text</code></pre>

<h4>Step 3: Process All Documents</h4>
<pre><code>import json

with open('parsed_markdown.json', 'r') as f:
    docs = json.load(f)

cleaned_docs = []
for doc in docs:
    cleaned = {
        'filename': doc['filename'],
        'title': doc['title'],
        'content': clean_text(fix_encoding(doc['content']))
    }
    cleaned_docs.append(cleaned)

with open('cleaned_documents.json', 'w') as f:
    json.dump(cleaned_docs, f, indent=2)</code></pre>

<p><strong>✅ Success Criteria:</strong> All documents cleaned with consistent formatting.</p>`
    },

    // 5. Shirisha (Medium) - Role-based Metadata
    {
        id: 205,
        title: 'Role-based Metadata Assignment',
        assignee: 'Mandha Shirisha',
        priority: 'medium',
        description: `<strong>Goal:</strong> Tag each chunk with role permissions.<br><br>
1. Create role definitions (Finance, HR, Marketing, etc.).<br>
2. Analyze document content to determine department.<br>
3. Assign accessible_roles metadata to each chunk.<br>
4. Handle C-Level (all access) and Employee (general) roles.<br><br>
<strong>📌 Output:</strong> Chunks with role-based metadata tags.`,
        deepExplanation: `<h3>📘 Step-by-Step Guide: Role-based Metadata</h3>
<hr>
<h4>Step 1: Define Role Mappings</h4>
<pre><code>ROLE_KEYWORDS = {
    'finance': ['financial', 'budget', 'revenue', 'expense', 'profit'],
    'hr': ['employee', 'salary', 'policy', 'leave', 'benefits'],
    'marketing': ['campaign', 'marketing', 'brand', 'customer'],
    'engineering': ['technical', 'api', 'code', 'system', 'architecture']
}

ROLE_ACCESS = {
    'finance': ['finance', 'c-level'],
    'hr': ['hr', 'c-level'],
    'marketing': ['marketing', 'c-level'],
    'engineering': ['engineering', 'c-level'],
    'general': ['employees', 'c-level', 'finance', 'hr', 'marketing', 'engineering']
}</code></pre>

<h4>Step 2: Detect Document Department</h4>
<pre><code>def detect_department(content, filename):
    content_lower = content.lower()
    filename_lower = filename.lower()
    
    for dept, keywords in ROLE_KEYWORDS.items():
        for keyword in keywords:
            if keyword in content_lower or keyword in filename_lower:
                return dept
    return 'general'</code></pre>

<h4>Step 3: Assign Metadata</h4>
<pre><code>def assign_role_metadata(chunk):
    dept = detect_department(chunk['content'], chunk['filename'])
    chunk['metadata'] = {
        'department': dept,
        'accessible_roles': ROLE_ACCESS.get(dept, ROLE_ACCESS['general']),
        'source': chunk['filename']
    }
    return chunk</code></pre>

<h4>Step 4: Process All Chunks</h4>
<pre><code>import json
with open('chunked_documents.json', 'r') as f:
    chunks = json.load(f)

tagged_chunks = [assign_role_metadata(c) for c in chunks]

with open('tagged_chunks.json', 'w') as f:
    json.dump(tagged_chunks, f, indent=2)</code></pre>

<p><strong>✅ Success Criteria:</strong> All chunks tagged with correct role permissions.</p>`
    },

    // 6. Saranya (Medium) - Metadata Mapping Document
    {
        id: 206,
        title: 'Create Metadata Mapping Documentation',
        assignee: 'Sri Saranya Chandrapati',
        priority: 'medium',
        description: `<strong>Goal:</strong> Document the metadata structure.<br><br>
1. Create a mapping table (chunk ID → roles).<br>
2. Document department classification criteria.<br>
3. List all source documents with their tags.<br>
4. Create a visual diagram of role hierarchy.<br><br>
<strong>📌 Output:</strong> METADATA_MAPPING.md documentation file.`,
        deepExplanation: `<h3>📘 Step-by-Step Guide: Metadata Mapping Document</h3>
<hr>
<h4>Step 1: Create Structure</h4>
<p>Create a file called <code>METADATA_MAPPING.md</code> in the docs folder.</p>

<h4>Step 2: Document Role Hierarchy</h4>
<pre><code># Role-Based Access Control Mapping

## Role Hierarchy
| Role | Access Level | Documents |
|------|-------------|-----------|
| C-Level | Full | All documents |
| Finance | Department | Financial reports |
| HR | Department | Employee data |
| Marketing | Department | Marketing docs |
| Engineering | Department | Tech docs |
| Employees | Basic | General handbook |</code></pre>

<h4>Step 3: List Document-Role Mappings</h4>
<pre><code>## Document Classifications

| Document | Department | Accessible By |
|----------|------------|---------------|
| financial_report.md | Finance | Finance, C-Level |
| employee_handbook.md | General | All Roles |
| api_docs.md | Engineering | Engineering, C-Level |</code></pre>

<h4>Step 4: Add Classification Criteria</h4>
<pre><code>## Classification Rules
1. Documents containing "financial", "budget" → Finance
2. Documents containing "employee", "salary" → HR
3. Documents containing "marketing", "campaign" → Marketing
4. Documents containing "technical", "api" → Engineering
5. All other documents → General (accessible by all)</code></pre>

<p><strong>✅ Success Criteria:</strong> Complete documentation of all metadata mappings.</p>`
    },

    // 7. Vinuthna (Medium) - Validation Report
    {
        id: 207,
        title: 'Preprocessing Validation & QA Report',
        assignee: 'Vinuthna Jangam',
        priority: 'medium',
        description: `<strong>Goal:</strong> Validate all preprocessing work.<br><br>
1. Check chunk counts and token ranges.<br>
2. Validate metadata assignments are correct.<br>
3. Test role-based filtering logic.<br>
4. Document any issues found.<br><br>
<strong>📌 Output:</strong> PREPROCESSING_QA_REPORT.md`,
        deepExplanation: `<h3>📘 Step-by-Step Guide: Preprocessing Validation</h3>
<hr>
<h4>Step 1: Load Processed Data</h4>
<pre><code>import json
with open('tagged_chunks.json', 'r') as f:
    chunks = json.load(f)</code></pre>

<h4>Step 2: Validate Token Counts</h4>
<pre><code>import tiktoken
enc = tiktoken.get_encoding("cl100k_base")

issues = []
for chunk in chunks:
    tokens = len(enc.encode(chunk['content']))
    if tokens < 300 or tokens > 512:
        issues.append(f"Chunk {chunk['id']}: {tokens} tokens (out of range)")

print(f"Token validation: {len(issues)} issues found")</code></pre>

<h4>Step 3: Validate Metadata</h4>
<pre><code>missing_metadata = []
for chunk in chunks:
    if 'metadata' not in chunk or 'accessible_roles' not in chunk.get('metadata', {}):
        missing_metadata.append(chunk['id'])

print(f"Metadata validation: {len(missing_metadata)} missing")</code></pre>

<h4>Step 4: Create QA Report</h4>
<pre><code># PREPROCESSING_QA_REPORT.md

## Summary
- Total chunks: {len(chunks)}
- Token range issues: {len(issues)}
- Missing metadata: {len(missing_metadata)}

## Token Distribution
- Min tokens: X
- Max tokens: Y
- Average: Z

## Issues Found
(List any problems here)</code></pre>

<p><strong>✅ Success Criteria:</strong> Complete QA report with all validations passed.</p>`
    },

    // 8. Joshika (EASIEST) - Summary Report
    {
        id: 208,
        title: 'Week 2 Summary Report',
        assignee: 'Depuru Joshika Reddy',
        priority: 'low',
        description: `<strong>Goal:</strong> Compile the Week 2 summary.<br><br>
1. Collect all deliverables from team members.<br>
2. Summarize preprocessing pipeline results.<br>
3. Document chunk statistics and metadata coverage.<br>
4. Create WEEK2_SUMMARY.md report.<br><br>
<strong>📌 Output:</strong> WEEK2_SUMMARY.md`,
        deepExplanation: `<h3>📘 Step-by-Step Guide: Week 2 Summary Report</h3>
<hr>
<h4>Step 1: Collect Information</h4>
<p>Gather the following from team members:</p>
<ul>
    <li>Number of documents parsed (Bhargava, Karthik)</li>
    <li>Number of chunks created (Arshad)</li>
    <li>Cleaning statistics (Kavya)</li>
    <li>Metadata coverage (Shirisha)</li>
    <li>QA results (Vinuthna)</li>
</ul>

<h4>Step 2: Create Report Structure</h4>
<pre><code># Week 2 Summary Report
## Module 2: Document Preprocessing & Metadata Tagging

### Team Contributions
| Member | Task | Status |
|--------|------|--------|
| Arshad | Chunking & Tokenization | ✅ |
| Bhargava | Markdown Parsing | ✅ |
| ... | ... | ... |

### Statistics
- Total documents processed: X
- Total chunks created: X
- Average tokens per chunk: X

### Deliverables
1. ✅ chunked_documents.json
2. ✅ tagged_chunks.json
3. ✅ METADATA_MAPPING.md
4. ✅ PREPROCESSING_QA_REPORT.md</code></pre>

<h4>Step 3: Save the Report</h4>
<p>Save as <code>docs/WEEK2_SUMMARY.md</code> in the repository.</p>

<p><strong>✅ Success Criteria:</strong> Complete summary combining all Week 2 work.</p>`
    }
];

// =====================================================
// WEEK 1 TASKS (Module 1: Environment Setup)
// =====================================================
const week1Tasks = [
    {
        id: 101,
        title: 'Module 1 Lead: Monitoring & Supervision',
        assignee: 'Arshad Pasha',
        priority: 'high',
        description: `<strong>Goal:</strong> Monitor Week 1 deliverables.<br><br>
1. Verify Python Env setup for the team.<br>
2. Review the Repository structure.<br>
3. Review Document Analysis.<br>
4. Validate the Role-Mapping matrix.`,
        deepExplanation: `<h3>Leadership & Monitoring Guide</h3><p>Oversee all team activities, ensure deadlines are met, and verify quality of deliverables.</p>`
    },
    {
        id: 102,
        title: 'Repository & Folder Structure',
        assignee: 'Kushagra Bhargava',
        priority: 'high',
        description: `<strong>Goal:</strong> Initialize project foundation.<br><br>
1. Clone GitHub repository.<br>
2. Create folder structure.<br>
3. Setup .gitignore and requirements.txt.`,
        deepExplanation: `<h3>Repository Setup Guide</h3><p>Clone the Fintech-data repo and organize folders for data, source code, and documentation.</p>`
    },
    {
        id: 103,
        title: 'Finance & CSV Data Exploration',
        assignee: 'Guru Karthik Reddy Marthala',
        priority: 'medium',
        description: `<strong>Goal:</strong> Explore financial data files.<br><br>
1. Explore all CSV files.<br>
2. Identify content and structure.<br>
3. Note sensitive information.`,
        deepExplanation: `<h3>Data Exploration Guide</h3><p>Use pandas to load and analyze CSV files. Document column names, data types, and sample values.</p>`
    },
    {
        id: 104,
        title: 'HR Documentation Analysis',
        assignee: 'Depuru Joshika Reddy',
        priority: 'medium',
        description: `<strong>Goal:</strong> Explore HR documents.<br><br>
1. Read HR policy documents.<br>
2. Identify employee data files.<br>
3. Note privacy requirements.`,
        deepExplanation: `<h3>HR Analysis Guide</h3><p>Review employee handbooks, policy documents, and identify what data needs protection.</p>`
    },
    {
        id: 105,
        title: 'Marketing Documentation',
        assignee: 'Kavya Ghantasala',
        priority: 'low',
        description: `<strong>Goal:</strong> Explore Marketing data.<br><br>
1. Read marketing reports.<br>
2. Identify public vs internal docs.`,
        deepExplanation: `<h3>Marketing Analysis Guide</h3><p>Review campaign documents and classify them by confidentiality level.</p>`
    },
    {
        id: 106,
        title: 'Engineering & Tech Docs',
        assignee: 'Mandha Shirisha',
        priority: 'medium',
        description: `<strong>Goal:</strong> Explore technical documentation.<br><br>
1. Review API docs and architecture.<br>
2. Summarize tech stack.`,
        deepExplanation: `<h3>Tech Docs Guide</h3><p>Identify API documentation, system architecture diagrams, and technical specifications.</p>`
    },
    {
        id: 107,
        title: 'Role-to-Document Mapping',
        assignee: 'Sri Saranya Chandrapati',
        priority: 'high',
        description: `<strong>Goal:</strong> Create RBAC foundation.<br><br>
1. Map roles to document types.<br>
2. Create access matrix.`,
        deepExplanation: `<h3>Role Mapping Guide</h3><p>Create a table showing which roles can access which document types.</p>`
    },
    {
        id: 108,
        title: 'Week 1 Summary Report',
        assignee: 'Vinuthna Jangam',
        priority: 'high',
        description: `<strong>Goal:</strong> Consolidate Week 1 findings.<br><br>
1. Combine all summaries.<br>
2. Create WEEK1_SUMMARY.md.`,
        deepExplanation: `<h3>Summary Report Guide</h3><p>Compile all team deliverables into a single comprehensive report.</p>`
    }
];

// Combine all tasks
const defaultTasks = [...week2Tasks, ...week1Tasks];

// STATE
let tasks = [];
let currentFilter = 'all';
let editingTaskId = null;
let week1Collapsed = true;
let week2Collapsed = false;

// DOM Elements
const taskModal = document.getElementById('taskModal');
const taskForm = document.getElementById('taskForm');
const addTaskBtn = document.getElementById('addTaskBtn');
const closeModalBtn = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const tasksContainer = document.getElementById('tasksContainer');
const emptyState = document.getElementById('emptyState');
const modalTitle = document.getElementById('modalTitle');
const filterTabs = document.querySelectorAll('.filter-tab');

// Deep Explanation Modal
const deepModal = document.getElementById('deepExplanationModal');

// INITIALIZE
document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
    setupEventListeners();
    setupNavigation();
});

function loadTasks() {
    const stored = localStorage.getItem('rbac_tasks_milestone1_v2');
    if (stored) {
        tasks = JSON.parse(stored);
    } else {
        tasks = [...defaultTasks];
        saveTasks();
    }
    renderTasks();
    updateStats();
}

function saveTasks() {
    localStorage.setItem('rbac_tasks_milestone1_v2', JSON.stringify(tasks));
    renderTasks();
    updateStats();
}

function seedDatabase() {
    if (confirm("Reload Milestone 1 tasks (Week 1 + Week 2)? This resets current changes.")) {
        tasks = [...defaultTasks];
        saveTasks();
        alert("Milestone 1 Tasks Loaded!");
    }
}
window.seedDatabase = seedDatabase;

// CRUD
function createTask(taskData) {
    const newId = Date.now();
    const newTask = { ...taskData, id: newId };
    tasks.unshift(newTask);
    saveTasks();
}

function updateTask(id, updates) {
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
        tasks[index] = { ...tasks[index], ...updates };
        saveTasks();
    }
}

function deleteTask(id) {
    if (!confirm('Delete this task?')) return;
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        const cleanDesc = task.description.replace(/<br>/g, '\n').replace(/<strong>/g, '').replace(/<\/strong>/g, '');
        openModal({ ...task, description: cleanDesc });
    }
}

function toggleDescription(id) {
    const descEl = document.getElementById(`desc-${id}`);
    const btnEl = document.getElementById(`btn-${id}`);
    if (descEl.classList.contains('expanded')) {
        descEl.classList.remove('expanded');
        btnEl.textContent = 'See Full Description ⬇';
    } else {
        descEl.classList.add('expanded');
        btnEl.textContent = 'Hide Description ⬆';
    }
}
window.toggleDescription = toggleDescription;

// Deep Explanation Popup
function showDeepExplanation(id) {
    const task = tasks.find(t => t.id === id);
    if (task && task.deepExplanation) {
        document.getElementById('deepModalContent').innerHTML = task.deepExplanation;
        document.getElementById('deepExplanationModal').classList.add('active');
    } else {
        alert('No deep explanation available for this task.');
    }
}
window.showDeepExplanation = showDeepExplanation;

function closeDeepModal() {
    document.getElementById('deepExplanationModal').classList.remove('active');
}
window.closeDeepModal = closeDeepModal;

// Toggle Week Sections
function toggleWeek(weekNum) {
    if (weekNum === 1) {
        week1Collapsed = !week1Collapsed;
    } else {
        week2Collapsed = !week2Collapsed;
    }
    renderTasks();
}
window.toggleWeek = toggleWeek;

function handleFormSubmit(e) {
    e.preventDefault();
    const rawDesc = document.getElementById('taskDescription').value;
    const formattedDesc = rawDesc.replace(/\n/g, '<br>');

    const taskData = {
        title: document.getElementById('taskTitle').value,
        description: formattedDesc,
        assignee: document.getElementById('assignee').value,
        priority: document.getElementById('priority').value,
        deepExplanation: ''
    };

    if (editingTaskId) {
        updateTask(editingTaskId, taskData);
    } else {
        createTask(taskData);
    }
    closeModal();
}

// RENDER
function renderTasks() {
    const week2 = tasks.filter(t => t.id >= 200 && t.id < 300);
    const week1 = tasks.filter(t => t.id >= 100 && t.id < 200);

    let html = `
    <div class="milestone-header">
        <h2>🎯 Milestone 1: Data Preparation & Vector DB</h2>
    </div>

    <!-- WEEK 2 (Current - Open by default) -->
    <div class="week-section">
        <div class="week-header" onclick="toggleWeek(2)">
            <span class="week-toggle">${week2Collapsed ? '▶' : '▼'}</span>
            <h3>📅 Week 2: Document Preprocessing & Metadata Tagging</h3>
            <span class="task-count">${week2.length} tasks</span>
        </div>
        <div class="week-tasks ${week2Collapsed ? 'collapsed' : ''}">
            ${week2.map(task => createTaskHTML(task)).join('')}
        </div>
    </div>

    <!-- WEEK 1 (Past - Completed) -->
    <div class="week-section week-completed">
        <div class="week-header" onclick="toggleWeek(1)">
            <span class="week-toggle">${week1Collapsed ? '▶' : '▼'}</span>
            <h3>📅 Week 1: Environment Setup & Data Exploration</h3>
            <span class="week-status completed">✅ Completed</span>
            <span class="task-count">${week1.length} tasks</span>
        </div>
        <div class="week-tasks ${week1Collapsed ? 'collapsed' : ''}">
            ${week1.map(task => createTaskHTML(task)).join('')}
        </div>
    </div>
    `;

    tasksContainer.innerHTML = html;
    tasksContainer.style.display = 'block';
    emptyState.style.display = 'none';
}

function createTaskHTML(task) {
    const names = task.assignee.split(' ');
    const initials = names.map(n => n[0]).join('').substring(0, 2).toUpperCase();
    const priorityClass = `priority-${task.priority}`;

    return `
    <div class="task-card ${priorityClass}">
        <div class="task-header">
            <div style="flex-grow:1"></div>
            <div class="task-actions">
                <button onclick="editTask(${task.id})" class="btn-icon" title="Edit">✏️</button>
                <button onclick="deleteTask(${task.id})" class="btn-icon delete" title="Delete">🗑️</button>
            </div>
        </div>
        
        <h3 class="task-title">${task.title}</h3>
        
        <div class="task-desc-wrapper">
            <p class="task-desc" id="desc-${task.id}">${task.description}</p>
            <button class="read-more-btn" id="btn-${task.id}" onclick="toggleDescription(${task.id})">See Full Description ⬇</button>
        </div>

        ${task.deepExplanation ? `<button class="deep-explain-btn" onclick="showDeepExplanation(${task.id})">📘 Deep Explanation</button>` : ''}

        <div class="task-footer">
            <div class="task-meta">
                <div class="task-assignee">
                    <div class="assignee-avatar">${initials}</div>
                    ${task.assignee}
                </div>
            </div>
        </div>
    </div>
    `;
}

function updateStats() {
    const totalEl = document.getElementById('totalTasks');
    if (!totalEl) return;
    totalEl.textContent = tasks.length;
}

// Helpers
function setupNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    if (navToggle) {
        navToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
    }
}

function setupEventListeners() {
    if (addTaskBtn) addTaskBtn.addEventListener('click', () => openModal());
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
    if (taskModal) taskModal.addEventListener('click', (e) => { if (e.target === taskModal) closeModal(); });
    if (taskForm) taskForm.addEventListener('submit', handleFormSubmit);

    // Deep modal close
    if (deepModal) {
        deepModal.addEventListener('click', (e) => { if (e.target === deepModal) closeDeepModal(); });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            closeDeepModal();
        }
    });
}

function openModal(task = null) {
    taskModal.classList.add('active');
    if (task) {
        editingTaskId = task.id;
        modalTitle.textContent = 'Edit Task';
        document.getElementById('taskTitle').value = task.title;
        const cleanDesc = task.description.replace(/<br>/g, '\n').replace(/<strong>/g, '').replace(/<\/strong>/g, '');
        document.getElementById('taskDescription').value = cleanDesc;
        document.getElementById('assignee').value = task.assignee;
        document.getElementById('priority').value = task.priority;
    } else {
        editingTaskId = null;
        modalTitle.textContent = 'Add New Task';
        taskForm.reset();
    }
}

function closeModal() {
    taskModal.classList.remove('active');
    taskForm.reset();
    editingTaskId = null;
}
