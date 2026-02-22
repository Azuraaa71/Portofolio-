// Dark Mode Toggle
function toggleDarkMode() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Toggle Hamburger Menu
function toggleHamburgerMenu() {
    const hamburger = document.getElementById('hamburgerMenu');
    const navList = document.getElementById('navList');
    
    hamburger.classList.toggle('active');
    navList.classList.toggle('active');
}

// Close menu when link is clicked
function closeHamburgerMenu() {
    const hamburger = document.getElementById('hamburgerMenu');
    const navList = document.getElementById('navList');
    
    hamburger.classList.remove('active');
    navList.classList.remove('active');
}

// Smooth scroll function
function smoothScroll(target, duration = 1000) {
    const targetPosition = target.offsetTop - 80; // 80px untuk navbar
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let start = null;

    window.requestAnimationFrame(function step(timestamp) {
        if (!start) start = timestamp;
        const progress = (timestamp - start) / duration;

        if (progress < 1) {
            window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));
            window.requestAnimationFrame(step);
        } else {
            window.scrollTo(0, targetPosition);
        }
    });
}

function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// Load saved theme
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburgerMenu');
    const navList = document.getElementById('navList');
    
    hamburger.addEventListener('click', toggleHamburgerMenu);
    
    // Close menu when a link is clicked
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            closeHamburgerMenu();
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                smoothScroll(target, 800);
            }
        });
    });

    // Scroll Progress Bar
    const scrollProgressBar = document.getElementById('scrollProgressBar');
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        scrollProgressBar.style.width = scrolled + '%';
    });

    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    // Intersection Observer untuk smooth scroll animasi
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe semua section
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});

function scrollToTop() {
    const startPosition = window.pageYOffset;
    const distance = startPosition;
    let start = null;
    const duration = 800;

    window.requestAnimationFrame(function step(timestamp) {
        if (!start) start = timestamp;
        const progress = (timestamp - start) / duration;

        if (progress < 1) {
            window.scrollTo(0, startPosition - distance * easeInOutQuad(progress));
            window.requestAnimationFrame(step);
        } else {
            window.scrollTo(0, 0);
        }
    });
}
