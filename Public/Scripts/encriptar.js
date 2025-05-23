const encodeBtn = document.getElementById("criptografar-btn");
const plainText = document.getElementById("plainText");
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
plainText.onchange = (event) => {
  text = event.target.value;
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
  text = text.replace(/[^\x00-\x7F]/g, "");
  if (size >= 10000) {
    const bound = Math.ceil(Math.sqrt(size));
    const encoder = new TextEncoder();
    let i = 0
    const encodeStream = new ReadableStream(
      {
        pull(controller) {
          if (i <= bound+1) {
            let textPart = text.slice(i*bound, (i+1)*bound);
            encode(textPart, n, e, textPart.length);
            const f = Module.FS.readFile('encode.txt', {encoding: 'utf8'});
            controller.enqueue(encoder.encode(f));
            console.log(`${i}/${bound+1}`);
            i++;
          } else {
            controller.close();
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
    encode(text, n, e, size);
    const f = Module.FS.readFile('encode.txt', {encoding: 'utf8'});
    download(f, 'encode.txt');
    encryptedOutput.innerText = f;
  }
}