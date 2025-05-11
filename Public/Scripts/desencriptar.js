const desencriptarBtn = document.getElementById("desencriptar-btn");

desencriptarBtn.onclick = (event) => {
  event.preventDefault();
  const decode = Module.cwrap('decode', 'number', ['string', 'string', 'string', 'string']);
  const p = document.getElementById("decrypt-p").value;
  const q = document.getElementById("decrypt-q").value;
  const e = document.getElementById("decrypt-e").value;
  const text = document.getElementById("encryptedText").value;
  decode(text, p, q, e);
  const f = Module.FS.readFile('decode.txt', {encoding: 'utf8'});
  const output = document.getElementById("decryptedOutput");
  output.innerText = f;
}