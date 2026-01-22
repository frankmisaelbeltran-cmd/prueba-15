  /* ===== CORAZONES ===== */
  const pinkTones = [
    "rgba(255,105,180,0.8)",
    "rgba(255,182,193,0.8)",
    "rgba(255,20,147,0.8)"
  ];

const layers = ["layer-back", "layer-mid", "layer-front"];
  const heartContainer = document.getElementById("hearts");

  function createHeart() {
    const heart = document.createElement("div");
  heart.classList.add("heart");
    heart.textContent = "❤";

    const color = pinkTones[Math.floor(Math.random() * pinkTones.length)];
    heart.style.color = color;
  heart.style.textShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
    heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 30 + 50 + "px";

  const layer = layers[Math.floor(Math.random() * layers.length)];
  heart.classList.add(layer);

  heart.style.animationDuration =
    layer === "layer-back" ? "16s" :
    layer === "layer-mid"  ? "12s" :
                             "9s";

    heartContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 17000);
  }

setInterval(createHeart, 500);

  /* ===== TEXTO ===== */

let fontIndex = 0;
  const title = document.getElementById("title");

const styles = [
  { font: "'Playfair Display', serif", size: "30px", spacing: "2px" },
  { font: "'Cormorant Garamond', serif", size: "32px", spacing: "3px" },
  { font: "'Raleway', sans-serif", size: "26px", spacing: "4px" },
  { font: "'Merriweather', serif", size: "28px", spacing: "2px" }
];


let i = 0;

  setInterval(() => {
  i = (i + 1) % styles.length;
  title.style.fontFamily = styles[i].font;
  title.style.fontSize = styles[i].size;
  title.style.letterSpacing = styles[i].spacing;
  }, 4000);




/* ===== AGRANDAR FOTOS ===== */
document.querySelectorAll(".polaroid").forEach(photo => {
  photo.addEventListener("click", () => {
    photo.classList.toggle("active");
  });
});

  document.getElementById("btnNext").addEventListener("click", () => {
  document.querySelector(".container").classList.add("hidden");

  setTimeout(() => {
    document.getElementById("scene2").classList.remove("hidden");
    initScene2(); // 👈 ACTIVAMOS EL BOTÓN DEL LIBRO AQUÍ
  }, 600);
  });


/* ===== ESCENA 2 - LIBRO ===== */
let cloudInterval;

function initScene2() {
  let currentPage = 0;
  const pages = document.querySelectorAll(".page");
  const nextPageBtn = document.getElementById("nextPage");

  if (!nextPageBtn || pages.length === 0) return;

  pages.forEach((page, index) => {
    page.classList.toggle("active", index === 0);
  });

  // 🔥 INICIAR NUBES
  cloudInterval = setInterval(createCloud, 3500);

  nextPageBtn.onclick = () => {
    pages[currentPage].classList.remove("active");
    pages[currentPage].classList.add("flip");
    currentPage++;

    if (currentPage < pages.length) {
      pages[currentPage].classList.add("active");
    } else {
      clearInterval(cloudInterval); // 🚫 parar nubes

      document.getElementById("scene2").classList.add("hidden");
      setTimeout(() => {
        document.getElementById("scene3").classList.remove("hidden");
        createStars();
        startConstellation();
      }, 800);
    }
  };
}

  
  function createCloud() {
  const cloudLayer = document.getElementById("cloud-layer");
  if (!cloudLayer) return;

  const cloud = document.createElement("div");
  cloud.classList.add("cloud");

  // Tamaño
  const size = Math.random() * 120 + 160;
  cloud.style.width = size + "px";
  cloud.style.height = size * 0.6 + "px";

  // Posición vertical
  cloud.style.top = Math.random() * 80 + "%";

  // Más visibles
  cloud.style.opacity = Math.random() * 0.4 + 0.4;

  // Velocidad (mucho más rápida)
  const duration = Math.random() * 20 + 30;
  cloud.style.animationDuration = duration + "s";

  cloudLayer.appendChild(cloud);

  setTimeout(() => cloud.remove(), duration * 1000);

  
}



/* generar nubes constantemente */
setInterval(createCloud, 4000);


/* ===== ESCENA 3 - ESTRELLAS ===== */
function createStars() {
  const container = document.getElementById("stars");
  if (!container) return;

  for (let i = 0; i < 120; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    star.style.left = Math.random() * 100 + "vw";
    star.style.top = Math.random() * 100 + "vh";

    const size = Math.random() * 2 + 1;
    star.style.width = size + "px";
    star.style.height = size + "px";

    star.style.animationDuration = (Math.random() * 4 + 2) + "s";

    container.appendChild(star);
  }
}

function startConstellation() {
  const mainStars = document.querySelectorAll(".key-star");
  const extraStars = document.querySelectorAll(".extra-star");
  const line = document.querySelector(".constellation-line");

  if (!line) return;

  // Reset
  mainStars.forEach(s => s.style.opacity = 0);
  extraStars.forEach(s => s.style.opacity = 0);
  line.style.animation = "none";
  line.offsetHeight;

  // Aparecen estrellas principales
  mainStars.forEach((star, i) => {
    setTimeout(() => {
      star.style.opacity = 1;
    }, i * 300);
  });

  // Aparecen estrellas pequeñas
  extraStars.forEach((star, i) => {
    setTimeout(() => {
      star.style.opacity = 0.6;
    }, i * 250 + 1200);
  });

  // Se dibujan las líneas
  setTimeout(() => {
    line.style.animation = "drawLine 4s ease forwards";
  }, 2000);
}

const stars = document.querySelectorAll(".key-star");

stars.forEach((star, index) => {
  setTimeout(() => {
    star.classList.add("active");
  }, index * 500 + 300); // sincronía con el trazo
});


setInterval(startConstellation, 9000);


//musica
const music = document.getElementById("bgMusic");
const firstNext = document.getElementById("btnNext");
const finalNext = document.getElementById("finalNext");

music.volume = 0.6;

// Inicia la música en la primera interacción
firstNext.addEventListener("click", () => {
  if (music.paused) {
    music.play().catch(() => {});
  }
});

// Fade out al presionar el último siguiente
finalNext.addEventListener("click", (e) => {
  e.preventDefault();

  let volume = music.volume;
  const fade = setInterval(() => {
    if (volume > 0.05) {
      volume -= 0.05;
      music.volume = volume;
    } else {
      clearInterval(fade);
      music.pause();
      window.location.href = finalNext.href;
    }
  }, 100);
});

