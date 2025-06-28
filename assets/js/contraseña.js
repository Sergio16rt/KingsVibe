document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('formularioClave');
  const claveInput = document.getElementById('clave');
  const mensajeError = document.getElementById('mensajeError');
  const fraseClave = document.getElementById('fraseClave');

  const claves = {
    "Antorchita": "rosita.html",
    "Borrego": "dani.html",
    // Puedes agregar más claves aquí
  };

  const frasesError = [
    "No eres digno de esta historia...",
    "Tu corazón aún no está listo.",
    "Prueba de nuevo cuando el viento sople a tu favor.",
    "Solo las almas especiales pueden continuar.",
    "No todas las puertas se abren con fuerza...",
    "El amor verdadero sabría la respuesta."
  ];

  // Función para animar el cambio de texto
  const fadeOutIn = (el, newText, color = null) => {
    el.style.transition = "opacity 0.4s ease";
    el.style.opacity = 0;
    setTimeout(() => {
      el.textContent = newText;
      if (color) el.style.color = color;
      el.style.opacity = 1;
    }, 400);
  };

  formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    const clave = claveInput.value.trim();

    if (claves[clave]) {
      fadeOutIn(fraseClave, "Clave correcta... ✨", "#2ecc71"); // Verde suave
      setTimeout(() => {
        window.location.href = claves[clave];
      }, 1000);
    } else {
      const randomMsg = frasesError[Math.floor(Math.random() * frasesError.length)];
      fadeOutIn(fraseClave, randomMsg, "#b04040"); // Rojo suave
      mensajeError.textContent = "";
      claveInput.value = "";
    }
  });

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
});
