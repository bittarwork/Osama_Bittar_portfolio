/**
 * Site Configuration
 * Central config for profile, contact, EmailJS
 */

export const config = {
    // Profile info
    profile: {
        name: 'Osama Bittar',
        email: 'bittar.work@gmail.com',
        phone: '+963930705788',
        website: 'https://bittarov.com',
        cvPath: './assets/CV_Osama_Bittar.pdf',
    },

    // EmailJS (contact form) - public key set in index.html
    emailjs: {
        serviceId: 'service_demtupw',
        templateId: 'template_ewrpd6m',
    },

    // Typing animation titles
    typingTitles: [
        'Full Stack Developer',
        'MERN Stack Specialist',
        'Backend Architect',
        'ERP Systems Expert',
        'Web Development Instructor',
    ],

    // Particles.js primary color
    particlesColor: '#6366f1',
};
