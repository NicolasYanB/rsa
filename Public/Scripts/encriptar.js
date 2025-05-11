const encodeBtn = document.getElementById("criptografar-btn");

encodeBtn.onclick = (event) => {
  event.preventDefault();
  const encode = Module.cwrap('encode', 'number', ['string', 'string', 'string', 'number']);
  const key = document.getElementById("publicKey").value.split(" ");
  const n = key[0];
  const e = key[1];
  const text = document.getElementById("plainText").value;
  const size = text.length;
  console.log('Encriptação iniciada!');
  if (size >= 1000) {
    let encoded = '';
    const bound = Math.ceil(Math.sqrt(size));
    for (let i = 0; i <= bound+1; i++) {
      const textPart = text.slice(i*bound, (i+1)*bound);
      encode(textPart, n, e, bound);
      const f = Module.FS.readFile('encode.txt', {encoding: 'utf8'});
      encoded += i == bound + 1 ? f : f + '-';
      console.log(`${i}/${bound+1}`);
    }
    download_stream(encoded, 'encode.txt');
  } else {
    encode(text, n, e, size);
    const f = Module.FS.readFile('encode.txt', {encoding: 'utf8'});
    download(f, 'encode.txt');
  }
}