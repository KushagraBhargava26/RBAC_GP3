// RBAC Group 3 - Task Manager JavaScript

// Team members data
const teamMembers = [
    { name: 'Arshad Pasha', email: 'arshadpashaintern@gmail.com', role: 'Leader' },
    { name: 'Depuru Joshika Reddy', email: 'joshikareddy07@gmail.com', role: 'Member' },
    { name: 'Guru Karthik Reddy Marthala', email: 'marthalagurukarthikreddy11@gmail.com', role: 'Member' },
    { name: 'Kavya Ghantasala', email: 'vtu24677@veltech.edu.in', role: 'Member' },
    { name: 'Kushagra Bhargava', email: 'kushagra.23bai10987@vitbhopal.ac.in', role: 'Member' },
    { name: 'Mandha Shirisha', email: 'mandhashirisha90@gmail.com', role: 'Member' },
    { name: 'Sri Saranya Chandrapati', email: 'srnya0986@gmail.com', role: 'Member' },
    { name: 'Vinuthna Jangam', email: 'vinuthnaaj@gmail.com', role: 'Member' }
];

// Sample initial tasks for Week 1
const defaultTasks = [
    {
        id: 1,
        title: 'Set up Python Virtual Environment',
        description: 'Install Python 3.8+, create virtual environment, install FastAPI, Streamlit, LangChain, sentence-transformers, and pandas.',
        assignee: 'Arshad Pasha',
        priority: 'high',
        milestone: 'Milestone 1',
        dueDate: '2026-01-10',
        status: 'in-progress',
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        title: 'Clone GitHub Repository',
        description: 'Clone the Fintech-data repository from https://github.com/springboardmentor441p-coderr/Fintech-data',
        assignee: 'Depuru Joshika Reddy',
        priority: 'high',
        milestone: 'Milestone 1',
        dueDate: '2026-01-07',
        status: 'pending',
        createdAt: new Date().toISOString()
    },
    {
        id: 3,
        title: 'Explore Markdown Documents',
        description: 'Explore all markdown files in the repository and understand their content structure.',
        assignee: 'Guru Karthik Reddy Marthala',
        priority: 'medium',
        milestone: 'Milestone 1',
        dueDate: '2026-01-08',
        status: 'pending',
        createdAt: new Date().toISOString()
    },
    {
        id: 4,
        title: 'Explore CSV Documents',
        description: 'Explore all CSV files and understand the data format and columns.',
        assignee: 'Kavya Ghantasala',
        priority: 'medium',
        milestone: 'Milestone 1',
        dueDate: '2026-01-08',
        status: 'pending',
        createdAt: new Date().toISOString()
    },
    {
        id: 5,
        title: 'Create Role-to-Document Mapping',
        description: 'Create documentation mapping: Finance → financial reports; Marketing → marketing reports; HR → employee data; Engineering → tech docs; C-Level → all docs.',
        assignee: 'Kushagra Bhargava',
        priority: 'high',
        milestone: 'Milestone 1',
        dueDate: '2026-01-10',
        status: 'pending',
        createdAt: new Date().toISOString()
    },
    {
        id: 6,
        title: 'Create Project Folder Structure',
        description: 'Initialize project folder structure on local system with proper organization.',
        assignee: 'Mandha Shirisha',
        priority: 'medium',
        milestone: 'Milestone 1',
        dueDate: '2026-01-07',
        status: 'pending',
        createdAt: new Date().toISOString()
    },
    {
        id: 7,
        title: 'Create requirements.txt',
        description: 'Document all Python dependencies in requirements.txt file for team members.',
        assignee: 'Sri Saranya Chandrapati',
        priority: 'medium',
        milestone: 'Milestone 1',
        dueDate: '2026-01-08',
        status: 'pending',
        createdAt: new Date().toISOString()
    },
    {
        id: 8,
        title: 'Write Data Exploration Report',
        description: 'Write a summary report documenting the content and structure of all documents explored.',
        assignee: 'Vinuthna Jangam',
        priority: 'low',
        milestone: 'Milestone 1',
        dueDate: '2026-01-12',
        status: 'pending',
        createdAt: new Date().toISOString()
    }
];

// State
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

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
    renderTasks();
    updateStats();
    setupEventListeners();
    setupNavigation();
});

// Navigation setup
function setupNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });
    }
}

// Load tasks from localStorage or use defaults
function loadTasks() {
    const storedTasks = localStorage.getItem('rbac_gp3_tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    } else {
        tasks = [...defaultTasks];
        saveTasks();
    }
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('rbac_gp3_tasks', JSON.stringify(tasks));
}

// Setup event listeners
function setupEventListeners() {
    // Add task button
    addTaskBtn.addEventListener('click', () => openModal());

    // Close modal
    closeModalBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    // Close modal on overlay click
    taskModal.addEventListener('click', (e) => {
        if (e.target === taskModal) closeModal();
    });

    // Form submit
    taskForm.addEventListener('submit', handleFormSubmit);

    // Filter tabs
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentFilter = tab.dataset.filter;
            renderTasks();
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'n' && e.ctrlKey) {
            e.preventDefault();
            openModal();
        }
    });
}

// Open modal
function openModal(task = null) {
    taskModal.classList.add('active');

    if (task) {
        // Edit mode
        editingTaskId = task.id;
        modalTitle.textContent = 'Edit Task';
        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskDescription').value = task.description || '';
        document.getElementById('assignee').value = task.assignee;
        document.getElementById('priority').value = task.priority;
        document.getElementById('milestone').value = task.milestone;
        document.getElementById('dueDate').value = task.dueDate || '';
        document.getElementById('status').value = task.status;
    } else {
        // Add mode
        editingTaskId = null;
        modalTitle.textContent = 'Add New Task';
        taskForm.reset();
    }
}

// Close modal
function closeModal() {
    taskModal.classList.remove('active');
    taskForm.reset();
    editingTaskId = null;
}

// Handle form submit
function handleFormSubmit(e) {
    e.preventDefault();

    const taskData = {
        title: document.getElementById('taskTitle').value,
        description: document.getElementById('taskDescription').value,
        assignee: document.getElementById('assignee').value,
        priority: document.getElementById('priority').value,
        milestone: document.getElementById('milestone').value,
        dueDate: document.getElementById('dueDate').value,
        status: document.getElementById('status').value
    };

    if (editingTaskId) {
        // Update existing task
        const index = tasks.findIndex(t => t.id === editingTaskId);
        if (index !== -1) {
            tasks[index] = { ...tasks[index], ...taskData };
        }
    } else {
        // Add new task
        const newTask = {
            id: Date.now(),
            ...taskData,
            createdAt: new Date().toISOString()
        };
        tasks.unshift(newTask);
    }

    saveTasks();
    renderTasks();
    updateStats();
    closeModal();
}

// Delete task
function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
        updateStats();
    }
}

// Toggle task status
function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        if (task.status === 'completed') {
            task.status = 'pending';
        } else {
            task.status = 'completed';
        }
        saveTasks();
        renderTasks();
        updateStats();
    }
}

// Update task status
function updateStatus(id, newStatus) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.status = newStatus;
        saveTasks();
        renderTasks();
        updateStats();
    }
}

// Edit task
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        openModal(task);
    }
}

// Render tasks
function renderTasks() {
    let filteredTasks = tasks;

    if (currentFilter !== 'all') {
        filteredTasks = tasks.filter(t => t.status === currentFilter);
    }

    if (filteredTasks.length === 0) {
        tasksContainer.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    tasksContainer.innerHTML = filteredTasks.map(task => `
        <div class="task-card ${task.status === 'completed' ? 'completed-task' : ''}" data-id="${task.id}">
            <div class="task-header">
                <div class="task-title-section">
                    <h3 class="task-title">
                        ${getStatusIcon(task.status)} ${task.title}
                    </h3>
                    <span class="task-milestone">${task.milestone}</span>
                </div>
                <div class="task-actions">
                    <button class="task-action-btn complete" onclick="toggleComplete(${task.id})" title="${task.status === 'completed' ? 'Mark as Pending' : 'Mark as Complete'}">
                        ${task.status === 'completed' ? '↩️' : '✓'}
                    </button>
                    <button class="task-action-btn edit" onclick="editTask(${task.id})" title="Edit Task">✏️</button>
                    <button class="task-action-btn delete" onclick="deleteTask(${task.id})" title="Delete Task">🗑️</button>
                </div>
            </div>
            ${task.description ? `<p class="task-description">${task.description}</p>` : ''}
            <div class="task-meta">
                <div class="task-meta-item">
                    <span>👤</span>
                    <strong>${task.assignee}</strong>
                </div>
                ${task.dueDate ? `
                    <div class="task-meta-item">
                        <span>📅</span>
                        <strong>${formatDate(task.dueDate)}</strong>
                    </div>
                ` : ''}
                <span class="priority-badge ${task.priority}">${task.priority}</span>
                <span class="status-badge-task ${task.status}">${formatStatus(task.status)}</span>
            </div>
        </div>
    `).join('');
}

// Get status icon
function getStatusIcon(status) {
    switch (status) {
        case 'completed': return '✅';
        case 'in-progress': return '🔄';
        default: return '⏳';
    }
}

// Format status
function formatStatus(status) {
    return status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
}

// Format date
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Update stats
function updateStats() {
    const total = tasks.length;
    const pending = tasks.filter(t => t.status === 'pending').length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const completed = tasks.filter(t => t.status === 'completed').length;

    document.getElementById('totalTasks').textContent = total;
    document.getElementById('pendingTasks').textContent = pending;
    document.getElementById('inProgressTasks').textContent = inProgress;
    document.getElementById('completedTasks').textContent = completed;
}

// Export functions to window for HTML onclick handlers
window.deleteTask = deleteTask;
window.editTask = editTask;
window.toggleComplete = toggleComplete;

console.log('RBAC Group 3 - Task Manager Loaded Successfully! 📋');
