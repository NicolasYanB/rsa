//Script para controlar o Welcome na página "index.html"

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        document.body.classList.add('loaded');
        
        setTimeout(function() {
            document.querySelector('.welcome-overlay').remove();
        }, 1000); // Tempo da transição CSS
    }, 5000); // Tempo que a mensagem fica visível
});