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

function download_stream(str, name) {
  const fileStream = streamSaver.createWriteStream(name);
  new Response(str).body.pipeTo(fileStream).then(() => {
    console.log('download finished');
  });
}