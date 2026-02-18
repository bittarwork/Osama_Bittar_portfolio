/**
 * Portfolio - Main Entry Point
 * Works with file:// and local server (no ES modules required)
 */

// ===== Config (inline for compatibility) =====
const CONFIG = {
    profile: { email: 'bittar.work@gmail.com' },
    emailjs: { serviceId: 'service_demtupw', templateId: 'template_ewrpd6m' },
    typingTitles: ['Full Stack Developer', 'MERN Stack Specialist', 'Backend Architect', 'ERP Systems Expert', 'Web Development Instructor'],
    particlesColor: '#6366f1',
};

// ===== Preloader =====
const initPreloader = () => {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => { preloader.style.display = 'none'; }, 500);
        }, 1000);
    });
};

// ===== Theme Toggle =====
const initTheme = () => {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    const updateThemeIcon = () => {
        const icon = themeToggle.querySelector('i');
        const theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    };
    updateThemeIcon();

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const newTheme = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon();
    });
};

// ===== Navigation =====
const activateNavLink = () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    sections.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const link = document.querySelector('.nav-link[href*="' + sectionId + '"]');
        if (!link) return;
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
};

const initNavigation = () => {
    const body = document.body;
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollTop = document.getElementById('scrollTop');

    if (!navbar || !navMenu || !hamburger) return;

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

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 100) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
        if (scrollTop) {
            if (currentScroll > 300) scrollTop.classList.add('visible');
            else scrollTop.classList.remove('visible');
        }
    });

    if (scrollTop) {
        scrollTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
};

// ===== Typing Animation =====
const initTyping = () => {
    const typingText = document.getElementById('typingText');
    if (!typingText) return;

    const titles = CONFIG.typingTitles || ['Full Stack Developer'];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;

    const typeTitle = () => {
        const currentTitle = titles[titleIndex];
        if (isDeleting) {
            typingText.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 75;
        } else {
            typingText.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }
        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 500;
        }
        setTimeout(typeTitle, typingSpeed);
    };
    setTimeout(typeTitle, 1000);
};

// ===== Particles.js =====
const initParticles = () => {
    if (typeof particlesJS === 'undefined') return;
    const color = CONFIG.particlesColor || '#6366f1';
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: color },
            shape: { type: 'circle', stroke: { width: 0, color: '#000000' } },
            opacity: { value: 0.5, random: false, anim: { enable: false } },
            size: { value: 3, random: true, anim: { enable: false } },
            line_linked: { enable: true, distance: 150, color: color, opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false },
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
            modes: { grab: { distance: 140, line_linked: { opacity: 1 } }, push: { particles_nb: 4 } },
        },
        retina_detect: true,
    });
};

// ===== Skills Animation =====
const animateSkills = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach((bar) => {
        const progress = bar.getAttribute('data-progress');
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            bar.style.width = progress + '%';
        }
    });
};

const initSkills = () => {
    window.addEventListener('scroll', animateSkills);
    window.addEventListener('load', animateSkills);
};

// ===== Notification =====
const showNotification = (message, type) => {
    type = type || 'info';
    const notification = document.createElement('div');
    notification.className = 'notification notification-' + type;
    notification.innerHTML = '<i class="fas fa-' + (type === 'success' ? 'check-circle' : 'exclamation-circle') + '"></i><span>' + message + '</span>';
    notification.style.cssText = 'position:fixed;top:100px;right:20px;background:' + (type === 'success' ? '#10b981' : '#ef4444') + ';color:white;padding:1rem 1.5rem;border-radius:0.75rem;box-shadow:0 10px 25px rgba(0,0,0,0.2);display:flex;align-items:center;gap:1rem;z-index:10000;animation:notificationSlideIn 0.3s ease-out;';
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'notificationSlideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
};

// Inject notification styles
(function () {
    if (document.getElementById('notification-styles')) return;
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = '@keyframes notificationSlideIn{from{transform:translateX(400px);opacity:0}to{transform:translateX(0);opacity:1}}@keyframes notificationSlideOut{from{transform:translateX(0);opacity:1}to{transform:translateX(400px);opacity:0}}';
    document.head.appendChild(style);
})();

// ===== Contact Form =====
const initContactForm = () => {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn && submitBtn.querySelector('span') ? submitBtn.querySelector('span').textContent : 'Send Message';

        submitBtn.disabled = true;
        if (submitBtn.querySelector('span')) submitBtn.querySelector('span').textContent = 'Sending...';
        if (submitBtn.querySelector('i')) submitBtn.querySelector('i').className = 'fas fa-spinner fa-spin';

        const formData = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            to_email: CONFIG.profile.email,
        };

        try {
            if (typeof emailjs !== 'undefined') {
                await emailjs.send(CONFIG.emailjs.serviceId, CONFIG.emailjs.templateId, formData);
                showNotification("Message sent successfully! I'll get back to you soon.", 'success');
                contactForm.reset();
            } else {
                const mailtoLink = 'mailto:' + CONFIG.profile.email + '?subject=' + encodeURIComponent(formData.subject) + '&body=' + encodeURIComponent('From: ' + formData.from_name + ' (' + formData.from_email + ')\n\n' + formData.message);
                window.location.href = mailtoLink;
                showNotification('Opening your email client...', 'success');
            }
        } catch (error) {
            console.error('Email send error:', error);
            showNotification('Failed to send via form. Opening email client...', 'error');
            const mailtoLink = 'mailto:' + CONFIG.profile.email + '?subject=' + encodeURIComponent(formData.subject) + '&body=' + encodeURIComponent('From: ' + formData.from_name + ' (' + formData.from_email + ')\n\n' + formData.message);
            setTimeout(function () { window.location.href = mailtoLink; }, 2000);
        } finally {
            submitBtn.disabled = false;
            if (submitBtn.querySelector('span')) submitBtn.querySelector('span').textContent = originalText;
            if (submitBtn.querySelector('i')) submitBtn.querySelector('i').className = 'fas fa-paper-plane';
        }
    });
};

// ===== Smooth Scroll =====
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
};

// ===== Debounce =====
const debounce = function (func, wait) {
    let timeout;
    return function () {
        const args = arguments;
        const later = function () {
            clearTimeout(timeout);
            func.apply(null, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// ===== Initialize =====
initPreloader();
initTheme();
initNavigation();
initTyping();
initParticles();
initSkills();
initContactForm();
initSmoothScroll();

window.addEventListener('scroll', debounce(function () {
    activateNavLink();
    animateSkills();
}, 10));

// AOS
if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 1000, once: true, offset: 100, easing: 'ease-in-out' });
}

// Konami Code
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;
document.addEventListener('keydown', function (e) {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            showNotification('Konami Code Activated! You found the secret!', 'success');
            document.body.style.animation = 'rainbow 2s infinite';
            konamiIndex = 0;
            const rainbowStyle = document.createElement('style');
            rainbowStyle.textContent = '@keyframes rainbow{0%{filter:hue-rotate(0deg)}100%{filter:hue-rotate(360deg)}}';
            document.head.appendChild(rainbowStyle);
            setTimeout(function () { document.body.style.animation = ''; }, 5000);
        }
    } else {
        konamiIndex = 0;
    }
});
