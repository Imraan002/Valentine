const text = document.getElementById("text");
const options = document.getElementById("options");
const music = document.getElementById("bgMusic");
let typingInterval = null;
const story = [
  {
    q: "Hey Zahin (cutuu) 💕\n\nYour jaan made something just for you",
    a: ["Tap to begin 💖"],
  },
  {
    q: "Zahin, do you know how special you are to me?",
    a: ["I feel it ❤️", "Tell me more 🥹"],
  },
  {
    q: "What do you think make us 'us' ?",
    a: ["Our talks 🌙", "Our understanding 💞", "Everything 🥰"],
  },
  {
    q: "If your jaan were with you right now…",
    a: ["Tight hug 🤗", "Holding hands 💕", "Never letting go 💖"],
  },
  {
    q: "No matter what life brings,\nZahin, will you stay with me?",
    a: ["Always ❤️", "Forever 💍"],
  },
  {
    q: "Happy Valentine’s Day, Zahin 💘\n\nYou are my favorite thought,\nmy safest place,\nand my forever.",
    a: [],
    isFinal: true,
  },
];

let i = 0;

/* 🎵 Music starts on first click (browser-safe) */
document.addEventListener(
  "click",
  () => {
    music.volume = 0.35;
    music.play().catch(() => {});
  },
  { once: true },
);

/* ✨ Typewriter effect (HTML-safe) */
function typeText(content, isFinal = false) {
  // 🔒 Kill any previous typing instantly
  if (typingInterval !== null) {
    clearInterval(typingInterval);
    typingInterval = null;
  }

  text.innerHTML = "";

  // Unicode-safe split
  const chars = Array.from(content);
  let idx = 0;

  typingInterval = setInterval(() => {
    // Extra safety check
    if (idx >= chars.length) {
      clearInterval(typingInterval);
      typingInterval = null;

      if (isFinal) {
        text.innerHTML +=
          "<br><br><span class='signature'>— Your cutu (Imraan) ❤️</span>  Click on the below heart button Jaan";
      }
      return;
    }

    const char = chars[idx];
    text.innerHTML += char === "\n" ? "<br>" : char;
    idx++;
  }, 70);
}

/* ▶ Show story */
function show() {
  options.innerHTML = "";
  typeText(story[i].q, story[i].isFinal);

  // Delay buttons until typing finishes
  const typingTime = Array.from(story[i].q).length * 70 + 200;

  setTimeout(() => {
    story[i].a.forEach((ans) => {
      const btn = document.createElement("button");
      btn.innerText = ans;
      btn.onclick = () => {
        i++;
        show();
      };
      options.appendChild(btn);
    });
  }, typingTime);
}

show();

/* ❤️ Floating hearts animation */
const hearts = document.querySelector(".hearts");

setInterval(() => {
  const heart = document.createElement("span");
  heart.innerHTML = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 4 + Math.random() * 3 + "s";
  hearts.appendChild(heart);
  setTimeout(() => heart.remove(), 7000);
}, 400);

let taps = 0;
document.querySelector(".card").addEventListener("dblclick", () => {
  taps++;
  if (taps === 2) {
    alert(
      "Psst… Zahin, you are the best thing that ever happened to your cutu ❤️",
    );
  }
});

const secretIcon = document.getElementById("secretIcon");
const secretModal = document.getElementById("secretModal");

secretIcon.addEventListener("click", () => {
  secretModal.style.display = "flex";
});

secretModal.addEventListener("click", (e) => {
  if (e.target === secretModal) {
    secretModal.style.display = "none";
  }
});
