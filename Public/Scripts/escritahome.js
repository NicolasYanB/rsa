//Script para digitar "Criptografia RSA" na página "index.html"

const title = document.querySelector('.titulo');
const fullText = ["Criptografia", "RSA"];
let lineIndex = 0;
let charIndex = 0;

function typeWriter() {
  if (lineIndex < fullText.length) {
    if (charIndex === 0 && lineIndex === 1) {
      // Adiciona quebra de linha antes de começar a escrever "RSA"
      title.innerHTML += '<br>';
    }
    
    if (charIndex < fullText[lineIndex].length) {
      title.innerHTML += fullText[lineIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, 100); // Velocidade da digitação
    } else {
      lineIndex++;
      charIndex = 0;
      setTimeout(typeWriter, 100); // Pausa entre linhas
    }
  }
}

setTimeout(typeWriter, 5000);