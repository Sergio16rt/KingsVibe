(() => {
  // Canvas y contextos
  const mariposasCanvas = document.getElementById('mariposas-canvas');
  const estrellasCanvas = document.getElementById('estrellas-canvas');
  const ctxM = mariposasCanvas.getContext('2d');
  const ctxE = estrellasCanvas.getContext('2d');

  // Ajustar tamaño canvas
  function resize() {
    mariposasCanvas.width = window.innerWidth;
    mariposasCanvas.height = window.innerHeight;
    estrellasCanvas.width = window.innerWidth;
    estrellasCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // -------------------
  // MARIPOSAS MODO DÍA
  // -------------------
  class Mariposa {
    constructor() {
      this.x = Math.random() * mariposasCanvas.width;
      this.y = Math.random() * mariposasCanvas.height;
      this.size = 15 + Math.random() * 15;
      this.speedX = 0.5 + Math.random() * 1;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.angle = Math.random() * Math.PI * 2;
      this.angleSpeed = 0.02 + Math.random() * 0.02;
      this.color = `rgba(170, 123, 195, 0.7)`; // tonos morados
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY + Math.sin(this.angle) * 0.5;
      this.angle += this.angleSpeed;

      if(this.x > mariposasCanvas.width + this.size) this.x = -this.size;
      if(this.y > mariposasCanvas.height) this.y = 0;
      if(this.y < 0) this.y = mariposasCanvas.height;
    }
    draw() {
      ctxM.save();
      ctxM.translate(this.x, this.y);
      ctxM.rotate(Math.sin(this.angle) * 0.3);
      ctxM.fillStyle = this.color;
      ctxM.beginPath();
      // alas simples (triángulos curvos)
      ctxM.moveTo(0, 0);
      ctxM.bezierCurveTo(this.size/2, -this.size/2, this.size, 0, this.size/2, this.size/2);
      ctxM.bezierCurveTo(0, this.size/3, -this.size/2, this.size/2, 0, 0);
      ctxM.fill();
      ctxM.restore();
    }
  }
  const mariposas = [];
  for(let i=0; i<30; i++) {
    mariposas.push(new Mariposa());
  }

  // ------------------------
  // ESTRELLAS, GALAXIAS, FUGACES MODO NOCHE
  // ------------------------
  class Estrella {
    constructor() {
      this.x = Math.random() * estrellasCanvas.width;
      this.y = Math.random() * estrellasCanvas.height;
      this.size = Math.random() * 1.5 + 0.5;
      this.brightness = Math.random();
      this.brightnessDir = Math.random() < 0.5 ? 0.01 : -0.01;
    }
    update() {
      this.brightness += this.brightnessDir;
      if(this.brightness <= 0 || this.brightness >= 1) {
        this.brightnessDir *= -1;
      }
    }
    draw() {
      ctxE.beginPath();
      ctxE.shadowBlur = 10;
      ctxE.shadowColor = `rgba(255, 255, 255, ${this.brightness})`;
      ctxE.fillStyle = `rgba(255, 255, 255, ${this.brightness})`;
      ctxE.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctxE.fill();
    }
  }

  class Galaxia {
    constructor() {
      this.x = Math.random() * estrellasCanvas.width;
      this.y = Math.random() * estrellasCanvas.height;
      this.radius = 30 + Math.random() * 70;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.002;
      this.opacity = 0.1 + Math.random() * 0.15;
    }
    update() {
      this.rotation += this.rotationSpeed;
    }
    draw() {
      const gradient = ctxE.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
      gradient.addColorStop(0, `rgba(170, 123, 195, ${this.opacity})`);
      gradient.addColorStop(1, 'rgba(170, 123, 195, 0)');
      ctxE.save();
      ctxE.translate(this.x, this.y);
      ctxE.rotate(this.rotation);
      ctxE.fillStyle = gradient;
      ctxE.beginPath();
      ctxE.ellipse(0, 0, this.radius, this.radius/3, 0, 0, Math.PI * 2);
      ctxE.fill();
      ctxE.restore();
    }
  }

  class Fugaz {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * estrellasCanvas.width;
      this.y = Math.random() * estrellasCanvas.height / 2;
      this.length = 80 + Math.random() * 100;
      this.speed = 5 + Math.random() * 5;
      this.opacity = 1;
      this.trail = [];
    }
    update() {
      this.x += this.speed;
      this.y += this.speed / 5;
      this.opacity -= 0.02;
      if(this.opacity <= 0) this.reset();
    }
    draw() {
      ctxE.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctxE.lineWidth = 2;
      ctxE.beginPath();
      ctxE.moveTo(this.x, this.y);
      ctxE.lineTo(this.x - this.length, this.y - this.length / 5);
      ctxE.stroke();
    }
  }

  // Crear objetos
  const estrellas = [];
  for(let i=0; i<150; i++) estrellas.push(new Estrella());

  const galaxias = [];
  for(let i=0; i<5; i++) galaxias.push(new Galaxia());

  const fugaces = [];
  for(let i=0; i<3; i++) fugaces.push(new Fugaz());

  // -----------------------
  // Loop principal de animación
  // -----------------------
  function animate() {
    if (document.body.classList.contains('noche')) {
      // Modo noche
      mariposasCanvas.style.display = 'none';
      estrellasCanvas.style.display = 'block';

      ctxE.clearRect(0, 0, estrellasCanvas.width, estrellasCanvas.height);

      galaxias.forEach(g => {
        g.update();
        g.draw();
      });

      estrellas.forEach(e => {
        e.update();
        e.draw();
      });

      fugaces.forEach(f => {
        f.update();
        f.draw();
      });
    } else {
      // Modo día
      estrellasCanvas.style.display = 'none';
      mariposasCanvas.style.display = 'block';

      ctxM.clearRect(0, 0, mariposasCanvas.width, mariposasCanvas.height);

      mariposas.forEach(m => {
        m.update();
        m.draw();
      });
    }

    requestAnimationFrame(animate);
  }

  animate();

})();
