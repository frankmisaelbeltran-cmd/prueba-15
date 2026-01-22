const words = document.querySelectorAll(".word");
const modal = document.getElementById("modal");
const modalText = document.getElementById("modalText");
const closeModal = document.getElementById("closeModal");

/* Abrir modal */
words.forEach(word => {
  word.addEventListener("click", () => {
    modalText.textContent = word.dataset.text;
    modal.classList.add("show");
  });
});

/* Cerrar modal */
closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
});

/* 🌫️ PALABRAS DE FONDO */
const floatingWords = [
  "Hermosa",
  "Extraordinaria",
  "Especial",
  "Única",
  "Bella",
  "Radiante",
  "Linda",
  "Dulce",
  "Fascinante"
];

function createFloatingWord() {
  const word = document.createElement("span");
  word.classList.add("floating-word");

  word.textContent =
    floatingWords[Math.floor(Math.random() * floatingWords.length)];

  const x = Math.random() * 80 + 10; // evita bordes
  const y = Math.random() * 80 + 10;

  word.style.left = `${x}%`;
  word.style.top = `${y}%`;

  const duration = Math.random() * 2 + 4; // 4–6s
  word.style.animationDuration = `${duration}s`;

  document.body.appendChild(word);

  setTimeout(() => {
    word.remove();
  }, duration * 1000);
}

/* Generador suave */
setInterval(() => {
  const amount = Math.floor(Math.random() * 2) + 1; // 1–2 palabras
  for (let i = 0; i < amount; i++) {
    createFloatingWord();
  }
}, 1800);
