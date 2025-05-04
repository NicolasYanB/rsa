document.addEventListener('DOMContentLoaded', function() {
    const ghost = document.getElementById('ghostContainer');
    const ghostWidth = 100;
    const ghostHeight = 100;
    
    // Posição inicial aleatória dentro dos limites
    let posX = Math.random() * (window.innerWidth - ghostWidth);
    let posY = Math.random() * (window.innerHeight - ghostHeight);
    
    // Velocidades iniciais
    let speedX = (Math.random() - 0.5) * 4;
    let speedY = (Math.random() - 0.5) * 4;
    
    function updatePosition() {
        // Atualiza posição
        posX += speedX;
        posY += speedY;
        
        // Verifica limites horizontais
        if (posX < 0) {
            posX = 0;
            speedX = -speedX * 0.8; // Inverte direção e reduz velocidade
        } else if (posX > window.innerWidth - ghostWidth) {
            posX = window.innerWidth - ghostWidth;
            speedX = -speedX * 0.8;
        }
        
        // Verifica limites verticais
        if (posY < 0) {
            posY = 0;
            speedY = -speedY * 0.8;
        } else if (posY > window.innerHeight - ghostHeight) {
            posY = window.innerHeight - ghostHeight;
            speedY = -speedY * 0.8;
        }
        
        // Aplica nova posição
        ghost.style.left = posX + 'px';
        ghost.style.top = posY + 'px';
        
        // Inverte a imagem quando muda de direção
        ghost.style.transform = speedX < 0 ? 'scaleX(-1)' : 'scaleX(1)';
        
        // Continua a animação
        requestAnimationFrame(updatePosition);
    }
    
    // Faz o fantasma fugir do mouse
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const ghostCenterX = posX + ghostWidth/2;
        const ghostCenterY = posY + ghostHeight/2;
        
        const distanceX = mouseX - ghostCenterX;
        const distanceY = mouseY - ghostCenterY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        if (distance < 200) {
            // Foge na direção oposta ao mouse
            const fleeSpeed = 6;
            const angle = Math.atan2(distanceY, distanceX);
            
            speedX = -Math.cos(angle) * fleeSpeed;
            speedY = -Math.sin(angle) * fleeSpeed;
            
            // Garante que não saia da tela mesmo fugindo
            posX = Math.max(0, Math.min(window.innerWidth - ghostWidth, posX));
            posY = Math.max(0, Math.min(window.innerHeight - ghostHeight, posY));
        }
    });
    
    // Inicia a animação
    updatePosition();
});