const frases = [
  "Si estás aquí, tal vez no sea casualidad.",
  "Cada texto aquí guarda algo que no pude decir en voz alta.",
  "Bienvenido a un rincón donde el alma escribe sin filtros.",
  "Lo que lees es mío, pero puede que también sea tuyo.",
  "No todos los latidos se oyen... Algunos se leen.",
  "Hay capítulos que solo se escriben con lágrimas."
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
