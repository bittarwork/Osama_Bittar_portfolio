/**
 * Navigation Module
 * Mobile menu, scroll effects, active link highlighting
 */

export const initNavigation = () => {
    const body = document.body;
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollTop = document.getElementById('scrollTop');
    const sections = document.querySelectorAll('section[id]');

    if (!navbar || !navMenu || !hamburger) return;

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = 'auto';
        });
    });

    // Navbar scroll effect & scroll to top
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');

        if (scrollTop) {
            if (currentScroll > 300) scrollTop.classList.add('visible');
            else scrollTop.classList.remove('visible');
        }
    });

    // Scroll to top button
    if (scrollTop) {
        scrollTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    return { sections, activateNavLink };
};

export const activateNavLink = () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        const link = document.querySelector(`.nav-link[href*="${sectionId}"]`);
        if (!link) return;

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
};
