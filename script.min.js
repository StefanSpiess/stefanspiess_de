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
    console.log('initTheme() called - starting theme initialization');
    
    // Check for saved theme preference first
    const savedTheme = localStorage.getItem(THEME_KEY);
    console.log('Saved theme from localStorage:', savedTheme);
    
    let theme;
    
    if (savedTheme) {
        // Use saved theme preference
        theme = savedTheme;
        console.log('Using saved theme:', theme);
    } else {
        // No saved preference, check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        theme = prefersDark ? 'dark' : 'light';
        console.log('No saved preference, using system preference:', theme);
    }
    
    // Always apply and save the determined theme
    applyTheme(theme);
    updateToggleButton(theme);
    
    console.log('Theme initialization completed with theme:', theme);
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
        console.log('Toggle button updated to:', toggleButton.textContent, 'for theme:', theme);
    } else {
        console.error('Toggle button not found when trying to update!');
    }
}

// Toggle between light and dark mode
function toggleTheme() {
    try {
        const currentTheme = document.documentElement.hasAttribute('data-theme') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        console.log('Toggling theme from', currentTheme, 'to', newTheme);
        
        applyTheme(newTheme);
        updateToggleButton(newTheme);
        
        console.log('Theme toggle completed successfully');
    } catch (error) {
        console.error('Error during theme toggle:', error);
    }
}

// Initialize theme toggle functionality
function initThemeToggle() {
    console.log('initThemeToggle() called');
    
    const toggleButton = document.getElementById('themeToggle');
    if (toggleButton) {
        // Remove any existing event listeners to prevent duplicates
        toggleButton.removeEventListener('click', toggleTheme);
        
        // Add click event listener
        toggleButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Theme toggle button clicked');
            toggleTheme();
        });
        
        // Keyboard support
        toggleButton.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                console.log('Theme toggle button activated via keyboard');
                toggleTheme();
            }
        });
        
        // CRITICAL: Sync button state immediately on page load
        syncButtonState();
        
        console.log('Dark Mode toggle initialized successfully');
    } else {
        console.error('Dark Mode toggle button not found!');
    }
}

// Sync button state with current theme (critical for navigation between pages)
function syncButtonState() {
    console.log('syncButtonState() called');
    
    // Check current theme state from DOM and localStorage
    const currentThemeFromDOM = document.documentElement.hasAttribute('data-theme') ? 'dark' : 'light';
    const currentThemeFromStorage = localStorage.getItem(THEME_KEY) || 'light';
    
    console.log('Theme from DOM:', currentThemeFromDOM);
    console.log('Theme from storage:', currentThemeFromStorage);
    
    // Use storage as source of truth (since inline script sets DOM based on storage)
    const currentTheme = currentThemeFromStorage;
    
    // Ensure DOM and button are in sync
    applyTheme(currentTheme);
    updateToggleButton(currentTheme);
    
    console.log('Button state synced to theme:', currentTheme);
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
    try {
        console.log('Initializing Stefan Spieß website functions...');
        setCurrentYear();
        initSmoothScrolling();
        initHeaderScrollEffect();
        setActiveNavigation();
        initTheme();
        initThemeToggle();
        initSystemThemeListener();
        console.log('All functions initialized successfully');
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});

// Fallback initialization in case DOMContentLoaded already fired
if (document.readyState === 'loading') {
    // DOM still loading, event listener will handle it
    console.log('DOM still loading, DOMContentLoaded listener will handle initialization');
} else {
    // DOM already loaded, initialize immediately
    console.log('DOM already loaded, running immediate initialization');
    setTimeout(function() {
        try {
            console.log('Fallback initialization triggered');
            
            // Critical: First sync button state, then initialize theme
            syncButtonState();
            initThemeToggle();
            
        } catch (error) {
            console.error('Error during fallback initialization:', error);
        }
    }, 50); // Reduced timeout for faster response
}
