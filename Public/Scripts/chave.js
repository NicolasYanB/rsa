const generateKeyButton = document.getElementById("gerar-chave-btn");

generateKeyButton.onclick = (event) => {
  const generateKey = Module.cwrap('generate_key', 'number', ['string', 'string', 'string']);

  const p = document.getElementById("p").value;
  const q = document.getElementById("q").value;
  const e = document.getElementById("e").value;
  generateKey(p, q, e);
  
  const f = Module.FS.readFile('chave_publica.txt', {encoding: 'utf8'});
  download(f, 'chave_publica.txt');
  const keyOutput = document.getElementById("keysOutput");
  const keys = f.split('\n'); 
  keyOutput.innerText = `n: ${keys[0]}\ne: ${keys[1]}`;
};