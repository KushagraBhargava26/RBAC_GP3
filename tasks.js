// RBAC Group 3 - Offline Task Manager (Manual Mode)
// ---------------------------------------------------------
// Milestone 1: Data Preparation & Vector DB (Weeks 1-2) ✅ COMPLETED
// Milestone 2: Backend Auth & Search (Weeks 3-4) 🔵 IN PROGRESS
// ---------------------------------------------------------

// Team Members
const teamMembers = [
    'Arshad Pasha', 'Depuru Joshika Reddy', 'Guru Karthik Reddy Marthala',
    'Kavya Ghantasala', 'Kushagra Bhargava', 'Mandha Shirisha',
    'Sri Saranya Chandrapati', 'Vinuthna Jangam'
];

// =====================================================
// WEEK 4 TASKS (Module 4: Role-Based Search & Query Processing)
// =====================================================
const week4Tasks = [
    // 1. Arshad (LEAD) - RBAC Filtering Logic
    {
        id: 401,
        title: 'Build RBAC Filtering Logic for Document Access',
        assignee: 'Arshad Pasha',
        priority: 'high',
        status: 'completed',
        description: `<strong>Goal:</strong> Implement role-based access control filtering.<br><br>
1. Build RBAC filtering module for vector search.<br>
2. Implement role hierarchy: C-Level > Department > Employee.<br>
3. Filter search results based on user roles.<br>
4. Integrate with embedding search pipeline.<br><br>
<strong>📌 Output:</strong> rbac_filter.py with role-based search filtering.`,
        deepExplanation: `
<h3>📘 Complete Guide: RBAC Filtering Logic</h3>
<p style="color: #f87171; font-weight: bold;">⚠️ YOU ARE THE LEAD - Critical security component for access control.</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b arshad/week4</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<p><span style="background: #22c55e; color: black; padding: 2px 6px; border-radius: 4px;">GREEN = YOUR FILES</span></p>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 3/
│   └── output/
│       └── vector_db/              ← Use this for search
├── week 4/                         ← Create this folder
│   ├── src/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">rbac_filter.py</span>       ← YOUR FILE
│   ├── config/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">role_hierarchy.json</span>  ← YOUR CONFIG
│   └── output/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">filtered_results/</span>    ← YOUR OUTPUT
</pre>

<h4>🔹 STEP 3: Create role_hierarchy.json</h4>
<pre><code>mkdir -p "week 4/config"</code></pre>

<p>Create <code>week 4/config/role_hierarchy.json</code>:</p>
<pre><code>{
  "hierarchy": {
    "c-level": 100,
    "finance": 50,
    "hr": 50,
    "marketing": 50,
    "engineering": 50,
    "employees": 10
  },
  "department_access": {
    "c-level": ["Finance", "HR", "marketing", "engineering", "general"],
    "finance": ["Finance", "general"],
    "hr": ["HR", "general"],
    "marketing": ["marketing", "general"],
    "engineering": ["engineering", "general"],
    "employees": ["general"]
  }
}</code></pre>

<h4>🔹 STEP 4: Create rbac_filter.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python class called RBACFilter that:
1. Loads role_hierarchy.json for access permissions
2. Has method filter_by_role(user_role, search_results) that:
   - Takes a list of search results with 'department' metadata
   - Filters out results user doesn't have access to
   - Returns only accessible documents
3. Implements role hierarchy: C-Level sees all, departments see their own + general
4. Has method get_accessible_departments(user_role)
5. Includes logging for access attempts (allowed/denied)
6. Test with sample data for Finance user querying HR docs (should be denied)

Use json and logging libraries."
</div>

<h4>🔹 STEP 5: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add RBAC filtering module - Week 4"
git push origin arshad/week4</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: RBAC filtering blocks unauthorized access.</p>
<p style="color: #f87171;">❌ DON'T TOUCH: Vector database, embedding code from Week 3.</p>
`
    },

    // 2. Bhargava - Query Preprocessing
    {
        id: 402,
        title: 'Query Preprocessing & Normalization',
        assignee: 'Kushagra Bhargava',
        priority: 'medium',
        status: 'completed',
        description: `<strong>Goal:</strong> Preprocess user queries before search.<br><br>
1. Normalize incoming queries (lowercase, remove special chars).<br>
2. Extract keywords and entities.<br>
3. Expand abbreviations and synonyms.<br>
4. Prepare query for semantic search.<br><br>
<strong>📌 Output:</strong> query_processor.py`,
        deepExplanation: `
<h3>📘 Complete Guide: Query Preprocessing</h3>
<p style="color: #fbbf24; font-weight: bold;">📁 Your task: Clean and prepare user queries for search</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b bhargava/week4</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<p><span style="background: #22c55e; color: black; padding: 2px 6px; border-radius: 4px;">GREEN = YOUR FILES</span></p>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 4/
│   ├── src/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">query_processor.py</span>    ← YOUR FILE
│   ├── config/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">synonyms.json</span>         ← YOUR CONFIG
│   └── output/
</pre>

<h4>🔹 STEP 3: Create synonyms.json</h4>
<pre><code>{
  "abbr": {
    "q1": "quarter 1",
    "q2": "quarter 2",
    "q3": "quarter 3",
    "q4": "quarter 4",
    "roi": "return on investment",
    "hr": "human resources",
    "api": "application programming interface"
  },
  "synonyms": {
    "profit": ["revenue", "earnings", "income"],
    "employee": ["staff", "worker", "team member"],
    "policy": ["rule", "guideline", "procedure"]
  }
}</code></pre>

<h4>🔹 STEP 4: Create query_processor.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python class QueryProcessor that:
1. Loads synonyms.json for abbreviation expansion
2. Has method preprocess(query) that:
   - Converts to lowercase
   - Removes special characters except basic punctuation
   - Normalizes whitespace
   - Expands abbreviations (Q1 → quarter 1)
3. Has method extract_keywords(query) using simple NLP
4. Has method expand_synonyms(query) to add related terms
5. Returns processed query ready for semantic search
6. Prints: 'Original: X → Processed: Y'

Use re (regex) and json libraries."
</div>

<h4>🔹 STEP 5: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add query preprocessing module - Week 4"
git push origin bhargava/week4</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: Query processor normalizes and expands queries.</p>
`
    },

    // 3. Karthik - Relevant Chunk Selection
    {
        id: 403,
        title: 'Relevant Chunk Selection Algorithm',
        assignee: 'Guru Karthik Reddy Marthala',
        priority: 'medium',
        status: 'in-progress',
        description: `<strong>Goal:</strong> Select most relevant chunks for each query.<br><br>
1. Implement similarity scoring with thresholds.<br>
2. Rank chunks by relevance score.<br>
3. Select top-K chunks for context.<br>
4. Handle edge cases (no relevant docs).<br><br>
<strong>📌 Output:</strong> chunk_selector.py`,
        deepExplanation: `
<h3>📘 Complete Guide: Chunk Selection Algorithm</h3>
<p style="color: #fbbf24; font-weight: bold;">📁 Your task: Select the best chunks for RAG context</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b karthik/week4</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 4/
│   ├── src/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">chunk_selector.py</span>     ← YOUR FILE
│   └── config/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">selection_config.json</span> ← YOUR CONFIG
</pre>

<h4>🔹 STEP 3: Create selection_config.json</h4>
<pre><code>{
  "top_k": 5,
  "similarity_threshold": 0.3,
  "max_context_tokens": 2000,
  "diversity_weight": 0.2
}</code></pre>

<h4>🔹 STEP 4: Create chunk_selector.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python class ChunkSelector that:
1. Loads selection_config.json for parameters
2. Has method select_chunks(query_embedding, all_chunks, user_role) that:
   - Calculates cosine similarity between query and each chunk
   - Filters chunks below similarity threshold
   - Applies RBAC filter for user's role
   - Returns top-K most relevant chunks
3. Has method calculate_similarity(embedding1, embedding2)
4. Handles edge case: returns fallback message if no relevant chunks
5. Prints: 'Selected X chunks with avg similarity Y'

Use numpy for similarity calculations."
</div>

<h4>🔹 STEP 5: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add chunk selection algorithm - Week 4"
git push origin karthik/week4</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: Top-K relevant chunks selected for each query.</p>
`
    },

    // 4. Kavya - Role Permission Testing
    {
        id: 404,
        title: 'Role Permission Validation & Testing',
        assignee: 'Kavya Ghantasala',
        priority: 'high',
        status: 'in-progress',
        description: `<strong>Goal:</strong> Test and validate role-based access.<br><br>
1. Create test cases for each role.<br>
2. Verify Finance cannot access HR docs.<br>
3. Verify C-Level can access all.<br>
4. Document test results.<br><br>
<strong>📌 Output:</strong> rbac_tests.py + RBAC_TEST_REPORT.md`,
        deepExplanation: `
<h3>📘 Complete Guide: Role Permission Testing</h3>
<p style="color: #f87171; font-weight: bold;">🔒 Critical: Verify security boundaries are working!</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b kavya/week4</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 4/
│   ├── tests/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">rbac_tests.py</span>        ← YOUR FILE
│   ├── docs/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">RBAC_TEST_REPORT.md</span>  ← YOUR REPORT
│   └── output/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">test_results.json</span>    ← YOUR OUTPUT
</pre>

<h4>🔹 STEP 3: Create Test Cases</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python test suite for RBAC validation that:
1. Tests these scenarios:
   - Finance user queries finance docs → ALLOWED ✅
   - Finance user queries HR docs → DENIED ❌
   - HR user queries employee data → ALLOWED ✅
   - Marketing user queries finance → DENIED ❌
   - C-Level queries all departments → ALLOWED ✅
   - Employee queries general handbook → ALLOWED ✅

2. For each test:
   - Create mock search results with department metadata
   - Call RBAC filter
   - Verify correct docs are returned/blocked

3. Save results to test_results.json with:
   {test_name, role, query_type, expected, actual, passed}

4. Print summary: 'Tests Passed: X/Y'

Use unittest or pytest framework."
</div>

<h4>🔹 STEP 4: Create RBAC_TEST_REPORT.md</h4>
<p>Document all test cases, their purpose, results, and any issues found.</p>

<h4>🔹 STEP 5: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add RBAC validation tests - Week 4"
git push origin kavya/week4</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: All RBAC tests pass with zero unauthorized access.</p>
`
    },

    // 5. Shirisha - Search Integration
    {
        id: 405,
        title: 'Integrate Search Pipeline Components',
        assignee: 'Mandha Shirisha',
        priority: 'medium',
        status: 'in-progress',
        description: `<strong>Goal:</strong> Combine all search components into pipeline.<br><br>
1. Integrate query processor → embedding → search → RBAC filter.<br>
2. Create unified search interface.<br>
3. Add error handling for each stage.<br>
4. Test end-to-end flow.<br><br>
<strong>📌 Output:</strong> search_pipeline.py`,
        deepExplanation: `
<h3>📘 Complete Guide: Search Pipeline Integration</h3>
<p style="color: #fbbf24; font-weight: bold;">📁 Your task: Connect all the puzzle pieces!</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b shirisha/week4</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 4/
│   ├── src/
│   │   ├── query_processor.py    ← Bhargava's (import)
│   │   ├── rbac_filter.py        ← Arshad's (import)
│   │   ├── chunk_selector.py     ← Karthik's (import)
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">search_pipeline.py</span>   ← YOUR FILE
│   └── output/
</pre>

<h4>🔹 STEP 3: Create search_pipeline.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python class SearchPipeline that:
1. Imports and initializes: QueryProcessor, RBACFilter, ChunkSelector
2. Has method search(query, user_role) that:
   - Step 1: Preprocess query
   - Step 2: Generate query embedding
   - Step 3: Search vector database
   - Step 4: Filter by RBAC
   - Step 5: Select top-K chunks
   - Step 6: Return results with metadata
3. Has proper error handling for each step
4. Logs each step: 'Step X: [description] completed'
5. Returns { results: [...], total_found, filtered_count, processing_time }

Include a main() function for testing."
</div>

<h4>🔹 STEP 4: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add search pipeline integration - Week 4"
git push origin shirisha/week4</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: Complete search pipeline working end-to-end.</p>
`
    },

    // 6. Saranya - Role Configuration Documentation
    {
        id: 406,
        title: 'Role Configuration & Hierarchy Documentation',
        assignee: 'Sri Saranya Chandrapati',
        priority: 'medium',
        status: 'completed',
        description: `<strong>Goal:</strong> Document complete RBAC configuration.<br><br>
1. Document role hierarchy with diagrams.<br>
2. Create permission matrix table.<br>
3. Document search flow with RBAC.<br>
4. Add configuration guide.<br><br>
<strong>📌 Output:</strong> RBAC_CONFIGURATION.md`,
        deepExplanation: `
<h3>📘 Complete Guide: RBAC Configuration Documentation</h3>
<p style="color: #fbbf24; font-weight: bold;">📁 Your task: Document the complete RBAC system</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b saranya/week4</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 4/
│   └── docs/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">RBAC_CONFIGURATION.md</span> ← YOUR FILE
</pre>

<h4>🔹 STEP 3: Create RBAC_CONFIGURATION.md</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Create a comprehensive RBAC Configuration Guide in Markdown:

1. **Role Hierarchy Diagram**
   - ASCII art showing: C-Level (100) → Department Heads (50) → Employees (10)
   - Explain access levels

2. **Permission Matrix**
   | Role | Finance | HR | Marketing | Engineering | General |
   |------|---------|-----|-----------|-------------|---------|
   | c-level | ✅ | ✅ | ✅ | ✅ | ✅ |
   | finance | ✅ | ❌ | ❌ | ❌ | ✅ |
   ... (all roles)

3. **Search Flow with RBAC**
   - Diagram: Query → Preprocess → Search → RBAC Filter → Results

4. **Configuration Files Reference**
   - role_hierarchy.json structure
   - How to add new roles
   - How to modify permissions

5. **Security Considerations**
   - Why RBAC is important
   - Common pitfalls to avoid"
</div>

<h4>🔹 STEP 4: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add RBAC configuration documentation - Week 4"
git push origin saranya/week4</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: Complete RBAC documentation.</p>
`
    },

    // 7. Vinuthna - Search Quality Benchmarking
    {
        id: 407,
        title: 'Search Quality & Performance Benchmarking',
        assignee: 'Vinuthna Jangam',
        priority: 'medium',
        status: 'completed',
        description: `<strong>Goal:</strong> Test search quality and performance.<br><br>
1. Create benchmark queries for each role.<br>
2. Measure retrieval latency.<br>
3. Evaluate relevance of results.<br>
4. Create performance report.<br><br>
<strong>📌 Output:</strong> benchmark.py + SEARCH_BENCHMARK_REPORT.md`,
        deepExplanation: `
<h3>📘 Complete Guide: Search Quality Benchmarking</h3>
<p style="color: #fbbf24; font-weight: bold;">📁 Your task: Measure how well the search works!</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b vinuthna/week4</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 4/
│   ├── tests/
│   │   ├── <span style="background: #22c55e; color: black; padding: 2px 4px;">benchmark.py</span>             ← YOUR FILE
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">benchmark_queries.json</span>   ← YOUR QUERIES
│   ├── docs/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">SEARCH_BENCHMARK_REPORT.md</span> ← YOUR REPORT
│   └── output/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">benchmark_results.json</span>   ← YOUR OUTPUT
</pre>

<h4>🔹 STEP 3: Create benchmark_queries.json</h4>
<pre><code>{
  "queries": [
    {"query": "What was Q4 2024 revenue?", "role": "finance", "expected_dept": "Finance"},
    {"query": "What is the leave policy?", "role": "hr", "expected_dept": "HR"},
    {"query": "Marketing campaign ROI", "role": "marketing", "expected_dept": "marketing"},
    {"query": "API architecture", "role": "engineering", "expected_dept": "engineering"},
    {"query": "Employee handbook", "role": "employees", "expected_dept": "general"}
  ]
}</code></pre>

<h4>🔹 STEP 4: Create benchmark.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python benchmarking script that:
1. Loads benchmark_queries.json
2. For each query:
   - Measures search latency in milliseconds
   - Checks if results match expected department
   - Calculates relevance score (similarity)
3. Computes metrics:
   - Average latency
   - P95 latency
   - Accuracy (correct department %)
   - Average relevance score
4. Saves to benchmark_results.json
5. Prints table: | Query | Latency | Accuracy | Relevance |

Use time module for latency measurement."
</div>

<h4>🔹 STEP 5: Create SEARCH_BENCHMARK_REPORT.md</h4>
<p>Document: methodology, results, graphs, recommendations.</p>

<h4>🔹 STEP 6: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add search benchmarking module - Week 4"
git push origin vinuthna/week4</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: Benchmark shows < 500ms retrieval latency.</p>
`
    },

    // 8. Joshika - Week 4 Summary
    {
        id: 408,
        title: 'Week 4 Summary Report',
        assignee: 'Depuru Joshika Reddy',
        priority: 'low',
        status: 'completed',
        description: `<strong>Goal:</strong> Compile the Week 4 summary.<br><br>
1. Collect all deliverables from team.<br>
2. Summarize RBAC implementation.<br>
3. Document search quality results.<br>
4. Prepare for Milestone 3.<br><br>
<strong>📌 Output:</strong> WEEK4_SUMMARY.md`,
        deepExplanation: `
<h3>📘 Complete Guide: Week 4 Summary Report</h3>
<p style="color: #22c55e; font-weight: bold;">📁 EASIEST task - Compile everyone's work!</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b joshika/week4</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 4/
│   └── docs/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">WEEK4_SUMMARY.md</span>     ← YOUR FILE
</pre>

<h4>🔹 STEP 3: Wait for Team Members</h4>
<p>Ask each person for their status. Summarize the deliverables.</p>

<h4>🔹 STEP 4: Create WEEK4_SUMMARY.md</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Create a Week 4 Summary Report in Markdown for Module 4: Role-Based Search & Query Processing:

1. **Module Overview**
   - Objective: Implement RBAC filtering, query processing, search pipeline

2. **Team Contributions Table**
   | Member | Task | Output File | Status |
   |--------|------|-------------|--------|
   | Arshad | RBAC Filtering | rbac_filter.py | ✅ |
   ... (all 8 members)

3. **Key Metrics**
   - Search latency: < 500ms ✅
   - RBAC test pass rate: 100%
   - Zero unauthorized access

4. **Deliverables Checklist**
   - [x] RBAC filter module
   - [x] Query processor
   - [x] Search pipeline
   - [x] Validation tests
   - [x] Performance benchmarks

5. **Milestone 2 Completion**
   - Week 3: Vector DB ✅
   - Week 4: RBAC Search ✅

6. **Next Steps (Milestone 3)**
   - Week 5: FastAPI Authentication
   - Week 6: RAG Pipeline & LLM"
</div>

<h4>🔹 STEP 5: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add Week 4 Summary Report"
git push origin joshika/week4</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: Complete WEEK4_SUMMARY.md with all contributions.</p>
`
    }
];

// =====================================================
// WEEK 3 TASKS (Module 3: Vector Database & Embeddings)
// =====================================================
const week3Tasks = [
    // 1. Arshad (LEAD) - Embedding Generation
    {
        id: 301,
        title: 'Generate Vector Embeddings for All Chunks',
        assignee: 'Arshad Pasha',
        priority: 'high',
        status: 'completed',
        description: `<strong>Goal:</strong> Generate embeddings for all document chunks.<br><br>
1. Load chunked documents from Week 2.<br>
2. Initialize sentence-transformers model (all-MiniLM-L6-v2).<br>
3. Generate embeddings for each chunk.<br>
4. Save embeddings with metadata.<br><br>
<strong>📌 Output:</strong> embeddings.py + chunk_embeddings.json`,
        deepExplanation: `
<h3>📘 Complete Guide: Vector Embedding Generation</h3>
<p style="color: #f87171; font-weight: bold;">⚠️ YOU ARE THE LEAD - This creates the core search functionality.</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b arshad/week3</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<p><span style="background: #22c55e; color: black; padding: 2px 6px; border-radius: 4px;">GREEN = YOUR FILES</span></p>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 2/
│   └── output/
│       └── chunked_documents.json  ← Your INPUT (from Week 2)
├── week 3/                         ← Create this folder
│   ├── src/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">embeddings.py</span>        ← YOUR FILE
│   ├── output/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">chunk_embeddings.json</span> ← YOUR OUTPUT
│   └── README.md
</pre>

<h4>🔹 STEP 3: Create the Folders</h4>
<pre><code>cd RBAC_GP3
mkdir -p "week 3/src"
mkdir -p "week 3/output"</code></pre>

<h4>🔹 STEP 4: Create embeddings.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python script that:
1. Loads '../week 2/output/chunked_documents.json'
2. Initializes SentenceTransformer model 'all-MiniLM-L6-v2'
3. For each chunk:
   - Generate embedding vector (384 dimensions)
   - Store with chunk_id, content, source_file, embedding
4. Save to '../output/chunk_embeddings.json'
5. Print progress: 'Generated embedding for chunk X/Y'
6. Print summary: 'Total embeddings: X, Dimension: 384'

Use sentence-transformers library and proper error handling."
</div>

<h4>🔹 STEP 5: Install Required Libraries</h4>
<pre><code>pip install sentence-transformers torch</code></pre>

<h4>🔹 STEP 6: Run & Verify</h4>
<pre><code>cd "week 3/src"
python embeddings.py</code></pre>

<h4>🔹 STEP 7: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add embedding generation module - Week 3"
git push origin arshad/week3</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: All chunks have 384-dimensional embeddings.</p>
<p style="color: #f87171;">❌ DON'T TOUCH: Week 2 output files, other team's code.</p>
`
    },

    // 2. Bhargava - Vector Database Setup
    {
        id: 302,
        title: 'Initialize Vector Database (Chroma)',
        assignee: 'Kushagra Bhargava',
        priority: 'high',
        status: 'completed',
        description: `<strong>Goal:</strong> Set up ChromaDB for vector storage.<br><br>
1. Install and configure ChromaDB.<br>
2. Create collection with proper schema.<br>
3. Prepare for embedding indexing.<br><br>
<strong>📌 Output:</strong> vector_db_setup.py + configured database`,
        deepExplanation: `
<h3>📘 Complete Guide: Vector Database Setup</h3>
<p style="color: #f87171; font-weight: bold;">📁 Critical: This is the foundation for semantic search!</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b bhargava/week3</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 3/
│   ├── src/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">vector_db_setup.py</span>  ← YOUR FILE
│   ├── output/
│   │   └── vector_db/           ← ChromaDB storage folder
│   └── config/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">db_config.json</span>      ← YOUR CONFIG
</pre>

<h4>🔹 STEP 3: Create db_config.json</h4>
<pre><code>{
  "collection_name": "rbac_documents",
  "persist_directory": "../output/vector_db",
  "embedding_dimension": 384,
  "distance_metric": "cosine"
}</code></pre>

<h4>🔹 STEP 4: Create vector_db_setup.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python script that:
1. Installs and imports chromadb
2. Creates a persistent Chroma client in '../output/vector_db'
3. Creates a collection called 'rbac_documents' with cosine similarity
4. Defines metadata schema:
   - chunk_id (string)
   - source_file (string)
   - department (string)
   - accessible_roles (list)
5. Has helper functions:
   - get_collection() - returns the collection
   - add_documents(chunks, embeddings, metadata)
   - query(embedding, n_results=5)
6. Prints: 'Vector database initialized at: [path]'

Use chromadb library with proper error handling."
</div>

<h4>🔹 STEP 5: Install ChromaDB</h4>
<pre><code>pip install chromadb</code></pre>

<h4>🔹 STEP 6: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add vector database setup - Week 3"
git push origin bhargava/week3</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: ChromaDB collection created and ready.</p>
`
    },

    // 3. Karthik - Index Embeddings
    {
        id: 303,
        title: 'Index Embeddings into Vector Database',
        assignee: 'Guru Karthik Reddy Marthala',
        priority: 'high',
        status: 'completed',
        description: `<strong>Goal:</strong> Load embeddings into ChromaDB.<br><br>
1. Load embeddings from Arshad's output.<br>
2. Load tagged chunks from Week 2.<br>
3. Index into ChromaDB with metadata.<br><br>
<strong>📌 Output:</strong> index_embeddings.py`,
        deepExplanation: `
<h3>📘 Complete Guide: Index Embeddings</h3>
<p style="color: #fbbf24; font-weight: bold;">📁 Your task: Put embeddings into the vector database</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b karthik/week3</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 3/
│   ├── src/
│   │   ├── embeddings.py         ← Arshad's (INPUT)
│   │   ├── vector_db_setup.py    ← Bhargava's (IMPORT)
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">index_embeddings.py</span>  ← YOUR FILE
│   └── output/
│       ├── chunk_embeddings.json ← INPUT
│       └── vector_db/            ← OUTPUT
</pre>

<h4>🔹 STEP 3: Create index_embeddings.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python script that:
1. Loads '../output/chunk_embeddings.json'
2. Loads tagged metadata from '../week 2/output/tagged_chunks.json'
3. Imports vector_db_setup.py to get the collection
4. For each chunk:
   - Extract embedding, content, metadata
   - Add to ChromaDB collection with:
     ids=[chunk_id], embeddings=[...], documents=[content],
     metadatas=[{department, accessible_roles, source}]
5. Index in batches of 100 for efficiency
6. Print progress: 'Indexed batch X/Y'
7. Print summary: 'Total indexed: X documents'

Use proper batch processing and error handling."
</div>

<h4>🔹 STEP 4: Run After Getting Input Files</h4>
<pre><code>cd "week 3/src"
python index_embeddings.py</code></pre>

<h4>🔹 STEP 5: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add embedding indexing module - Week 3"
git push origin karthik/week3</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: All embeddings indexed with metadata in ChromaDB.</p>
`
    },

    // 4. Kavya - Semantic Search Implementation
    {
        id: 304,
        title: 'Implement Semantic Search Functionality',
        assignee: 'Kavya Ghantasala',
        priority: 'high',
        status: 'completed',
        description: `<strong>Goal:</strong> Build the core search interface.<br><br>
1. Create search function using embeddings.<br>
2. Query vector database.<br>
3. Return ranked results with scores.<br><br>
<strong>📌 Output:</strong> semantic_search.py`,
        deepExplanation: `
<h3>📘 Complete Guide: Semantic Search</h3>
<p style="color: #fbbf24; font-weight: bold;">📁 Your task: Make the search actually work!</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b kavya/week3</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 3/
│   ├── src/
│   │   ├── vector_db_setup.py   ← Bhargava's (IMPORT)
│   │   ├── embeddings.py        ← Arshad's (for query embedding)
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">semantic_search.py</span>  ← YOUR FILE
│   └── output/
</pre>

<h4>🔹 STEP 3: Create semantic_search.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python class SemanticSearch that:
1. Initializes with SentenceTransformer model and ChromaDB collection
2. Has method search(query, n_results=5) that:
   - Converts query text to embedding
   - Queries ChromaDB for similar documents
   - Returns list of {chunk_id, content, score, metadata}
3. Has method search_with_filter(query, department, n_results=5)
4. Calculates and returns similarity scores
5. Includes a test function with sample queries:
   - 'What is the Q4 revenue?'
   - 'Employee leave policy'
   - 'Marketing campaign results'

Print results in a formatted table."
</div>

<h4>🔹 STEP 4: Test the Search</h4>
<pre><code>cd "week 3/src"
python semantic_search.py</code></pre>

<h4>🔹 STEP 5: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add semantic search functionality - Week 3"
git push origin kavya/week3</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: Semantic search returns relevant results.</p>
`
    },

    // 5. Shirisha - Search Quality Testing
    {
        id: 305,
        title: 'Search Quality Testing & Validation',
        assignee: 'Mandha Shirisha',
        priority: 'medium',
        status: 'completed',
        description: `<strong>Goal:</strong> Test search functionality quality.<br><br>
1. Create test queries for each department.<br>
2. Validate relevance of results.<br>
3. Measure search latency.<br><br>
<strong>📌 Output:</strong> search_tests.py + SEARCH_QA_REPORT.md`,
        deepExplanation: `
<h3>📘 Complete Guide: Search Quality Testing</h3>
<p style="color: #fbbf24; font-weight: bold;">📁 Your task: Make sure search actually works correctly!</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b shirisha/week3</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 3/
│   ├── tests/
│   │   ├── <span style="background: #22c55e; color: black; padding: 2px 4px;">search_tests.py</span>      ← YOUR FILE
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">test_queries.json</span>    ← YOUR QUERIES
│   ├── docs/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">SEARCH_QA_REPORT.md</span>  ← YOUR REPORT
│   └── output/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">test_results.json</span>    ← YOUR OUTPUT
</pre>

<h4>🔹 STEP 3: Create test_queries.json</h4>
<pre><code>[
  {"query": "quarterly revenue report", "expected_dept": "Finance"},
  {"query": "employee benefits policy", "expected_dept": "HR"},
  {"query": "marketing campaign ROI", "expected_dept": "marketing"},
  {"query": "API documentation", "expected_dept": "engineering"},
  {"query": "company handbook", "expected_dept": "general"}
]</code></pre>

<h4>🔹 STEP 4: Create search_tests.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python test script that:
1. Loads test_queries.json
2. For each query:
   - Run semantic search
   - Measure latency in milliseconds
   - Check if top result is from expected department
   - Calculate relevance score
3. Save results to test_results.json:
   {query, expected_dept, actual_dept, latency_ms, passed, score}
4. Calculate: pass rate, avg latency, avg score
5. Print summary table

Include assertions for: latency < 500ms, correct department matching."
</div>

<h4>🔹 STEP 5: Create SEARCH_QA_REPORT.md</h4>
<p>Document: test methodology, results, issues found, recommendations.</p>

<h4>🔹 STEP 6: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add search quality testing - Week 3"
git push origin shirisha/week3</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: Search tests pass with high accuracy.</p>
`
    },

    // 6. Saranya - Vector DB Documentation
    {
        id: 306,
        title: 'Vector Database Architecture Documentation',
        assignee: 'Sri Saranya Chandrapati',
        priority: 'medium',
        status: 'completed',
        description: `<strong>Goal:</strong> Document the vector database setup.<br><br>
1. Document embedding model choice.<br>
2. Create architecture diagram.<br>
3. Document query flow.<br><br>
<strong>📌 Output:</strong> VECTOR_DB_ARCHITECTURE.md`,
        deepExplanation: `
<h3>📘 Complete Guide: Vector DB Documentation</h3>
<p style="color: #fbbf24; font-weight: bold;">📁 Your task: Document how the vector database works</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b saranya/week3</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 3/
│   └── docs/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">VECTOR_DB_ARCHITECTURE.md</span> ← YOUR FILE
</pre>

<h4>🔹 STEP 3: Create VECTOR_DB_ARCHITECTURE.md</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Create a comprehensive Vector Database Architecture document in Markdown:

1. **Overview**
   - What is a vector database?
   - Why ChromaDB?
   - Use case for RBAC chatbot

2. **Embedding Model**
   - Model: all-MiniLM-L6-v2
   - Dimension: 384
   - Why this model? (speed, quality, size)

3. **Architecture Diagram**
   - ASCII art: Document → Chunk → Embed → Index → Query
   
4. **Collection Schema**
   - Fields: chunk_id, content, embedding, metadata
   - Metadata: department, accessible_roles, source

5. **Query Flow**
   - Step 1: User query → Embedding
   - Step 2: Similarity search
   - Step 3: Filter by metadata
   - Step 4: Return results

6. **Performance Considerations**
   - Batch indexing
   - Query optimization
   - Scaling strategies"
</div>

<h4>🔹 STEP 4: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add vector database architecture docs - Week 3"
git push origin saranya/week3</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: Complete architecture documentation.</p>
`
    },

    // 7. Vinuthna - Performance Benchmarking
    {
        id: 307,
        title: 'Embedding & Search Performance Benchmarking',
        assignee: 'Vinuthna Jangam',
        priority: 'medium',
        status: 'completed',
        description: `<strong>Goal:</strong> Benchmark embedding and search performance.<br><br>
1. Measure embedding generation time.<br>
2. Measure search latency.<br>
3. Create performance report.<br><br>
<strong>📌 Output:</strong> benchmark.py + PERFORMANCE_REPORT.md`,
        deepExplanation: `
<h3>📘 Complete Guide: Performance Benchmarking</h3>
<p style="color: #fbbf24; font-weight: bold;">📁 Your task: Measure how fast everything runs!</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b vinuthna/week3</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 3/
│   ├── tests/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">benchmark.py</span>          ← YOUR FILE
│   ├── docs/
│   │   └── <span style="background: #22c55e; color: black; padding: 2px 4px;">PERFORMANCE_REPORT.md</span> ← YOUR REPORT
│   └── output/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">benchmark_results.json</span> ← YOUR OUTPUT
</pre>

<h4>🔹 STEP 3: Create benchmark.py</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Write a Python benchmarking script that:
1. Measures embedding generation:
   - Time to embed 1 document
   - Time to embed 10 documents
   - Average time per document
2. Measures search performance:
   - Time for 10 queries
   - Average query latency
   - P95 latency
3. Measures indexing:
   - Time to index 100 documents
4. Saves results to benchmark_results.json
5. Prints table:
   | Operation | Time (ms) | Throughput |
   |-----------|-----------|------------|
   | Embed 1   | X         | Y docs/sec |

Use time and statistics modules."
</div>

<h4>🔹 STEP 4: Create PERFORMANCE_REPORT.md</h4>
<p>Include: methodology, results, graphs (if possible), recommendations.</p>

<h4>🔹 STEP 5: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add performance benchmarking - Week 3"
git push origin vinuthna/week3</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: Performance meets targets (< 500ms search).</p>
`
    },

    // 8. Joshika - Week 3 Summary
    {
        id: 308,
        title: 'Week 3 Summary Report',
        assignee: 'Depuru Joshika Reddy',
        priority: 'low',
        status: 'completed',
        description: `<strong>Goal:</strong> Compile the Week 3 summary.<br><br>
1. Collect all deliverables.<br>
2. Summarize vector DB implementation.<br>
3. Document performance metrics.<br><br>
<strong>📌 Output:</strong> WEEK3_SUMMARY.md`,
        deepExplanation: `
<h3>📘 Complete Guide: Week 3 Summary Report</h3>
<p style="color: #22c55e; font-weight: bold;">📁 EASIEST task - Compile everyone's work!</p>
<hr>

<h4>🔹 STEP 1: Create Your Branch</h4>
<pre><code>git checkout main
git pull origin main
git checkout -b joshika/week3</code></pre>

<h4>🔹 STEP 2: Your Folder Structure</h4>
<pre style="background: #1e293b; padding: 1rem; border-radius: 8px;">
RBAC_GP3/
├── week 3/
│   └── docs/
│       └── <span style="background: #22c55e; color: black; padding: 2px 4px;">WEEK3_SUMMARY.md</span>     ← YOUR FILE
</pre>

<h4>🔹 STEP 3: Create WEEK3_SUMMARY.md</h4>

<p><strong>📋 Copy this ChatGPT Prompt:</strong></p>
<div style="background: #3b82f6; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>ChatGPT Prompt (Copy-Paste This):</strong><br><br>
"Create a Week 3 Summary Report in Markdown for Module 3: Vector Database & Embeddings:

1. **Module Overview**
   - Objective: Generate embeddings, index into vector DB, enable semantic search

2. **Team Contributions Table**
   | Member | Task | Output File | Status |
   |--------|------|-------------|--------|
   | Arshad | Embeddings | embeddings.py | ✅ |
   | Bhargava | Vector DB Setup | vector_db_setup.py | ✅ |
   ... (all 8 members)

3. **Technical Summary**
   - Embedding model: all-MiniLM-L6-v2
   - Vector DB: ChromaDB
   - Total documents indexed: X
   - Search latency: < Xms

4. **Deliverables Checklist**
   - [x] Embedding generation module
   - [x] Vector database setup
   - [x] Semantic search implementation
   - [x] Performance benchmarks
   - [x] Architecture documentation

5. **Next Steps (Week 4)**
   - RBAC filtering
   - Query processing"
</div>

<h4>🔹 STEP 4: Commit & Push</h4>
<pre><code>git add .
git commit -m "Add Week 3 Summary Report"
git push origin joshika/week3</code></pre>

<hr>
<p style="color: #22c55e; font-weight: bold;">✅ SUCCESS: Complete WEEK3_SUMMARY.md with all contributions.</p>
`
    }
];

// =====================================================
// WEEK 2 TASKS (Module 2: Document Preprocessing) ✅ COMPLETED
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

// Combine all tasks (Milestone 2 first, then Milestone 1)
const defaultTasks = [...week4Tasks, ...week3Tasks, ...week2Tasks, ...week1Tasks];

// STATE
let tasks = [];
let currentFilter = 'all';
let editingTaskId = null;
let week1Collapsed = true;
let week2Collapsed = true;
let week3Collapsed = true;
let week4Collapsed = false;

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
    const stored = localStorage.getItem('rbac_tasks_milestone2_v1');
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
    localStorage.setItem('rbac_tasks_milestone2_v1', JSON.stringify(tasks));
    renderTasks();
    updateStats();
}

function seedDatabase() {
    if (confirm("Reload ALL tasks with NEW Milestone 2 guides? This resets changes.")) {
        // Clear old localStorage
        localStorage.removeItem('rbac_tasks_milestone1_v3');
        tasks = [...defaultTasks];
        saveTasks();
        alert("Tasks reloaded with Milestone 2 (Week 3 & 4)!");
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
    } else if (weekNum === 2) {
        week2Collapsed = !week2Collapsed;
    } else if (weekNum === 3) {
        week3Collapsed = !week3Collapsed;
    } else if (weekNum === 4) {
        week4Collapsed = !week4Collapsed;
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
    const week4 = tasks.filter(t => t.id >= 400 && t.id < 500);
    const week3 = tasks.filter(t => t.id >= 300 && t.id < 400);
    const week2 = tasks.filter(t => t.id >= 200 && t.id < 300);
    const week1 = tasks.filter(t => t.id >= 100 && t.id < 200);

    let html = `
    <!-- MILESTONE 2: Backend Auth & Search (Current) -->
    <div class="milestone-header">
        <h2>🎯 Milestone 2: Backend Auth & Search (Weeks 3-4)</h2>
    </div>

    <!-- WEEK 3 (Completed) -->
    <div class="week-section week-completed">
        <div class="week-header" onclick="toggleWeek(3)">
            <span class="week-toggle">${week3Collapsed ? '▶' : '▼'}</span>
            <h3>📅 Week 3: Vector Database & Embedding Generation</h3>
            <span class="week-status completed">✅ Completed</span>
            <span class="task-count">${week3.length} tasks</span>
        </div>
        <div class="week-tasks ${week3Collapsed ? 'collapsed' : ''}">
            ${week3.map(task => createTaskHTML(task)).join('')}
        </div>
    </div>

    <!-- WEEK 4 (In Progress - Current) -->
    <div class="week-section">
        <div class="week-header" onclick="toggleWeek(4)">
            <span class="week-toggle">${week4Collapsed ? '▶' : '▼'}</span>
            <h3>📅 Week 4: Role-Based Search & Query Processing</h3>
            <span class="week-status active">🔵 In Progress</span>
            <span class="task-count">${week4.length} tasks</span>
        </div>
        <div class="week-tasks ${week4Collapsed ? 'collapsed' : ''}">
            ${week4.map(task => createTaskHTML(task)).join('')}
        </div>
    </div>

    <!-- MILESTONE 1: Data Preparation & Vector DB (Completed) -->
    <div class="milestone-header" style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(22, 163, 74, 0.1)); border-color: rgba(34, 197, 94, 0.3); margin-top: 3rem;">
        <h2 style="color: #22c55e;">✅ Milestone 1: Data Preparation & Vector DB (Weeks 1-2) - COMPLETED</h2>
    </div>

    <!-- WEEK 2 (Completed) -->
    <div class="week-section week-completed">
        <div class="week-header" onclick="toggleWeek(2)">
            <span class="week-toggle">${week2Collapsed ? '▶' : '▼'}</span>
            <h3>📅 Week 2: Document Preprocessing & Metadata Tagging</h3>
            <span class="week-status completed">✅ Completed</span>
            <span class="task-count">${week2.length} tasks</span>
        </div>
        <div class="week-tasks ${week2Collapsed ? 'collapsed' : ''}">
            ${week2.map(task => createTaskHTML(task)).join('')}
        </div>
    </div>

    <!-- WEEK 1 (Completed) -->
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

    // Determine status badge
    let statusBadge = '';
    if (task.status === 'completed') {
        statusBadge = `<span style="background: rgba(34, 197, 94, 0.2); color: #22c55e; padding: 4px 10px; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; border: 1px solid rgba(34, 197, 94, 0.4);">✅ Completed</span>`;
    } else if (task.status === 'in-progress') {
        statusBadge = `<span style="background: rgba(59, 130, 246, 0.2); color: #3b82f6; padding: 4px 10px; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; border: 1px solid rgba(59, 130, 246, 0.4);">🔵 In Progress</span>`;
    }

    return `
    <div class="task-card ${priorityClass}">
        <div class="task-header">
            <div style="flex-grow:1">${statusBadge}</div>
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
