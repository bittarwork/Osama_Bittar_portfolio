/**
 * Contact Form Module
 * Handles form submission via EmailJS with fallback
 */

import { config } from '../config.js';
import { showNotification } from './notification.js';

export const initContactForm = () => {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn?.querySelector('span')?.textContent;

        submitBtn.disabled = true;
        if (submitBtn?.querySelector('span')) submitBtn.querySelector('span').textContent = 'Sending...';
        if (submitBtn?.querySelector('i')) submitBtn.querySelector('i').className = 'fas fa-spinner fa-spin';

        const formData = {
            from_name: document.getElementById('name')?.value,
            from_email: document.getElementById('email')?.value,
            subject: document.getElementById('subject')?.value,
            message: document.getElementById('message')?.value,
            to_email: config.profile.email,
        };

        try {
            if (typeof emailjs !== 'undefined') {
                await emailjs.send(
                    config.emailjs.serviceId,
                    config.emailjs.templateId,
                    formData
                );
                showNotification("Message sent successfully! I'll get back to you soon.", 'success');
                contactForm.reset();
            } else {
                const mailtoLink = `mailto:${config.profile.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent('From: ' + formData.from_name + ' (' + formData.from_email + ')\n\n' + formData.message)}`;
                window.location.href = mailtoLink;
                showNotification('Opening your email client...', 'success');
            }
        } catch (error) {
            console.error('Email send error:', error);
            showNotification('Failed to send via form. Opening email client...', 'error');
            const mailtoLink = `mailto:${config.profile.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent('From: ' + formData.from_name + ' (' + formData.from_email + ')\n\n' + formData.message)}`;
            setTimeout(() => (window.location.href = mailtoLink), 2000);
        } finally {
            submitBtn.disabled = false;
            if (submitBtn?.querySelector('span')) submitBtn.querySelector('span').textContent = originalText || 'Send Message';
            if (submitBtn?.querySelector('i')) submitBtn.querySelector('i').className = 'fas fa-paper-plane';
        }
    });
};
