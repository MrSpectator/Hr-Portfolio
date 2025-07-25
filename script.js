// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 25, 47, 0.95)'; // Slightly transparent navy blue
    } else {
        navbar.style.background = 'var(--nav-footer-color)'; // Solid navy blue
    }
});

// Animate skill bars on scroll
const skillLevels = document.querySelectorAll('.skill-level');
const animateSkills = () => {
    skillLevels.forEach(skill => {
        const skillTop = skill.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;
        
        if (skillTop < screenHeight * 0.8) {
            skill.style.width = skill.parentElement.getAttribute('data-level') || '0%';
        }
    });
};

// Set initial width to 0
skillLevels.forEach(skill => {
    const width = skill.style.width;
    skill.style.width = '0';
    skill.parentElement.setAttribute('data-level', width);
});

window.addEventListener('scroll', animateSkills);

// Remove the form submission handling code and add flower button animation
const flowerButton = document.getElementById('flower-button');
const flowerContainer = document.getElementById('flower-container');
const flowerEmojis = ['🌸', '🌺', '🌹', '🌷', '🌼', '🌻', '💐', '🏵️'];

function createFlower(e) {
    const buttonRect = flowerButton.getBoundingClientRect();
    const startX = buttonRect.left + buttonRect.width / 2;
    const startY = buttonRect.top + buttonRect.height / 2;
    
    // Create multiple flowers
    for (let i = 0; i < 12; i++) {
        const flower = document.createElement('div');
        flower.className = 'flower';
        flower.textContent = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
        
        // Calculate random end positions
        const angle = (i / 12) * 2 * Math.PI;
        const distance = 100 + Math.random() * 100;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        flower.style.setProperty('--tx', `${tx}px`);
        flower.style.setProperty('--ty', `${ty}px`);
        
        // Set initial position
        flower.style.left = `${startX}px`;
        flower.style.top = `${startY}px`;
        
        flowerContainer.appendChild(flower);
        
        // Remove the flower element after animation
        flower.addEventListener('animationend', () => {
            flower.remove();
        });
    }
}

flowerButton.addEventListener('click', createFlower);

// Add hover effect to make the button more interactive
flowerButton.addEventListener('mouseover', () => {
    const icon = flowerButton.querySelector('.flower-icon');
    icon.textContent = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// Initialize animations on load
window.addEventListener('load', () => {
    animateSkills();
}); 

// Mobile Menu Toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-links a');

navToggle.addEventListener('click', () => {
    nav.classList.toggle('nav-open');
    document.body.classList.toggle('no-scroll');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('nav-open');
        document.body.classList.remove('no-scroll');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && nav.classList.contains('nav-open')) {
        nav.classList.remove('nav-open');
        document.body.classList.remove('no-scroll');
    }
}); 