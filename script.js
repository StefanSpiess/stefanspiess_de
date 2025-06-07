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

// Initialisierung beim Laden der Seite
document.addEventListener('DOMContentLoaded', function() {
    setCurrentYear();
    initSmoothScrolling();
    initHeaderScrollEffect();
    setActiveNavigation();
});
