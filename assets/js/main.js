document.addEventListener("DOMContentLoaded", () => {
  // === Mostrar frases al hacer scroll ===
  const frases = document.querySelectorAll(".frase");
  if (frases.length > 0) {
    const showOnScroll = () => {
      const triggerBottom = window.innerHeight * 0.85;
      frases.forEach((f) => {
        const fraseTop = f.getBoundingClientRect().top;
        if (fraseTop < triggerBottom) {
          f.classList.add("visible");
        }
      });
    };
    window.addEventListener("scroll", showOnScroll);
    showOnScroll();
  }

  const cuerpo = document.body;
  const audioDia = document.getElementById("audio-dia");
  const audioNoche = document.getElementById("audio-noche");
  const btnMusica = document.getElementById("btn-musica");
  const volumen = document.getElementById("volumen");
  const modoNocheBtn = document.getElementById("modo-noche");
  const canvasEstrellas = document.getElementById("estrellas-canvas");
  const canvasMariposas = document.getElementById("mariposas-canvas");

  // === Variables persistentes
  let esNoche = localStorage.getItem("modoNoche") === "true";
  let reproduciendo = true;

  // === Sincronizar volumen desde localStorage
  const volGuardado = localStorage.getItem("volumen");
  if (volumen && volGuardado !== null) {
    volumen.value = volGuardado;
  }

  // === Función para guardar progreso y estado de modo noche
  function guardarEstado() {
    const tiempo = esNoche ? audioNoche.currentTime : audioDia.currentTime;
    localStorage.setItem("tiempoCancion", tiempo.toString());
    localStorage.setItem("modoNoche", esNoche);
    localStorage.setItem("volumen", volumen.value);
  }

  // === Aplicar modo (día o noche)
  function aplicarModo() {
    cuerpo.classList.toggle("noche", esNoche);

    if (canvasMariposas) canvasMariposas.classList.toggle("oculto", esNoche);
    if (canvasEstrellas) canvasEstrellas.classList.toggle("oculto", !esNoche);

    if (esNoche) {
      audioDia.pause();
      audioNoche.volume = volumen.value;
      if (reproduciendo) audioNoche.play();
    } else {
      audioNoche.pause();
      audioDia.volume = volumen.value;
      if (reproduciendo) audioDia.play();
    }
  }

  // === Iniciar música desde tiempo guardado
  const tiempoGuardado = parseFloat(localStorage.getItem("tiempoCancion"));
  if (!isNaN(tiempoGuardado)) {
    audioDia.currentTime = tiempoGuardado;
    audioNoche.currentTime = tiempoGuardado;
  }

  aplicarModo();

  if (volumen) {
    volumen.addEventListener("input", () => {
      const vol = volumen.value;
      audioDia.volume = vol;
      audioNoche.volume = vol;
      localStorage.setItem("volumen", vol);
    });
  }

  if (btnMusica) {
    btnMusica.addEventListener("click", () => {
      if (reproduciendo) {
        audioDia.pause();
        audioNoche.pause();
        btnMusica.textContent = "🔇 Silencio";
      } else {
        (esNoche ? audioNoche : audioDia).play();
        btnMusica.textContent = "🎶 Fluye con ella";
      }
      reproduciendo = !reproduciendo;
    });
  }

	 if (modoNocheBtn) {
	  // Establecer texto inicial
	  modoNocheBtn.textContent = esNoche ? "☀️ Modo Día" : "🌙 Modo Noche";

	  modoNocheBtn.addEventListener("click", () => {
		guardarEstado();
		esNoche = !esNoche;
		aplicarModo();
		// Cambiar texto después del cambio
		modoNocheBtn.textContent = esNoche ? "☀️ Modo Día" : "🌙 Modo Noche";
	  });
	}

  // === Guardar estado al salir de la página
  window.addEventListener("beforeunload", guardarEstado);

  // === Asegurar que canvas ocupa toda la página (con scroll)
  function redimensionarCanvas(canvas) {
    if (canvas) {
      canvas.width = Math.max(document.body.scrollWidth, window.innerWidth);
      canvas.height = Math.max(document.body.scrollHeight, window.innerHeight);
    }
  }

  redimensionarCanvas(canvasEstrellas);
  redimensionarCanvas(canvasMariposas);

  window.addEventListener("resize", () => {
    redimensionarCanvas(canvasEstrellas);
    redimensionarCanvas(canvasMariposas);
  });
});
