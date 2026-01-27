// RBAC Group 3 - Team Planning Dashboard JavaScript

// MASTER GUIDE LOGIC
function openMasterGuide() {
    const modal = document.getElementById('masterGuideModal');
    const textarea = document.getElementById('guideContent');

    // Generate text if empty
    if (!textarea.value) {
        textarea.value = generateMasterSummary();
    }

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeMasterGuide() {
    document.getElementById('masterGuideModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function copyMasterGuide() {
    const textarea = document.getElementById('guideContent');
    const btn = document.getElementById('copyGuideBtn');

    textarea.select();
    document.execCommand('copy');

    // Visual Feedback
    const originalText = btn.innerHTML;
    btn.innerHTML = '✅ Copied!';
    btn.style.background = '#22c55e';

    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '#2563eb';
    }, 2000);
}

function generateMasterSummary() {
    // Data Sources (Assuming tasks.js is loaded and these variables exist)
    const allWeeks = [
        { name: 'Week 1: Environment Setup & Data Exploration', tasks: typeof week1Tasks !== 'undefined' ? week1Tasks : [] },
        { name: 'Week 2: Document Preprocessing & Metadata Tagging', tasks: typeof week2Tasks !== 'undefined' ? week2Tasks : [] },
        { name: 'Week 3: Vector Database & Embedding Generation', tasks: typeof week3Tasks !== 'undefined' ? week3Tasks : [] },
        { name: 'Week 4: Role-Based Search & Query Processing', tasks: typeof week4Tasks !== 'undefined' ? week4Tasks : [] },
        { name: 'Week 5: User Authentication & RBAC Middleware', tasks: typeof week5Tasks !== 'undefined' ? week5Tasks : [] },
        { name: 'Week 6: RAG Pipeline & LLM Integration', tasks: typeof week6Tasks !== 'undefined' ? week6Tasks : [] },
        { name: 'Week 7: Premium Next.js Frontend Development', tasks: typeof week7Tasks !== 'undefined' ? week7Tasks : [] },
        { name: 'Week 8: System Integration, Testing & Deployment', tasks: typeof week8Tasks !== 'undefined' ? week8Tasks : [] }
    ];

    let summary = `RBAC GROUP 3 - MASTER PROJECT GUIDE
========================================
Project: Company Internal Chatbot with Role-Based Access Control (RBAC)
Team Lead: Arshad Pasha
Generated: ${new Date().toLocaleDateString()}

INTRODUCTION
----------------------------------------
This document provides a comprehensive, week-by-week execution plan for the RBAC Chatbot project. It details every task, technical approach, code snippet, and design decision made from inception to deployment.

OBJECTIVE
----------------------------------------
To build a secure, retrieval-augmented generation (RAG) chatbot that serves department-specific information to employees based on their verified roles (Finance, HR, Engineering, etc.), ensuring strict data privacy and access control.

========================================
TIMELINE & EXECUTION LOG
========================================

`;

    allWeeks.forEach(week => {
        summary += `\n----------------------------------------\n${week.name.toUpperCase()}\n----------------------------------------\n`;

        if (week.tasks.length === 0) {
            summary += "(No tasks defined for this week yet.)\n";
        }

        week.tasks.forEach(task => {
            // Clean up HTML tags for plain text
            const simpleDesc = task.description.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
            const complexDesc = task.deepExplanation ? task.deepExplanation.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/\n\s+\n/g, '\n').trim() : 'No deep explanation provided.';

            summary += `\n[TASK ${task.id}] ${task.title.toUpperCase()}`;
            summary += `\nAssignee: ${task.assignee} | Priority: ${task.priority.toUpperCase()}`;
            summary += `\n\nGOAL:\n${simpleDesc}`;
            summary += `\n\nDETAILED PROTOCOL:\n${complexDesc}`;
            summary += `\n\n` + ".".repeat(40) + `\n`;
        });
    });

    summary += `\n\n========================================\nEND OF MASTER GUIDE\nRBAC Group 3 | Infosys Springboard Internship`;

    return summary;
}

// Global scope
window.openMasterGuide = openMasterGuide;
window.closeMasterGuide = closeMasterGuide;
window.copyMasterGuide = copyMasterGuide;

// INITIALIZE
document.addEventListener('DOMContentLoaded', function () {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function () {
            navLinks.classList.remove('active');
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight - 20;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Active navigation link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link:not(.task-link)');

    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinksAll.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');

    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.style.background = 'hsla(225, 25%, 10%, 0.95)';
        } else {
            navbar.style.background = 'hsla(225, 25%, 15%, 0.7)';
        }
    }

    window.addEventListener('scroll', updateNavbar);

    // Milestone card toggle (expand/collapse)
    const milestoneHeaders = document.querySelectorAll('.milestone-header');

    milestoneHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const content = this.nextElementSibling;
            const card = this.closest('.milestone-card');

            // Toggle current card
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                content.style.padding = '0 2rem';
                card.classList.remove('expanded');
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.padding = '2rem';
                card.classList.add('expanded');
            }
        });
    });

    // Add scroll animation for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.overview-card, .member-card, .milestone-card, .stat-card, .tech-card, .architecture-section');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
        observer.observe(el);
    });

    // Initialize milestone contents as collapsed
    document.querySelectorAll('.milestone-content').forEach(content => {
        content.style.maxHeight = null;
        content.style.padding = '0 2rem';
        content.style.overflow = 'hidden';
        content.style.transition = 'max-height 0.3s ease, padding 0.3s ease';
    });

    // Expand first milestone by default
    const firstMilestone = document.querySelector('.milestone-card');
    if (firstMilestone) {
        const firstContent = firstMilestone.querySelector('.milestone-content');
        firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
        firstContent.style.padding = '2rem';
        firstMilestone.classList.add('expanded');
    }

    console.log('RBAC Group 3 - Team Planning Dashboard Loaded Successfully! 🚀');
});
