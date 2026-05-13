document.addEventListener('DOMContentLoaded', () => {
    const ctaButton = document.querySelector('.cta-button');
    const cards = document.querySelectorAll('.card');

    // Kleiner Überraschungseffekt beim Button-Klick
    ctaButton.addEventListener('click', () => {
        ctaButton.textContent = 'Juhu! ✨';
        ctaButton.style.backgroundColor = '#a18cd1';
        
        // Simuliere einen kleinen "Sprung" aller Karten
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transform = 'translateY(-20px) scale(1.05)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 300);
            }, index * 100);
        });

        console.log("Willkommen auf der Abenteuer-Wiese! Schön, dass du da bist! 🌈");
    });

    // Sanftes Einblenden der Karten beim Scrollen (einfache Version)
    const observerOptions = {
        threshold: 0.1
    };

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