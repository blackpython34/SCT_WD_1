// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    offset: 150,
    once: true
});

// Navbar color change on scroll
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
let currentSection = '';

window.addEventListener('scroll', () => {
    // Navbar background change
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Dynamic background color change based on section
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 300) {
            current = section.getAttribute('id');
        }
    });

    if (current !== currentSection) {
        currentSection = current;
        updateBackgroundColor(current);
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Update background color based on section
function updateBackgroundColor(sectionId) {
    const body = document.body;
    
    switch(sectionId) {
        case 'home':
            body.style.backgroundColor = '#f8f9fa';
            document.documentElement.style.setProperty('--primary-color', '#2c3e50');
            break;
        case 'menu':
            body.style.backgroundColor = '#e9ecef';
            document.documentElement.style.setProperty('--primary-color', '#34495e');
            break;
        case 'about':
            body.style.backgroundColor = '#f1f8ff';
            document.documentElement.style.setProperty('--primary-color', '#2980b9');
            break;
        case 'contact':
            body.style.backgroundColor = '#fff5f5';
            document.documentElement.style.setProperty('--primary-color', '#c0392b');
            break;
        default:
            body.style.backgroundColor = '#ffffff';
            document.documentElement.style.setProperty('--primary-color', '#2c3e50');
    }
}

// Add hover effect to menu items
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
    });
});