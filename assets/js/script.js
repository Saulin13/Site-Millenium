// Mobile menu functionality
const principal = document.querySelector(".principal");
const body = document.body;
const closeSidebarBtn = document.querySelector('.close-sidebar');

if (principal) {
    principal.addEventListener("click", () => {
        body.classList.toggle("show-menu");
    });
}

if (closeSidebarBtn) {
    closeSidebarBtn.addEventListener("click", () => {
        body.classList.remove("show-menu");
    });
}

// Close menu when clicking outside
document.addEventListener("click", (e) => {
    if (!e.target.closest(".principal") && !e.target.closest(".sidebar")) {
        body.classList.remove("show-menu");
    }
});

// Smooth scrolling for navigation links
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

// Active navigation link highlighting
const navLinks = document.querySelectorAll('.menu-link');
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
    const scrollPos = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', updateActiveNavLink);

// Initialize active state
updateActiveNavLink();

// Responsive navigation
function handleResize() {
    const isMobile = window.innerWidth <= 768;
    const stickyNav = document.querySelector('.sticky');
    
    if (isMobile) {
        // Hide sticky nav on mobile, show sidebar menu
        if (stickyNav) {
            stickyNav.style.display = 'none';
        }
    } else {
        // Show sticky nav on desktop, hide sidebar menu
        if (stickyNav) {
            stickyNav.style.display = 'block';
        }
        body.classList.remove("show-menu");
    }
}

// Add resize event listener
window.addEventListener('resize', handleResize);

// Initialize on page load
handleResize();

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.conhecimento, .card').forEach(el => {
    observer.observe(el);
});