//Script para gerar e controlar o fantasma interativo na página "index.html"

document.addEventListener('DOMContentLoaded', function() {
    const ghost = document.getElementById('ghostContainer');
    const ghostWidth = 100;
    const ghostHeight = 100;
    
    // Configuração inicial - fantasma invisível
    ghost.style.opacity = '0';
    ghost.style.transition = 'opacity 2s ease-in';
    ghost.style.display = 'block'; // Garante que o elemento está visível (mas transparente)

    // Posição inicial aleatória dentro dos limites
    let posX = Math.random() * (window.innerWidth - ghostWidth);
    let posY = Math.random() * (window.innerHeight - ghostHeight);
    
    // Velocidades iniciais
    let speedX = (Math.random() - 0.5) * 5;
    let speedY = (Math.random() - 0.5) * 5;
    
    // Atraso de 5 segundos antes de aparecer
    setTimeout(() => {
        // Inicia o fade-in (leva 2 segundos)
        ghost.style.opacity = '1';
        
        // Inicia a animação de movimento
        updatePosition();
    }, 5000);

    function updatePosition() {
        // Atualiza posição
        posX += speedX;
        posY += speedY;
        
        // Verifica limites horizontais
        if (posX < 0) {
            posX = 0;
            speedX = -speedX * 0.8;
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
    
    // Faz o fantasma fugir do mouse (só ativo após aparecer)
    document.addEventListener('mousemove', function(e) {
        // Só reage se o fantasma já estiver visível
        if (parseFloat(ghost.style.opacity) > 0) {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const ghostCenterX = posX + ghostWidth/2;
            const ghostCenterY = posY + ghostHeight/2;
            
            const distanceX = mouseX - ghostCenterX;
            const distanceY = mouseY - ghostCenterY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            
            if (distance < 200) {
                const fleeSpeed = 6;
                const angle = Math.atan2(distanceY, distanceX);
                
                speedX = -Math.cos(angle) * fleeSpeed;
                speedY = -Math.sin(angle) * fleeSpeed;
                
                posX = Math.max(0, Math.min(window.innerWidth - ghostWidth, posX));
                posY = Math.max(0, Math.min(window.innerHeight - ghostHeight, posY));
            }
        }
    });
});