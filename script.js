const text = document.getElementById("text");
const options = document.getElementById("options");
const music = document.getElementById("bgMusic");
const progressBar = document.getElementById("progressBar");
const secretIcon = document.getElementById("secretIcon");
const secretModal = document.getElementById("secretModal");
const hearts = document.querySelector(".hearts");
const finalHint = document.getElementById("finalHint");
const yesBtn = document.getElementById("yesBtn");
const yesYesBtn = document.getElementById("yesYesBtn");
const yesScreen = document.getElementById("yesScreen");
const card = document.querySelector(".card");

let typingInterval = null;

const story = [
  { q: "Hey Zahin 💕\nI made this just for you 🫵", a: ["Tap to begin 💖"] },
  { q: "Do you know how special you are to me? ✨💫", a: ["I feel it ❤️", "Tell me 🥹"] },
  { q: "What makes us 'us' 🫂?", a: ["Our talks 🌙", "Our bond 💞", "Everything 🥰"] },
  { q: "If I were there right now…🥺", a: ["Hug you 🤗", "Hold you 💕"] },
  {
    q: "No matter what happens,\nwill you stay ♾️?",
    a: ["Always ❤️", "Forever 💍"],
    isFinal: true,
  },
];

let i = 0;
let memory = JSON.parse(localStorage.getItem("memory")) || {};

/* Start music on first interaction */
document.addEventListener(
  "click",
  () => {
    music.volume = 0.35;
    music.play().catch(() => {});
  },
  { once: true }
);

/* Typewriter */
function typeText(content) {
  if (typingInterval) clearInterval(typingInterval);
  text.innerHTML = "";
  const chars = Array.from(content);
  let idx = 0;

  typingInterval = setInterval(() => {
    if (idx >= chars.length) {
      clearInterval(typingInterval);
      typingInterval = null;
      return;
    }
    text.innerHTML += chars[idx] === "\n" ? "<br>" : chars[idx];
    idx++;
  }, 100);
}

/* Heart burst */
function burstHearts(x, y) {
  for (let j = 0; j < 6; j++) {
    const h = document.createElement("span");
    h.innerHTML = "❤️";
    h.style.left = x + "px";
    h.style.top = y + "px";
    hearts.appendChild(h);
    setTimeout(() => h.remove(), 1500);
  }
}

/* Render story step */
function show() {
  options.innerHTML = "";
  typeText(story[i].q);

  progressBar.style.width = `${((i + 1) / story.length) * 100}%`;

  setTimeout(() => {
    story[i].a.forEach((ans) => {
      const btn = document.createElement("button");
      btn.innerText = ans;

      btn.onclick = (e) => {
        memory[`q${i}`] = ans;
        localStorage.setItem("memory", JSON.stringify(memory));
        burstHearts(e.clientX, e.clientY);

        if (story[i].isFinal) {
          progressBar.style.width = "100%";
          options.innerHTML = "";
          secretIcon.style.display = "block";
          finalHint.style.display = "block";
          return;
        }

        i++;
        show();
      };

      options.appendChild(btn);
    });
  }, 600);
}

/* Floating ambient hearts */
setInterval(() => {
  const heart = document.createElement("span");
  heart.innerHTML = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  hearts.appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}, 500);

/* Secret modal logic */
secretIcon.onclick = () => (secretModal.style.display = "flex");
secretModal.onclick = (e) => {
  if (e.target === secretModal) secretModal.style.display = "none";
};

/* FINAL YES SCREEN TRANSITION */
function goToYesScreen() {
  secretModal.style.display = "none";
  card.style.display = "none";

  music.pause();
  music.src = "./forever.mp3";
  music.load();
  music.volume = 0.5;
  music.play().catch(() => {});

  yesScreen.style.display = "flex";
}


yesBtn.onclick = goToYesScreen;
yesYesBtn.onclick = goToYesScreen;

/* Init */
show();
