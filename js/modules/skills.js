/**
 * Skills Module
 * Animate skill progress bars on scroll
 */

export const animateSkills = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach((bar) => {
        const progress = bar.getAttribute('data-progress');
        const rect = bar.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight - 100) {
            bar.style.width = progress + '%';
        }
    });
};

export const initSkills = () => {
    window.addEventListener('scroll', animateSkills);
    window.addEventListener('load', animateSkills);
};
