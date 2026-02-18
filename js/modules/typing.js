/**
 * Typing Animation Module
 * Hero section title rotation effect
 */

import { config } from '../config.js';

export const initTyping = () => {
    const typingText = document.getElementById('typingText');
    if (!typingText) return;

    const titles = config.typingTitles || ['Full Stack Developer'];
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
