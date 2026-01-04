// RBAC Group 3 - Offline Task Manager (Manual Mode)
// ---------------------------------------------------------
// 📝 NOTE: This file contains all task data.
// To add/edit tasks permanently, edit the 'defaultTasks' array below.
// ---------------------------------------------------------

// 1. Define Team Members
const teamMembers = [
    'Arshad Pasha', 'Depuru Joshika Reddy', 'Guru Karthik Reddy Marthala',
    'Kavya Ghantasala', 'Kushagra Bhargava', 'Mandha Shirisha',
    'Sri Saranya Chandrapati', 'Vinuthna Jangam'
];

// 2. Define The Tasks (MODULE 1: Environment Setup & Data Exploration)
const defaultTasks = [
    // 1. Arshad (Monitor / All-rounded)
    {
        id: 1,
        title: 'Module 1 Lead: Monitoring & Supervision',
        description: `<strong>Goal:</strong> Monitor the completion of all Week 1 deliverables.<br><br>
1. Verify Python Env setup for the team.<br>
2. Review the Repository structure created by Bhargava.<br>
3. Review Document Analysis (HR, Finance, Marketing, Tech).<br>
4. Validate the Role-Mapping matrix.<br><br>
<strong>📌 Deliverable:</strong> Final sign-off on Week 1.`,
        assignee: 'Arshad Pasha',
        priority: 'high',
        milestone: 'Module 1',
        due_date: '2026-01-12',
        status: 'in-progress'
    },

    // 2. Bhargava (Repo & Structure)
    {
        id: 2,
        title: 'Repository & Folder Structure Initialization',
        description: `<strong>Goal:</strong> Initialize the project foundation.<br><br>
1. Clone GitHub repository containing RAG documents.<br>
2. Initialize project folder structure on local system.<br>
3. Structure: /data (finance, hr, etc.), /src, /docs.<br>
4. Ensure .gitignore and requirements.txt are present.<br><br>
<strong>📌 Deliverable:</strong> Project folder structure initialized on local system.`,
        assignee: 'Kushagra Bhargava',
        priority: 'high',
        milestone: 'Module 1',
        due_date: '2026-01-08',
        status: 'pending'
    },

    // 3. Karthik (Finance & CSV - Same as before)
    {
        id: 3,
        title: 'Data Exploration: Finance & CSV Files',
        description: `<strong>Goal:</strong> Explore financial data.<br><br>
1. Explore all CSV files in the dataset.<br>
2. Understand document content and structure for Finance.<br>
3. Identify sensitive vs general financial information.<br><br>
<strong>📌 Deliverable:</strong> Finance Data exploration summary.`,
        assignee: 'Guru Karthik Reddy Marthala',
        priority: 'medium',
        milestone: 'Module 1',
        due_date: '2026-01-09',
        status: 'pending'
    },

    // 4. Joshika (HR Documentation)
    {
        id: 4,
        title: 'Data Exploration: HR Documentation',
        description: `<strong>Goal:</strong> Explore HR-related data.<br><br>
1. Read through HR policy documents and employee data.<br>
2. Understand document content and structure.<br>
3. Identify employee records and privacy needs.<br><br>
<strong>📌 Deliverable:</strong> HR Data exploration summary.`,
        assignee: 'Depuru Joshika Reddy',
        priority: 'medium',
        milestone: 'Module 1',
        due_date: '2026-01-09',
        status: 'pending'
    },

    // 5. Kavya (Marketing - Assigned based on focus)
    {
        id: 5,
        title: 'Data Exploration: Marketing Documentation',
        description: `<strong>Goal:</strong> Explore Marketing data.<br><br>
1. Read through marketing reports and campaign docs.<br>
2. Understand document content and structure.<br>
3. Check for public vs internal marketing info.<br><br>
<strong>📌 Deliverable:</strong> Marketing Data exploration summary.`,
        assignee: 'Kavya Ghantasala',
        priority: 'low',
        milestone: 'Module 1',
        due_date: '2026-01-09',
        status: 'pending'
    },

    // 6. Shirisha (Engineering/Tech)
    {
        id: 6,
        title: 'Data Exploration: Engineering & Tech Docs',
        description: `<strong>Goal:</strong> Explore Technical documentation.<br><br>
1. read through Engineering/Tech docs (APIs, Architecture).<br>
2. Understand document content and structure.<br>
3. Identify technical requirements found in docs.<br><br>
<strong>📌 Deliverable:</strong> Tech Data exploration summary.`,
        assignee: 'Mandha Shirisha',
        priority: 'medium',
        milestone: 'Module 1',
        due_date: '2026-01-09',
        status: 'pending'
    },

    // 7. Saranya (Role Mapping)
    {
        id: 7,
        title: 'Role-to-Document Mapping',
        description: `<strong>Goal:</strong> Create the RBAC foundation.<br><br>
1. Map Roles: Finance → financial reports.<br>
2. Map Roles: Marketing → marketing reports.<br>
3. Map Roles: HR → employee data.<br>
4. Map Roles: Engineering → tech docs.<br>
5. Map Roles: C-Level → all docs.<br><br>
<strong>📌 Deliverable:</strong> Role-document mapping documentation (Matrix).`,
        assignee: 'Sri Saranya Chandrapati',
        priority: 'high',
        milestone: 'Module 1',
        due_date: '2026-01-11',
        status: 'pending'
    },

    // 8. Vinuthna (Final Summary)
    {
        id: 8,
        title: 'Week 1 Content Summary Report',
        description: `<strong>Goal:</strong> Consolidate Week 1 findings.<br><br>
1. Combine all data exploration summaries.<br>
2. Combine env setup details.<br>
3. Combine role mapping details.<br>
4. Create the final report.<br><br>
<strong>📌 Deliverable:</strong> Data exploration and content summary report.`,
        assignee: 'Vinuthna Jangam',
        priority: 'high',
        milestone: 'Module 1',
        due_date: '2026-01-12',
        status: 'pending'
    }
];

// STATE MGMT
let tasks = [];
let currentFilter = 'all';
let editingTaskId = null;

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

// INITIALIZE
document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
    setupEventListeners();
    setupNavigation();
});

// --- CORE FUNCTIONS (LOCAL ONLY) ---

function loadTasks() {
    // 1. Try to get assignments from LocalStorage
    // Changed key to force reload of these new Module 1 tasks
    const stored = localStorage.getItem('rbac_tasks_module1_v1');

    if (stored) {
        tasks = JSON.parse(stored);
    } else {
        // 2. First time? Use the Code defaults
        tasks = [...defaultTasks];
        saveTasks();
    }

    renderTasks();
    updateStats();
}

function saveTasks() {
    localStorage.setItem('rbac_tasks_module1_v1', JSON.stringify(tasks));
    renderTasks();
    updateStats();
}

// "Restore Defaults" Button
function seedDatabase() {
    if (confirm("Load 'Module 1' assignments for Week 1? This resets current changes.")) {
        tasks = [...defaultTasks];
        saveTasks();
        alert("Module 1 Assignments Loaded!");
    }
}
window.seedDatabase = seedDatabase;

// Create
function createTask(taskData) {
    const newId = Date.now();
    const newTask = { ...taskData, id: newId, created_at: new Date().toISOString() };
    tasks.unshift(newTask);
    saveTasks();
}

// Update
function updateTask(id, updates) {
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
        tasks[index] = { ...tasks[index], ...updates };
        saveTasks();
    }
}

// Delete
function deleteTask(id) {
    if (!confirm('Delete this task?')) return;
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
}

// --- UI HANDLING ---

function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        const newStatus = task.status === 'completed' ? 'pending' : 'completed';
        updateTask(id, { status: newStatus });
    }
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        // Strip HTML
        const cleanDesc = task.description.replace(/<br>/g, '\n').replace(/<strong>/g, '').replace(/<\/strong>/g, '');
        const editableTask = { ...task, description: cleanDesc };
        openModal(editableTask);
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

function handleFormSubmit(e) {
    e.preventDefault();
    const rawDesc = document.getElementById('taskDescription').value;
    const formattedDesc = rawDesc.replace(/\n/g, '<br>');

    const taskData = {
        title: document.getElementById('taskTitle').value,
        description: formattedDesc,
        assignee: document.getElementById('assignee').value,
        priority: document.getElementById('priority').value,
        milestone: document.getElementById('milestone').value,
        due_date: document.getElementById('dueDate').value,
        status: document.getElementById('status').value
    };

    if (editingTaskId) {
        updateTask(editingTaskId, taskData);
    } else {
        createTask(taskData);
    }
    closeModal();
}

// --- RENDER FUNCTIONS (CLEAN - No Badges per request) ---

function renderTasks() {
    let filteredTasks = tasks;
    if (currentFilter !== 'all') {
        filteredTasks = tasks.filter(t => t.status === currentFilter);
    }

    if (filteredTasks.length === 0) {
        tasksContainer.innerHTML = '';
        if (tasks.length === 0) {
            emptyState.style.display = 'block';
            tasksContainer.style.display = 'none';
        } else {
            tasksContainer.innerHTML = `<div style="text-align:center; padding:2rem; color:var(--text-secondary)">No tasks found.</div>`;
            emptyState.style.display = 'none';
            tasksContainer.style.display = 'block';
        }
    } else {
        emptyState.style.display = 'none';
        tasksContainer.style.display = 'grid';
        tasksContainer.innerHTML = filteredTasks.map(task => createTaskHTML(task)).join('');
    }
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
        
        <h3 class="task-title" style="margin-top:-10px">${task.title}</h3>
        
        <div class="task-desc-wrapper">
            <p class="task-desc" id="desc-${task.id}">${task.description}</p>
            <button class="read-more-btn" id="btn-${task.id}" onclick="toggleDescription(${task.id})">See Full Description ⬇</button>
        </div>
        
        <div class="task-milestone">🚩 ${task.milestone}</div>

        <div class="task-footer">
            <div class="task-meta">
                <div class="task-assignee">
                    <div class="assignee-avatar">${initials}</div>
                    ${task.assignee}
                </div>
                <div class="task-date">📅 Due: ${task.due_date || 'No Date'}</div>
            </div>
        </div>
    </div>
    `;
}

function updateStats() {
    const totalEl = document.getElementById('totalTasks');
    if (!totalEl) return;
    totalEl.textContent = tasks.length;
    // (Other stats elements were removed from HTML, so we check existence)
    if (document.getElementById('pendingTasks')) document.getElementById('pendingTasks').textContent = tasks.filter(t => t.status === 'pending').length;
    if (document.getElementById('inProgressTasks')) document.getElementById('inProgressTasks').textContent = tasks.filter(t => t.status === 'in-progress').length;
    if (document.getElementById('completedTasks')) document.getElementById('completedTasks').textContent = tasks.filter(t => t.status === 'completed').length;
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
    addTaskBtn.addEventListener('click', () => openModal());
    closeModalBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    taskModal.addEventListener('click', (e) => { if (e.target === taskModal) closeModal(); });
    taskForm.addEventListener('submit', handleFormSubmit);

    if (filterTabs && filterTabs.length > 0) {
        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                filterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                currentFilter = tab.dataset.filter;
                renderTasks();
            });
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

function openModal(task = null) {
    taskModal.classList.add('active');
    if (task) {
        editingTaskId = task.id;
        modalTitle.textContent = 'Edit Task';
        document.getElementById('taskTitle').value = task.title;
        // Strip HTML
        const cleanDesc = task.description.replace(/<br>/g, '\n').replace(/<strong>/g, '').replace(/<\/strong>/g, '');
        document.getElementById('taskDescription').value = cleanDesc;

        document.getElementById('assignee').value = task.assignee;
        document.getElementById('priority').value = task.priority;
        document.getElementById('milestone').value = task.milestone;
        document.getElementById('dueDate').value = task.due_date || '';
        document.getElementById('status').value = task.status;
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
