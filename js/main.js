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

// Throttle function to limit the number of times the scroll handler fires
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Smooth scroll handler
window.addEventListener('scroll', throttle(() => {
    // Navbar background change
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update background color based on scroll position
    updateBackgroundColor();

    // Update current section for navigation
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
    }
}, 16)); // Throttle to approximately 60fps

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
// Array of palettes including background color and an optional background image
const colorPalettes = [
    { bg: '#f0f7ff', primary: '#3498db', image: 'https://images.unsplash.com/photo-1541542684-5a7aa7d6ab4d?auto=format&fit=crop&w=1600&q=80' }, // Blue theme
    { bg: '#fff0f0', primary: '#e74c3c', image: 'https://images.unsplash.com/photo-1547592180-2a7f8f8d1b21?auto=format&fit=crop&w=1600&q=80' }, // Red theme
    { bg: '#f0fff0', primary: '#2ecc71', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80' }, // Green theme
    { bg: '#fff7f0', primary: '#e67e22', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80' }, // Orange theme (fallback image)
    { bg: '#f5f0ff', primary: '#9b59b6', image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=1600&q=80' }  // Purple theme
];

function updateBackgroundColor(sectionId) {
    const body = document.body;
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    
    // Calculate progress (0 to 1) based on scroll position
    const scrollProgress = Math.min(scrollPosition / documentHeight, 1);
    
    // Calculate which color palette to use based on scroll progress
    const paletteIndex = Math.floor(scrollProgress * colorPalettes.length);
    const nextPaletteIndex = (paletteIndex + 1) % colorPalettes.length;
    
    // Calculate progress between current and next color
    const progressBetweenColors = (scrollProgress * colorPalettes.length) % 1;
    
    // Interpolate between current and next color
    const currentPalette = colorPalettes[paletteIndex];
    const nextPalette = colorPalettes[nextPaletteIndex];
    
    // Function to interpolate between two colors
    const interpolateColor = (color1, color2, progress) => {
        const r1 = parseInt(color1.slice(1, 3), 16);
        const g1 = parseInt(color1.slice(3, 5), 16);
        const b1 = parseInt(color1.slice(5, 7), 16);
        
        const r2 = parseInt(color2.slice(1, 3), 16);
        const g2 = parseInt(color2.slice(3, 5), 16);
        const b2 = parseInt(color2.slice(5, 7), 16);
        
        const r = Math.round(r1 + (r2 - r1) * progress);
        const g = Math.round(g1 + (g2 - g1) * progress);
        const b = Math.round(b1 + (b2 - b1) * progress);
        
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    };
    
    // Apply interpolated colors
    const bgColor = interpolateColor(currentPalette.bg, nextPalette.bg, progressBetweenColors);
    const primaryColor = interpolateColor(currentPalette.primary, nextPalette.primary, progressBetweenColors);
    
    body.style.backgroundColor = bgColor;
    document.documentElement.style.setProperty('--primary-color', primaryColor);

    // Also update background image with a smooth crossfade between two overlay layers
    try {
        const layer1 = document.getElementById('bg-layer-1');
        const layer2 = document.getElementById('bg-layer-2');
        if (layer1 && layer2) {
            // Determine which palette to show (prefer currentPalette image)
            const targetImage = progressBetweenColors < 0.5 ? currentPalette.image : nextPalette.image;
            // Pick the currently invisible layer to update
            const activeLayer = layer1.classList.contains('active') ? layer1 : layer2;
            const inactiveLayer = activeLayer === layer1 ? layer2 : layer1;

            // If the inactive layer already shows the desired image, just crossfade
            const currentBg = inactiveLayer.style.backgroundImage || '';
            const desiredBg = targetImage ? `url("${targetImage}")` : '';

            if (currentBg !== desiredBg) {
                inactiveLayer.style.backgroundImage = desiredBg;
            }

            // crossfade: make inactive layer active
            inactiveLayer.classList.add('active');
            activeLayer.classList.remove('active');
        }
    } catch (e) {
        // ignore in case elements are not present
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