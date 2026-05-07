// 🌟 SISTEMA DE ESTRELAS ESPACIAIS COMPLETO
document.addEventListener('DOMContentLoaded', function() {
    
    // CAMADA 1: Estrelas de fundo (fixas)
    const starsBg = document.createElement('div');
    starsBg.className = 'stars-bg';
    document.body.appendChild(starsBg);
    
    // CAMADA 2: Estrelas que seguem mouse
    const starsFg = document.createElement('div');
    starsFg.className = 'stars-fg';
    document.body.appendChild(starsFg);
    
    // GERA 80 ESTRELAS DE FUNDO
    for (let i = 0; i < 80; i++) {
        const star = document.createElement('div');
        star.className = 'star-bg';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 2.5 + 0.8 + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 4 + 's';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        starsBg.appendChild(star);
    }
    
    // GERA 40 ESTRELAS INTERATIVAS
    for (let i = 0; i < 40; i++) {
        const star = document.createElement('div');
        star.className = 'star-fg';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 2 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 2 + 's';
        star.style.animationDuration = (Math.random() * 1.5 + 1) + 's';
        starsFg.appendChild(star);
    }
    
    // ✨ EFEITO MOUSE FOLLOW + VELOCIDADE
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        const stars = document.querySelectorAll('.star-fg');
        stars.forEach((star, index) => {
            const speed = (index / stars.length) * 0.03 + 0.01;
            const x = (mouseX * speed) - (parseFloat(star.style.left) || 0);
            const y = (mouseY * speed) - (parseFloat(star.style.top) || 0);
            
            star.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // ✨ TOUCH para CELULAR
    let touchX = 0, touchY = 0;
    document.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        touchX = touch.clientX;
        touchY = touch.clientY;
        
        const stars = document.querySelectorAll('.star-fg');
        stars.forEach((star, index) => {
            const speed = (index / stars.length) * 0.03 + 0.01;
            const x = (touchX * speed) - (parseFloat(star.style.left) || 0);
            const y = (touchY * speed) - (parseFloat(star.style.top) || 0);
            
            star.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
});


const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translate(-50%, -50%) translateY(0px) rotate(0deg); }
        50% { transform: translate(-50%, -50%) translateY(-20px) rotate(10deg); }
    }
`;
document.head.appendChild(style);

createLoveHeart();