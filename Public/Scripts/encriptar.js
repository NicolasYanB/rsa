const encodeBtn = document.getElementById("criptografar-btn");
let text;
const fileInput = document.getElementById("arquivo-encriptar");
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

encodeBtn.onclick = (_) => {
  const encode = Module.cwrap('encode', 'number', ['string', 'string', 'string', 'number']);
  const key = document.getElementById("publicKey").value.split(" ");
  const n = key[0];
  const e = key[1];
  if (!text) {
    text = document.getElementById("plainText").value;
  }
  const size = text.length;
  console.log('Encriptação iniciada!');
  const encryptedOutput = document.getElementById("encryptedOutput");
  if (size >= 10000) {
    const encodeStream = new ReadableStream(
      {
        start(controller) {
          const bound = Math.ceil(Math.sqrt(size));
          const encoder = new TextEncoder();
          for (let i = 0; i <= bound+1; i++) {
            const textPart = text.slice(i*bound, (i+1)*bound);
            encode(textPart, n, e, bound);
            const f = Module.FS.readFile('encode.txt', {encoding: 'utf8'});
            controller.enqueue(encoder.encode(f));
            console.log(`${i}/${bound+1}`);
          }
        }
      }
    );
    encryptedOutput.innerHTML = "O texto é muito grande para ser apresentado."
    // const reader = encodeStream.getReader();
    const fileStream = streamSaver.createWriteStream('encode.txt');
    encodeStream.pipeTo(fileStream).then(() => {
      console.log('download finished');
    });
    // download_stream(encoded, 'encode.txt');
  } else {
    console.log(text);
    encode(text, n, e, size);
    const f = Module.FS.readFile('encode.txt', {encoding: 'utf8'});
    download(f, 'encode.txt');
    encryptedOutput.innerText = f;
  }
}