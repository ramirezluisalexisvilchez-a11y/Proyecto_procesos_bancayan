// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '60px';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = '#fff';
        navMenu.style.gap = '0';
        navMenu.style.zIndex = '99';
        navMenu.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Search functionality
const searchButton = document.querySelector('.search-box button');
if (searchButton) {
    searchButton.addEventListener('click', function() {
        const input = document.querySelector('.search-box input');
        const trackingNumber = input.value;
        
        if (trackingNumber.trim()) {
            alert(`Buscando paquete con guía: ${trackingNumber}`);
            input.value = '';
        } else {
            alert('Por favor ingresa un número de guía');
        }
    });

    // Allow Enter key to search
    document.querySelector('.search-box input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });
}

// CTA Button functionality
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', function() {
        alert('¡Bienvenido! Comienza a enviar tus paquetes ahora.');
    });
}

// Pricing buttons
const pricingButtons = document.querySelectorAll('.pricing-button');
pricingButtons.forEach(button => {
    button.addEventListener('click', function() {
        const cardTitle = this.closest('.pricing-card').querySelector('h3').textContent;
        alert(`Has seleccionado: ${cardTitle}`);
    });
});

// Secondary buttons
const secondaryButtons = document.querySelectorAll('.secondary-button');
secondaryButtons.forEach(button => {
    button.addEventListener('click', function() {
        alert('Redirigiéndote a nuestras agencias...');
    });
});

// App download buttons
const appButtons = document.querySelectorAll('.app-button');
appButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
        const appName = index === 0 ? 'Google Play' : 'App Store';
        alert(`Descargando desde ${appName}...`);
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add animation to elements
const sections = document.querySelectorAll('.service-card, .story-card, .pricing-card');
sections.forEach(section => {
    section.style.opacity = '0';
    observer.observe(section);
});

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Responsive navbar adjustment
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.style.display = 'flex';
        navMenu.style.position = 'relative';
        navMenu.style.top = 'auto';
        navMenu.style.left = 'auto';
        navMenu.style.width = 'auto';
        navMenu.style.background = 'transparent';
        navMenu.style.zIndex = 'auto';
        navMenu.style.boxShadow = 'none';
    }
});

console.log('Envíos Rapidín - Script cargado correctamente');
