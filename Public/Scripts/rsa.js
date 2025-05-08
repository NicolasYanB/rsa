const generateKeyButton = document.getElementById("gerar-chave-btn");

function download(str, name) {
  // cria elemento de link (a)
  const link = document.createElement('a');
  // deixa ele invisível
  link.style.display = 'none';
  // adiciona os atributos para baixar
  link.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(str));
  link.setAttribute('download', name);
  // simula o click, baixando o arquivo
  link.click();
}

generateKeyButton.onclick = (event) => {
  event.preventDefault()
  const generateKey = Module.cwrap('generate_key', 'number', ['string', 'string', 'string']);

  const p = document.getElementById("p").value;
  const q = document.getElementById("q").value;
  const e = document.getElementById("e").value;
  generateKey(p, q, e);
  
  const f = Module.FS.readFile('chave_publica.txt', {encoding: 'utf8'});
  download(f, 'chave_publica.txt');
};