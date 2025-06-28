let currentSpread = 1;
const spreads = document.querySelectorAll('.spread');
const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');

function showSpread(index) {
  spreads.forEach((spread, i) => {
    spread.classList.toggle('hidden', (i + 1) !== index);
  });

  // 💫 Cada vez que cambias de página, activamos lluvia de estrellas
  lluviaDeEstrellas();
}

nextButton.addEventListener('click', () => {
  if (currentSpread < spreads.length) {
    currentSpread++;
    showSpread(currentSpread);
  }
});

prevButton.addEventListener('click', () => {
  if (currentSpread > 1) {
    currentSpread--;
    showSpread(currentSpread);
  }
});

// Inicializa
showSpread(currentSpread);









// Botón modo noche
const btnModo = document.getElementById('modo-noche');
btnModo.addEventListener('click', () => {
  document.body.classList.toggle('noche');
  btnModo.textContent = document.body.classList.contains('noche') ? '☀️ Modo Día' : '🌙 Modo Noche';
});

// Música y volumen
const btnMusica = document.getElementById('btn-musica');
const volumen = document.getElementById('volumen');
const audio = document.getElementById('musica');
audio.volume = volumen.value;

btnMusica.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    btnMusica.textContent = '🔇 Silencio';
  } else {
    audio.pause();
    btnMusica.textContent = '🎶 Fluye con ella';
  }
});

volumen.addEventListener('input', () => {
  audio.volume = volumen.value;
});





// Corazones animados
const corazones = document.getElementById('corazones');
const emojis = ['💗', '🤍', '💛', '🩶'];

function crearCorazon() {
  const corazon = document.createElement('div');
  corazon.classList.add('corazon');
  corazon.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  corazon.style.left = `${Math.random() * 100}%`;
  corazon.style.top = `${Math.random() * 100}%`;
  corazones.appendChild(corazon);
  setTimeout(() => corazon.remove(), 6000);
}
setInterval(crearCorazon, 150);





const palabrasMagicas = [
  "cariño", "alma", "lugar seguro", "especial", "hermanitos",
  "luz", "me encanta", "te conozco", "no seria el mismo",
  "gracias", "hogar", "bonitos", "primos", "nosotroa", 
  "no me rendí", "te observo", "bonito", "siempre he luchado por ti",
  "tu y yo", "me gustas"
];

document.querySelectorAll('.palabra-magica').forEach(el => {
  el.addEventListener('click', () => {
    const sparkle = document.createElement('span');
    sparkle.textContent = '✨';
    sparkle.style.position = 'absolute';
    sparkle.style.left = `${Math.random() * 80}%`;
    sparkle.style.top = `${Math.random() * 80}%`;
    sparkle.style.animation = 'flotar 2s ease-out forwards';
    el.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 2000);
  });
});


document.querySelectorAll('.con-imagen').forEach(palabra => {
  palabra.addEventListener('click', () => {
    const src = palabra.getAttribute('data-img');
    const img = document.createElement('img');
    img.src = src;
    img.className = 'popup-img';
    document.body.appendChild(img);
    setTimeout(() => img.remove(), 3000);
  });
});


document.querySelectorAll('.con-link').forEach(el => {
  el.addEventListener('click', () => {
    const url = el.getAttribute('data-url');
    window.open(url, '_blank');
  });
});



function lluviaDeEstrellas() {
  for (let i = 0; i < 20; i++) {
    const estrella = document.createElement('div');
    estrella.textContent = '✨';
    estrella.style.position = 'fixed';
    estrella.style.left = Math.random() * window.innerWidth + 'px';
    estrella.style.top = Math.random() * window.innerHeight + 'px';
    estrella.style.fontSize = `${Math.random() * 1.5 + 1}rem`;
    estrella.style.opacity = 0.8;
    estrella.style.transition = 'transform 3s ease, opacity 3s ease';
    document.body.appendChild(estrella);

    setTimeout(() => {
      estrella.style.transform = `translateY(${Math.random() * 100 + 100}px) scale(0.5)`;
      estrella.style.opacity = 0;
    }, 10);

    setTimeout(() => {
      estrella.remove();
    }, 3000);
  }
}



// Crear mariposa
const mariposa = document.createElement('div');
mariposa.textContent = '🐟'; // Cambia el emoji si quieres
mariposa.classList.add('mariposa-cursor');
document.body.appendChild(mariposa);

// Seguir el cursor directamente
document.addEventListener('mousemove', (e) => {
  mariposa.style.left = `${e.clientX}px`;
  mariposa.style.top = `${e.clientY}px`;
});