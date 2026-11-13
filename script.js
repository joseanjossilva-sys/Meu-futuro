document.addEventListener("DOMContentLoaded", () => {

    // 1. Animação de Futuro no Fundo (Partículas Douradas Subindo Suavemente)
    const canvas = document.getElementById("future-canvas");
    const ctx = canvas.getContext("2d");

    let width, height;
    let particles = [];

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class LightOrb {
        constructor() {
            this.reset();
            this.y = Math.random() * height;
        }

        reset() {
            this.x = Math.random() * width;
            this.y = height + 20;
            this.radius = Math.random() * 6 + 2;
            this.speedY = Math.random() * 0.6 + 0.2;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.alpha = Math.random() * 0.45 + 0.15;
        }

        update() {
            this.y -= this.speedY;
            this.x += this.speedX;
            if (this.y < -20) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(245, 158, 11, ${this.alpha})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < 45; i++) {
        particles.push(new LightOrb());
    }

    function animateFutureParticles() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateFutureParticles);
    }

    animateFutureParticles();

    // 2. Animação de Revelação das Seções e Preenchimento da Linha do Tempo
    const reveals = document.querySelectorAll(".reveal");
    const timelineContainer = document.querySelector(".timeline-container");
    const timelineProgress = document.getElementById("timeline-progress");

    function handleScroll() {
        const windowHeight = window.innerHeight;

        // Revelar cards suavemente
        reveals.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 90) {
                el.classList.add("visible");
            }
        });

        // Atualizar linha dourada do tempo conforme a rolagem
        const rect = timelineContainer.getBoundingClientRect();
        const totalHeight = timelineContainer.offsetHeight - 120;
        const scrolled = Math.min(Math.max(windowHeight / 2 - rect.top, 0), totalHeight);
        timelineProgress.style.height = `${scrolled}px`;
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Executa ao carregar

    // 3. Frases Motivacionais para o Futuro do José
    const quotes = [
        '"Cada dia de estudo hoje é um passo tranquilo em direção à vida que você está construindo."',
        '"A medicina começa com o desejo sincero de cuidar — e você já carrega esse propósito."',
        '"Daqui a 10 anos, você vai olhar para trás com orgulho da sua dedicação e da família que construiu."',
        '"O equilíbrio entre trabalho, família e paz financeira é o verdadeiro sucesso."'
    ];

    const btnNewQuote = document.getElementById("btn-new-quote");
    const quoteText = document.getElementById("inspirational-quote");
    let quoteIndex = 0;

    btnNewQuote.addEventListener("click", () => {
        quoteText.style.opacity = 0;
        setTimeout(() => {
            quoteIndex = (quoteIndex + 1) % quotes.length;
            quoteText.textContent = quotes[quoteIndex];
            quoteText.style.opacity = 1;
        }, 300);
    });
});