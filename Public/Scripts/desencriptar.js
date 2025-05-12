const desencriptarBtn = document.getElementById("desencriptar-btn");
let text;
const fileInput = document.getElementById("arquivo-desencriptar");
if (fileInput.files.length > 0) {
  fileInput.files.item(0).text().then(t => {
    text = t.slice(0, -1);
  })
}
fileInput.onchange = (event) => {
  event.target.files.item(0).text().then((txt) => {
    text = txt.slice(0, -1);
  });
}

desencriptarBtn.onclick = (_) => {
  const decode = Module.cwrap('decode', 'number', ['string', 'string', 'string', 'string']);
  const p = document.getElementById("decrypt-p").value;
  const q = document.getElementById("decrypt-q").value;
  const e = document.getElementById("decrypt-e").value;
  if (!text) {
    text = document.getElementById("encryptedText").value;
  }
  const splittedText = text.split('-');
  const size = splittedText.length;
  const output = document.getElementById("decryptedOutput");
  if (size >= 10000) {
    const bound = Math.ceil(Math.sqrt(size));
    let decodedText = '';
    for (let i = 0; i <= bound+1; i++) {
      const chunk = splittedText.slice(i*bound, (i+1)*bound).join('-');
      decode(chunk, p, q, e);
      const f = Module.FS.readFile('decode.txt', {encoding: 'utf8'});
      decodedText += f;
      console.log(`${i}/${bound+1}`);
    }
    encryptedOutput.innerHTML = "O texto é muito grande para ser apresentado."
    download(decodedText, 'decoded.txt');
  } else {
    decode(text, p, q, e);
    const f = Module.FS.readFile('decode.txt', {encoding: 'utf8'});
    output.innerText = f;
  }
}