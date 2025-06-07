// Stefan Spieß Website - Main JavaScript Functions

// Aktuelles Jahr automatisch setzen
function setCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Funktion zum Scrollen zur Kontakt-Section
function scrollToContact() {
    const contactSection = document.getElementById('kontakt');
    if (contactSection) {
        contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Smooth scrolling für bessere User Experience
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Header-Transparenz beim Scrollen
function initHeaderScrollEffect() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(0, 0, 0, 0.95)';
            } else {
                header.style.background = '#000000';
            }
        }
    });
}

// Navigation Active State setzen
function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'index.html' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Dark Mode Functions
const THEME_KEY = 'stefan-spiess-theme';

// Theme detection and initialization
function initTheme() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Use saved theme, or user's system preference, or default to light
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    // Theme is already applied by inline script in head, just update button
    if (!savedTheme && prefersDark) {
        // Only apply theme if no saved preference but system prefers dark
        applyTheme(theme);
    }
    updateToggleButton(theme);
}

// Apply theme to document
function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    
    // Save theme preference
    localStorage.setItem(THEME_KEY, theme);
}

// Update toggle button icon and aria-label
function updateToggleButton(theme) {
    const toggleButton = document.getElementById('themeToggle');
    if (toggleButton) {
        if (theme === 'dark') {
            toggleButton.textContent = '☀️';
            toggleButton.setAttribute('aria-label', 'Zur hellen Ansicht wechseln (Light Mode aktivieren)');
            toggleButton.setAttribute('title', 'Zur hellen Ansicht wechseln - Bessere Lesbarkeit bei Tag');
        } else {
            toggleButton.textContent = '🌙';
            toggleButton.setAttribute('aria-label', 'Zur dunklen Ansicht wechseln (Dark Mode aktivieren)');
            toggleButton.setAttribute('title', 'Zur dunklen Ansicht wechseln - Schont die Augen bei Dunkelheit');
        }
    }
}

// Toggle between light and dark mode
function toggleTheme() {
    const currentTheme = document.documentElement.hasAttribute('data-theme') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    applyTheme(newTheme);
    updateToggleButton(newTheme);
}

// Initialize theme toggle functionality
function initThemeToggle() {
    const toggleButton = document.getElementById('themeToggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleTheme);
        
        // Keyboard support
        toggleButton.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
            }
        });
    }
}

// Listen for system theme changes
function initSystemThemeListener() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', function(e) {
        // Only update if user hasn't manually set a preference
        if (!localStorage.getItem(THEME_KEY)) {
            const theme = e.matches ? 'dark' : 'light';
            applyTheme(theme);
            updateToggleButton(theme);
        }
    });
}

// Initialisierung beim Laden der Seite
document.addEventListener('DOMContentLoaded', function() {
    setCurrentYear();
    initSmoothScrolling();
    initHeaderScrollEffect();
    setActiveNavigation();
    initTheme();
    initThemeToggle();
    initSystemThemeListener();
});
