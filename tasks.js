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
        deepExplanation: `
<h3>📘 Complete Guide: Document Chunking & Tokenization</h3>
<p style="color: #f87171; font-weight: bold;">⚠️ YOU ARE THE LEAD - This is the HARDEST task. You will coordinate with others.</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b arshad/week2</code></pre>

<h4>🔹 STEP 2: Understand Your Folder Structure</h4>
<p>Below is the project structure. <span style="background: #22c55e; color: black; padding: 2px 6px; border-radius: 4px;">GREEN = YOUR FILES (Create these)</span></p>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 1/
│   └── data/                    ← Source data (DON'T MODIFY)
│       ├── Finance/
│       ├── HR/
│       ├── marketing/
│       ├── engineering/
│       └── general/
├── week 2/                      ← Create this folder
│   ├── src/                     ← Create this folder
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">chunking.py</span>         ← YOUR FILE
│   ├── output/                  ← Create this folder
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">chunked_documents.json</span> ← YOUR OUTPUT
│   └── README.md
└── requirements.txt
</pre>

<h4>🔹 STEP 3: Create the Folders</h4>
<pre><code># In your terminal, navigate to project root
cd RBAC_GP3
mkdir -p "week 2/src"
mkdir -p "week 2/output"</code></pre>

<h4>🔹 STEP 4: Create chunking.py</h4>
<p>Create file: <code>week 2/src/chunking.py</code></p>

<p><strong>📋 Copy this ChatGPT Prompt to generate the code:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python script that:
1. Reads all markdown (.md) files from a folder called '../week 1/data/' recursively
2. Uses tiktoken library to count tokens
3. Splits each document into chunks of 300-512 tokens
4. Adds overlap of 50 tokens between chunks
5. Assigns a unique chunk_id like 'chunk_0001', 'chunk_0002'
6. Saves output as JSON with structure: {chunk_id, content, source_file, token_count}
7. Uses RecursiveCharacterTextSplitter from langchain

Include proper error handling and progress printing."
</div>

<h4>🔹 STEP 5: Install Required Libraries</h4>
<pre><code>pip install tiktoken langchain langchain-text-splitters</code></pre>

<h4>🔹 STEP 6: Run Your Script</h4>
<pre><code>cd "week 2/src"
python chunking.py</code></pre>

<h4>🔹 STEP 7: Verify Output</h4>
<p>Check that <code>week 2/output/chunked_documents.json</code> exists and contains chunks.</p>

<h4>🔹 STEP 8: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add document chunking module - Week 2"
git push origin arshad/week2</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: You have chunked_documents.json with all chunks between 300-512 tokens.</p>
<p style="color: #f87171;">❌ DON'T TOUCH: Other team members' files or the original data in week 1/data/</p>
`
    },

    // 2. Bhargava (Medium) - Parse Markdown Documents
    {
        id: 202,
        title: 'Parse Markdown Documents from GitHub',
        assignee: 'Kushagra Bhargava',
        priority: 'medium',
        description: `<strong>Goal:</strong> Extract content from all .md files.<br><br>
1. Read all markdown files from week 1/data/.<br>
2. Parse titles, headings, and content.<br>
3. Save extracted data in structured format.<br><br>
<strong>📌 Output:</strong> parsed_markdown.json`,
        deepExplanation: `
<h3>📘 Complete Guide: Parse Markdown Documents</h3>
<p style="color: #fbbf24; font-weight: bold;">📁 Your task: Extract all .md files into structured JSON</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b bhargava/week2</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<p><span style="background: #22c55e; color: black; padding: 2px 6px; border-radius: 4px;">GREEN = YOUR FILES</span></p>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 1/
│   └── data/                    ← READ FROM HERE (DON'T MODIFY)
│       ├── Finance/
│       │   └── *.md files
│       ├── HR/
│       │   └── *.md files
│       ├── marketing/
│       ├── engineering/
│       └── general/
├── week 2/
│   ├── src/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">parse_markdown.py</span>    ← YOUR FILE
│   └── output/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">parsed_markdown.json</span>  ← YOUR OUTPUT
└── requirements.txt
</pre>

<h4>🔹 STEP 3: Create the Folders (if not exists)</h4>
<pre><code>cd RBAC_GP3
mkdir -p "week 2/src"
mkdir -p "week 2/output"</code></pre>

<h4>🔹 STEP 4: Create parse_markdown.py</h4>
<p>Create file: <code>week 2/src/parse_markdown.py</code></p>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python script that:
1. Recursively finds all .md (markdown) files in '../week 1/data/' folder
2. For each file, extracts:
   - filename
   - full file path
   - title (first # heading)
   - all section headings (## headings)
   - full content
   - department (based on folder: Finance, HR, marketing, engineering, general)
3. Saves everything to a JSON file called '../output/parsed_markdown.json'
4. Prints progress: 'Parsed: filename.md'

Use glob for file finding and proper UTF-8 encoding."
</div>

<h4>🔹 STEP 5: Run Your Script</h4>
<pre><code>cd "week 2/src"
python parse_markdown.py</code></pre>

<h4>🔹 STEP 6: Verify Output</h4>
<p>Open <code>week 2/output/parsed_markdown.json</code> and verify it has all markdown files.</p>

<h4>🔹 STEP 7: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add markdown parsing module - Week 2"
git push origin bhargava/week2</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: parsed_markdown.json contains all markdown files with titles and content.</p>
<p style="color: #f87171;">❌ DON'T TOUCH: CSV files (that's Karthik's job), original data files, other folders.</p>
`
    },

    // 3. Karthik (Medium) - Parse CSV Documents
    {
        id: 203,
        title: 'Parse CSV Documents from GitHub',
        assignee: 'Guru Karthik Reddy Marthala',
        priority: 'medium',
        description: `<strong>Goal:</strong> Extract and structure CSV data.<br><br>
1. Find all CSV files in week 1/data/.<br>
2. Load each CSV using pandas.<br>
3. Convert to text format for RAG.<br><br>
<strong>📌 Output:</strong> parsed_csv.json`,
        deepExplanation: `
<h3>📘 Complete Guide: Parse CSV Documents</h3>
<p style="color: #fbbf24; font-weight: bold;">📁 Your task: Convert all CSV files to text format for RAG</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b karthik/week2</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<p><span style="background: #22c55e; color: black; padding: 2px 6px; border-radius: 4px;">GREEN = YOUR FILES</span></p>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 1/
│   └── data/                    ← READ CSV FROM HERE
│       ├── Finance/
│       │   └── *.csv files      ← Your source
│       ├── HR/
│       │   └── *.csv files      ← Your source
│       └── ...
├── week 2/
│   ├── src/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">parse_csv.py</span>         ← YOUR FILE
│   └── output/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">parsed_csv.json</span>       ← YOUR OUTPUT
└── requirements.txt
</pre>

<h4>🔹 STEP 3: Create the Folders</h4>
<pre><code>cd RBAC_GP3
mkdir -p "week 2/src"
mkdir -p "week 2/output"</code></pre>

<h4>🔹 STEP 4: Create parse_csv.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python script using pandas that:
1. Finds all .csv files recursively in '../week 1/data/' folder
2. For each CSV file:
   - Load with pandas
   - Get column names
   - Get row count
   - Convert each row to text format: 'Column1: value1; Column2: value2; ...'
   - Determine department from folder path (Finance, HR, etc.)
3. Save to JSON with structure:
   {filename, filepath, department, columns, row_count, text_content}
4. Output file: '../output/parsed_csv.json'
5. Print: 'Processed: filename.csv (X rows)'

Handle encoding issues with errors='ignore'."
</div>

<h4>🔹 STEP 5: Install pandas (if needed)</h4>
<pre><code>pip install pandas</code></pre>

<h4>🔹 STEP 6: Run & Verify</h4>
<pre><code>cd "week 2/src"
python parse_csv.py</code></pre>

<h4>🔹 STEP 7: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add CSV parsing module - Week 2"
git push origin karthik/week2</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: parsed_csv.json with all CSV data as text.</p>
<p style="color: #f87171;">❌ DON'T TOUCH: Markdown files (Bhargava's job), anything else.</p>
`
    },

    // 4. Kavya (Medium) - Text Cleaning
    {
        id: 204,
        title: 'Text Cleaning & Normalization',
        assignee: 'Kavya Ghantasala',
        priority: 'medium',
        description: `<strong>Goal:</strong> Clean all extracted text data.<br><br>
1. Normalize whitespace.<br>
2. Remove special characters.<br>
3. Handle encoding issues.<br><br>
<strong>📌 Output:</strong> cleaned_documents.json`,
        deepExplanation: `
<h3>📘 Complete Guide: Text Cleaning & Normalization</h3>
<p style="color: #fbbf24; font-weight: bold;">📁 Your task: Clean the parsed data from Bhargava & Karthik</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b kavya/week2</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<p><span style="background: #22c55e; color: black; padding: 2px 6px; border-radius: 4px;">GREEN = YOUR FILES</span></p>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 2/
│   ├── src/
│   │   ├── parse_markdown.py    ← Bhargava's (INPUT)
│   │   ├── parse_csv.py         ← Karthik's (INPUT)
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">text_cleaning.py</span>     ← YOUR FILE
│   └── output/
│       ├── parsed_markdown.json ← Your INPUT
│       ├── parsed_csv.json      ← Your INPUT
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">cleaned_documents.json</span> ← YOUR OUTPUT
</pre>

<p style="color: #fbbf24;">⚠️ NOTE: You need Bhargava & Karthik's output first. Coordinate with them!</p>

<h4>🔹 STEP 3: Create text_cleaning.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python script that:
1. Loads '../output/parsed_markdown.json' and '../output/parsed_csv.json'
2. For each document's content, apply these cleaning steps:
   - Normalize unicode using unicodedata.normalize('NFKC', text)
   - Remove special characters except basic punctuation (.,!?;:-)
   - Normalize whitespace (multiple spaces → single space)
   - Normalize newlines (multiple newlines → double newline)
   - Strip leading/trailing whitespace
3. Combine both into one list
4. Save as '../output/cleaned_documents.json' with structure:
   {id, source_type (markdown/csv), filename, department, cleaned_content, original_length, cleaned_length}
5. Print statistics: 'Total docs: X, Characters removed: Y'

Use re (regex) and unicodedata libraries."
</div>

<h4>🔹 STEP 4: Run After Getting Input Files</h4>
<pre><code>cd "week 2/src"
python text_cleaning.py</code></pre>

<h4>🔹 STEP 5: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add text cleaning module - Week 2"
git push origin kavya/week2</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: cleaned_documents.json with all text normalized.</p>
<p style="color: #f87171;">❌ DON'T TOUCH: Original parsing scripts, other files.</p>
`
    },

    // 5. Shirisha (Medium) - Role-based Metadata
    {
        id: 205,
        title: 'Role-based Metadata Assignment',
        assignee: 'Mandha Shirisha',
        priority: 'medium',
        description: `<strong>Goal:</strong> Tag each chunk with role permissions.<br><br>
1. Create role definitions.<br>
2. Analyze document to determine department.<br>
3. Assign accessible_roles metadata.<br><br>
<strong>📌 Output:</strong> tagged_chunks.json`,
        deepExplanation: `
<h3>📘 Complete Guide: Role-based Metadata Assignment</h3>
<p style="color: #fbbf24; font-weight: bold;">📁 Your task: Add RBAC permissions to each document chunk</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b shirisha/week2</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<p><span style="background: #22c55e; color: black; padding: 2px 6px; border-radius: 4px;">GREEN = YOUR FILES</span></p>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 2/
│   ├── src/
│   │   ├── chunking.py           ← Arshad's (wait for his output)
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">metadata_tagging.py</span>   ← YOUR FILE
│   ├── output/
│   │   ├── chunked_documents.json ← Your INPUT
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">tagged_chunks.json</span>     ← YOUR OUTPUT
│   └── config/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">role_mappings.json</span>     ← YOUR CONFIG FILE
</pre>

<h4>🔹 STEP 3: Create config folder and role_mappings.json</h4>
<pre><code>mkdir -p "week 2/config"</code></pre>

<p>Create <code>week 2/config/role_mappings.json</code>:</p>
<pre><code>{
  "departments": {
    "Finance": ["finance", "c-level"],
    "HR": ["hr", "c-level"],
    "marketing": ["marketing", "c-level"],
    "engineering": ["engineering", "c-level"],
    "general": ["employees", "finance", "hr", "marketing", "engineering", "c-level"]
  },
  "keywords": {
    "finance": ["financial", "budget", "revenue", "quarterly", "profit", "expense"],
    "hr": ["employee", "salary", "policy", "leave", "benefits", "hiring"],
    "marketing": ["campaign", "marketing", "brand", "customer", "sales"],
    "engineering": ["technical", "api", "code", "system", "architecture", "deploy"]
  }
}</code></pre>

<h4>🔹 STEP 4: Create metadata_tagging.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python script that:
1. Loads '../output/chunked_documents.json' (list of chunks with content, source_file)
2. Loads '../config/role_mappings.json' for department→roles mapping
3. For each chunk:
   - Detect department from source_file path or keywords in content
   - Add metadata: {department, accessible_roles: [...], source, chunk_id}
4. Save as '../output/tagged_chunks.json'
5. Print summary: 'Finance: X chunks, HR: Y chunks, ...'

Use keyword matching and folder path detection."
</div>

<h4>🔹 STEP 5: Run & Verify</h4>
<pre><code>cd "week 2/src"
python metadata_tagging.py</code></pre>

<h4>🔹 STEP 6: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add role-based metadata tagging - Week 2"
git push origin shirisha/week2</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: tagged_chunks.json with accessible_roles for each chunk.</p>
<p style="color: #f87171;">❌ DON'T TOUCH: Chunking logic, parsing scripts, other files.</p>
`
    },

    // 6. Saranya (Medium) - Metadata Mapping Document
    {
        id: 206,
        title: 'Create Metadata Mapping Documentation',
        assignee: 'Sri Saranya Chandrapati',
        priority: 'medium',
        description: `<strong>Goal:</strong> Document the metadata structure.<br><br>
1. Create mapping table (chunk → roles).<br>
2. Document department classification.<br>
3. Create role hierarchy visual.<br><br>
<strong>📌 Output:</strong> METADATA_MAPPING.md`,
        deepExplanation: `
<h3>📘 Complete Guide: Metadata Mapping Documentation</h3>
<p style="color: #fbbf24; font-weight: bold;">📁 Your task: Create comprehensive RBAC documentation</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b saranya/week2</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<p><span style="background: #22c55e; color: black; padding: 2px 6px; border-radius: 4px;">GREEN = YOUR FILE</span></p>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 2/
│   ├── docs/                     ← Create this folder
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">METADATA_MAPPING.md</span>   ← YOUR FILE
│   ├── output/
│   │   └── tagged_chunks.json    ← Reference this (Shirisha's output)
│   └── config/
│       └── role_mappings.json    ← Reference this (Shirisha's config)
</pre>

<h4>🔹 STEP 3: Create docs folder</h4>
<pre><code>mkdir -p "week 2/docs"</code></pre>

<h4>🔹 STEP 4: Create METADATA_MAPPING.md</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Create a comprehensive Markdown documentation file for RBAC metadata mapping that includes:

1. **Role Hierarchy Section**
   - Visual ASCII diagram showing: C-Level → Department Heads → Employees
   - Table: Role | Access Level | Description

2. **Department-Role Mapping Table**
   - Columns: Department | Documents | Accessible Roles
   - Rows for: Finance, HR, Marketing, Engineering, General

3. **Document Classification Rules**
   - How documents are classified by folder path
   - Keyword-based classification rules
   - Default classification for unmatched docs

4. **Chunk Metadata Schema**
   - JSON schema example showing: chunk_id, content, department, accessible_roles, source

5. **Access Control Matrix**
   - Matrix showing which role can access which department's docs
   - Use ✅ and ❌ symbols

6. **Examples Section**
   - Example: Finance user querying → what they see vs don't see
   - Example: C-Level user → sees everything

Make it professional with proper Markdown formatting."
</div>

<h4>🔹 STEP 5: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add RBAC metadata mapping documentation - Week 2"
git push origin saranya/week2</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: Complete METADATA_MAPPING.md documentation.</p>
<p style="color: #f87171;">❌ DON'T TOUCH: Code files, config files (just reference them).</p>
`
    },

    // 7. Vinuthna (Medium) - Validation Report
    {
        id: 207,
        title: 'Preprocessing Validation & QA Report',
        assignee: 'Vinuthna Jangam',
        priority: 'medium',
        description: `<strong>Goal:</strong> Validate all preprocessing work.<br><br>
1. Check chunk token ranges.<br>
2. Validate metadata assignments.<br>
3. Document issues found.<br><br>
<strong>📌 Output:</strong> PREPROCESSING_QA_REPORT.md + validation.py`,
        deepExplanation: `
<h3>📘 Complete Guide: Preprocessing Validation & QA</h3>
<p style="color: #fbbf24; font-weight: bold;">📁 Your task: Test everyone's work and create QA report</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b vinuthna/week2</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<p><span style="background: #22c55e; color: black; padding: 2px 6px; border-radius: 4px;">GREEN = YOUR FILES</span></p>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 2/
│   ├── src/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">validation.py</span>          ← YOUR FILE
│   ├── output/
│   │   ├── tagged_chunks.json     ← Test this
│   │   ├── cleaned_documents.json ← Test this
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">validation_results.json</span> ← YOUR OUTPUT
│   └── docs/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">PREPROCESSING_QA_REPORT.md</span> ← YOUR REPORT
</pre>

<h4>🔹 STEP 3: Create validation.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python validation script that:
1. Loads '../output/tagged_chunks.json'
2. Performs these validations:
   - Token count check: all chunks should be 300-512 tokens (use tiktoken)
   - Metadata check: all chunks have 'department' and 'accessible_roles'
   - Role check: accessible_roles is not empty
   - Content check: no empty content
3. Counts issues by type
4. Saves results to '../output/validation_results.json':
   {total_chunks, passed, failed, issues: [{chunk_id, issue_type, details}]}
5. Prints summary with pass/fail counts

Install tiktoken if needed for token counting."
</div>

<h4>🔹 STEP 4: Run Validation</h4>
<pre><code>pip install tiktoken
cd "week 2/src"
python validation.py</code></pre>

<h4>🔹 STEP 5: Create QA Report</h4>
<p>Create <code>week 2/docs/PREPROCESSING_QA_REPORT.md</code> with:</p>
<ul>
<li>Summary statistics</li>
<li>Pass/Fail counts</li>
<li>List of issues found</li>
<li>Recommendations</li>
</ul>

<h4>🔹 STEP 6: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add preprocessing validation and QA report - Week 2"
git push origin vinuthna/week2</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: Validation script + QA report completed.</p>
<p style="color: #f87171;">❌ DON'T TOUCH: Other team's code files.</p>
`
    },

    // 8. Joshika (EASIEST) - Summary Report
    {
        id: 208,
        title: 'Week 2 Summary Report',
        assignee: 'Depuru Joshika Reddy',
        priority: 'low',
        description: `<strong>Goal:</strong> Compile the Week 2 summary.<br><br>
1. Collect all deliverables.<br>
2. Summarize preprocessing results.<br>
3. Create WEEK2_SUMMARY.md.<br><br>
<strong>📌 Output:</strong> WEEK2_SUMMARY.md`,
        deepExplanation: `
<h3>📘 Complete Guide: Week 2 Summary Report</h3>
<p style="color: #22c55e; font-weight: bold;">📁 This is the EASIEST task - Just compile everyone's work!</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b joshika/week2</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<p><span style="background: #22c55e; color: black; padding: 2px 6px; border-radius: 4px;">GREEN = YOUR FILE</span></p>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 2/
│   ├── docs/
│   │   ├── METADATA_MAPPING.md        ← Saranya's
│   │   ├── PREPROCESSING_QA_REPORT.md ← Vinuthna's
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">WEEK2_SUMMARY.md</span>          ← YOUR FILE
│   ├── output/
│   │   ├── parsed_markdown.json       ← Bhargava's
│   │   ├── parsed_csv.json            ← Karthik's
│   │   ├── cleaned_documents.json     ← Kavya's
│   │   ├── chunked_documents.json     ← Arshad's
│   │   └── tagged_chunks.json         ← Shirisha's
│   └── src/
│       └── (all scripts)
</pre>

<h4>🔹 STEP 3: Wait for Team Members</h4>
<p>Ask each person for their status. This is YOUR job as report writer.</p>

<h4>🔹 STEP 4: Create WEEK2_SUMMARY.md</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Create a Week 2 Summary Report in Markdown format for Module 2: Document Preprocessing & Metadata Tagging. Include:

1. **Module Overview**
   - Objective: Parse documents, clean text, chunk, assign metadata

2. **Team Contributions Table**
   | Member | Task | Output File | Status |
   |--------|------|-------------|--------|
   | Arshad | Chunking | chunked_documents.json | ✅ |
   | Bhargava | Markdown Parsing | parsed_markdown.json | ✅ |
   ... (all 8 members)

3. **Statistics Section**
   - Total documents processed: X
   - Total chunks created: X
   - Average tokens per chunk: X
   - Departments covered: 5

4. **Deliverables Checklist**
   - [x] Preprocessing module
   - [x] Cleaned document chunks
   - [x] Role-based metadata
   - [x] QA report

5. **Issues & Resolutions**
   - Any problems encountered

6. **Next Steps (Week 3 Preview)**
   - Vector embeddings
   - Database indexing

Use professional formatting, emojis for visual appeal."
</div>

<h4>🔹 STEP 5: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add Week 2 Summary Report"
git push origin joshika/week2</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: Complete WEEK2_SUMMARY.md with all contributions.</p>
<p style="color: #f87171;">❌ DON'T TOUCH: Any code files, just read and summarize.</p>
`
    }
];

// =====================================================
// WEEK 1 TASKS (Module 1: Environment Setup) - COMPLETED
// =====================================================
const week1Tasks = [
    {
        id: 101,
        title: 'Module 1 Lead: Monitoring & Supervision',
        assignee: 'Arshad Pasha',
        priority: 'high',
        description: `<strong>Goal:</strong> Monitor Week 1 deliverables.<br>✅ COMPLETED`,
        deepExplanation: `<h3>✅ Week 1 Completed</h3><p>Environment setup and data exploration done.</p>`
    },
    {
        id: 102,
        title: 'Repository & Folder Structure',
        assignee: 'Kushagra Bhargava',
        priority: 'high',
        description: `<strong>Goal:</strong> Initialize project.<br>✅ COMPLETED`,
        deepExplanation: `<h3>✅ Week 1 Completed</h3><p>Folder structure created in week 1/data/</p>`
    },
    {
        id: 103,
        title: 'Finance & CSV Data Exploration',
        assignee: 'Guru Karthik Reddy Marthala',
        priority: 'medium',
        description: `<strong>Goal:</strong> Explore financial data.<br>✅ COMPLETED`,
        deepExplanation: `<h3>✅ Week 1 Completed</h3>`
    },
    {
        id: 104,
        title: 'HR Documentation Analysis',
        assignee: 'Depuru Joshika Reddy',
        priority: 'medium',
        description: `<strong>Goal:</strong> Explore HR documents.<br>✅ COMPLETED`,
        deepExplanation: `<h3>✅ Week 1 Completed</h3>`
    },
    {
        id: 105,
        title: 'Marketing Documentation',
        assignee: 'Kavya Ghantasala',
        priority: 'low',
        description: `<strong>Goal:</strong> Explore Marketing data.<br>✅ COMPLETED`,
        deepExplanation: `<h3>✅ Week 1 Completed</h3>`
    },
    {
        id: 106,
        title: 'Engineering & Tech Docs',
        assignee: 'Mandha Shirisha',
        priority: 'medium',
        description: `<strong>Goal:</strong> Explore tech docs.<br>✅ COMPLETED`,
        deepExplanation: `<h3>✅ Week 1 Completed</h3>`
    },
    {
        id: 107,
        title: 'Role-to-Document Mapping',
        assignee: 'Sri Saranya Chandrapati',
        priority: 'high',
        description: `<strong>Goal:</strong> Create RBAC foundation.<br>✅ COMPLETED`,
        deepExplanation: `<h3>✅ Week 1 Completed</h3>`
    },
    {
        id: 108,
        title: 'Week 1 Summary Report',
        assignee: 'Vinuthna Jangam',
        priority: 'high',
        description: `<strong>Goal:</strong> Consolidate findings.<br>✅ COMPLETED`,
        deepExplanation: `<h3>✅ Week 1 Completed</h3>`
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
const deepModal = document.getElementById('deepExplanationModal');

// INITIALIZE
document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
    setupEventListeners();
    setupNavigation();
});

function loadTasks() {
    const stored = localStorage.getItem('rbac_tasks_milestone1_v3');
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
    localStorage.setItem('rbac_tasks_milestone1_v3', JSON.stringify(tasks));
    renderTasks();
    updateStats();
}

function seedDatabase() {
    if (confirm("Reload Milestone 1 tasks with NEW detailed guides? This resets changes.")) {
        tasks = [...defaultTasks];
        saveTasks();
        alert("Tasks reloaded with detailed Deep Explanations!");
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

function showDeepExplanation(id) {
    const task = tasks.find(t => t.id === id);
    if (task && task.deepExplanation) {
        document.getElementById('deepModalContent').innerHTML = task.deepExplanation;
        document.getElementById('deepExplanationModal').classList.add('active');
    } else {
        alert('No deep explanation available.');
    }
}
window.showDeepExplanation = showDeepExplanation;

function closeDeepModal() {
    document.getElementById('deepExplanationModal').classList.remove('active');
}
window.closeDeepModal = closeDeepModal;

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
            <span class="week-status active">🔵 In Progress</span>
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

        ${task.deepExplanation ? `<button class="deep-explain-btn" onclick="showDeepExplanation(${task.id})">📘 Deep Explanation (Step-by-Step)</button>` : ''}

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
