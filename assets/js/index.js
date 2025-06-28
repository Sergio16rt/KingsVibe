const frases = [
  "La nostalgia es el eco del alma.",
  "Cada recuerdo tiene su aroma.",
  "Las mariposas también lloran.",
  "Los abrazos que ya no están.",
  "En el silencio, habita la memoria."
];

let fraseIndex = 0;
const fraseElemento = document.getElementById("frase-dinamica");

function escribirFrase() {
  fraseElemento.textContent = "";
  const frase = frases[fraseIndex];
  let i = 0;
  const escribir = () => {
    if (i < frase.length) {
      fraseElemento.textContent += frase[i];
      i++;
      setTimeout(escribir, 100);
    }
  };
  escribir();
  fraseIndex = (fraseIndex + 1) % frases.length;
}

setInterval(escribirFrase, 6000);
escribirFrase();
