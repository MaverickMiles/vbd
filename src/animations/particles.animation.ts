export function createParticles(containerSelector: string, particleCount = 100) {
    const particlesContainer = document.querySelector(containerSelector);

    if(!particlesContainer) {
        return;
    }

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random starting position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;

        particlesContainer.appendChild(particle);

        // Animate each particle
        const duration = Math.random() * 2 + 2;
        const delay = Math.random() * 3;

        particle.animate([
            { opacity: 0, transform: 'translateY(0) scale(0)' },
            { opacity: 0.8, transform: 'translateY(-100px) scale(1)', offset: 0.6 },
            { opacity: 0, transform: 'translateY(-200px) scale(0)' }
        ], {
            duration: duration * 1000,
            delay: delay * 1000,
            iterations: Infinity,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });
    }
}
