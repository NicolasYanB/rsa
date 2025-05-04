// Espera o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    // Remove o overlay após 2 segundos
    setTimeout(function() {
        document.body.classList.add('loaded');
        
        // Remove completamente o overlay após a transição
        setTimeout(function() {
            document.querySelector('.welcome-overlay').remove();
        }, 1000); // Tempo da transição CSS
    }, 5000); // Tempo que a mensagem fica visível
});