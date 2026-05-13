document.addEventListener('DOMContentLoaded', () => {
    // 1. Redirects für alte englische Pfade (Hash-Anker)
    const hashRedirects = {
        '#about': '#ueber-uns',
        '#projects': '#projekte',
        '#contact': '#hallo'
    };

    const currentHash = window.location.hash;
    if (hashRedirects[currentHash]) {
        window.location.hash = hashRedirects[currentHash];
    }

    // 2. Button Interaktionen
    const ctaButton = document.querySelector('.cta-button');
    const cards = document.querySelectorAll('.card');

    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            // Scroll zu Kontakt-Sektion
            const target = document.querySelector('#hallo');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }

            ctaButton.textContent = 'Juhu! ✨';
            ctaButton.style.backgroundColor = '#a18cd1';
            
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.transform = 'translateY(-20px) scale(1.05)';
                    setTimeout(() => {
                        card.style.transform = '';
                    }, 300);
                }, index * 100);
            });
        });
    }

    // 3. Scroll-Animationen (Intersection Observer)
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});