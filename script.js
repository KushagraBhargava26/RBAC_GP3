// RBAC Group 3 - Team Planning Dashboard JavaScript

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
