const container = document.getElementById("scroll-container");
const scene = document.getElementById("scene");
const clouds = document.querySelectorAll(".cloud");
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let currentScroll = 0;
let progress = 0;




/* 📐 CANVAS RESPONSIVE */
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

/* ⭐ ESTRELLAS */
const stars = Array.from({ length: 120 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight * 0.6,
  r: Math.random() * 1.5 + 0.5,
}));

/* ✨ CONSTELACIONES (conectan las tarjetas) */
function drawConstellations(alpha) {
  const cards = document.querySelectorAll(".card");
  ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.4})`;
  ctx.lineWidth = 1;

  ctx.beginPath();
  cards.forEach((card, i) => {
    const rect = card.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2 - 30;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
}

/* 🎬 LOOP PRINCIPAL */
function animate() {
  const maxScroll = container.scrollWidth - container.clientWidth;
  progress = Math.min(currentScroll / maxScroll, 1);

  /* 🌅 → 🌌 CIELO AZUL REAL */
  const top = [
    135 - progress * 90,
    206 - progress * 120,
    235 - progress * 180
  ];
  const bottom = [
    234 - progress * 200,
    246 - progress * 200,
    255 - progress * 255
  ];

  scene.style.background = `
    linear-gradient(
      rgb(${top.join(",")}),
      rgb(${bottom.join(",")})
    )
  `;

  /* ☁️ PARALLAX */
  clouds.forEach((cloud, i) => {
    cloud.style.transform = `translateX(${-currentScroll * (i + 1) * 0.15}px)`;
  });

  /* ⭐ ESTRELLAS SOLO DE NOCHE */
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (progress > 0.5) {
    const nightAlpha = (progress - 0.5) * 2;

    stars.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${nightAlpha})`;
      ctx.fill();
    });

    drawConstellations(nightAlpha);
  }

  requestAnimationFrame(animate);
}

/* 🎯 SCROLL */
container.addEventListener("scroll", () => {
  currentScroll = container.scrollLeft;
});

animate();

const nextButton = document.getElementById("nextScene");

if (nextButton) {
  nextButton.addEventListener("click", () => {
    document.body.classList.add("fade-out");

    setTimeout(() => {
      // 👉 aquí cargas la nueva escena
      // ejemplo:
      const fadeAudio = setInterval(() => {
      if (music.volume > 0.02) {
      music.volume -= 0.02;
       } else {
        clearInterval(fadeAudio);
        music.pause();
        window.location.href = "escena2.html";
      }
}, 40);

    }, 1200);
  });
}

const music = document.getElementById("bgMusic");

function startMusic() {
  if (!music) {
    console.warn("No se encontró bgMusic");
    return;
  }

  music.muted = false;
  music.volume = 0.7;

  music.play()
    .then(() => console.log("🎵 Música reproduciéndose"))
    .catch(err => console.error("❌ Audio bloqueado:", err));

  document.removeEventListener("click", startMusic);
  document.removeEventListener("touchstart", startMusic);
}

document.addEventListener("click", startMusic, { once: true });
document.addEventListener("touchstart", startMusic, { once: true });

