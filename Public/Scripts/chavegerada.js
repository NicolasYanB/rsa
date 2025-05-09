//Script para mostrar a chave ao enviar parâmetros criptográficos na página "gerarchave.html"

document.getElementById('cryptoForm').addEventListener('submit', function(e) 
{
    e.preventDefault();
            
    document.getElementById('keysOutput').style.display = 'block';
});