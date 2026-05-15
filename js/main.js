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

    // Reveal ttt-section on scroll (same animation)
    const tttSection = document.querySelector('.ttt-section');
    if (tttSection) {
        tttSection.style.opacity = '0';
        tttSection.style.transform = 'translateY(20px)';
        tttSection.style.transition = 'all 0.6s ease-out';
        observer.observe(tttSection);
    }

    // 4. Tic-Tac-Toe
    const board = document.getElementById('ttt-board');
    const status = document.getElementById('ttt-status');
    const resetBtn = document.getElementById('ttt-reset');
    const cells = document.querySelectorAll('.ttt-cell');

    if (board && status && resetBtn && cells.length === 9) {
        let currentPlayer = 'X';
        let gameActive = true;
        let gameState = ['', '', '', '', '', '', '', '', ''];

        const winPatterns = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]
        ];

        function checkWin() {
            for (const [a,b,c] of winPatterns) {
                if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                    return { winner: gameState[a], line: [a,b,c] };
                }
            }
            return null;
        }

        function handleCellClick(e) {
            const cell = e.target.closest('.ttt-cell');
            if (!cell) return;
            const idx = parseInt(cell.dataset.index);
            if (isNaN(idx) || !gameActive || gameState[idx]) return;

            gameState[idx] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.classList.add(currentPlayer.toLowerCase());

            const result = checkWin();
            if (result) {
                gameActive = false;
                status.textContent = `Spieler ${result.winner} gewinnt! 🎉`;
                result.line.forEach(i => cells[i].classList.add('win'));
                return;
            }

            if (gameState.every(c => c)) {
                gameActive = false;
                status.textContent = 'Unentschieden! 🤝';
                return;
            }

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `Spieler ${currentPlayer} ist dran`;
        }

        function resetGame() {
            currentPlayer = 'X';
            gameActive = true;
            gameState = ['', '', '', '', '', '', '', '', ''];
            cells.forEach(cell => {
                cell.textContent = '';
                cell.classList.remove('x', 'o', 'win');
            });
            status.textContent = 'Spieler X ist dran';
        }

        cells.forEach(cell => cell.addEventListener('click', handleCellClick));
        resetBtn.addEventListener('click', resetGame);
    }
});