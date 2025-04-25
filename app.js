const gameBox = document.getElementById("game-box");
const message = document.getElementById("message");
const result = document.getElementById("result");
const thumbsupImg = document.getElementById("thumbsup");

let startTime, timeoutId;
let gameState = "idle";

const ranks = [
  { maxTime: 100, rank: "🌟 Super Sonic" },
  { maxTime: 150, rank: "⚡ Sonic" },
  { maxTime: 200, rank: "💪 Knuckles" },
  { maxTime: 300, rank: "✈️ Tails" },
  { maxTime: Infinity, rank: "😴 Big the Cat" }
];

function startRound() {
  gameBox.className = "waiting";
  message.textContent = 'Wait for "GO!" then click!';
  result.textContent = "";
  gameState = "waiting";
  thumbsupImg.style.display = "none";

  const randomDelay = Math.floor(Math.random() * 3000) + 2000;
  timeoutId = setTimeout(() => {
    gameBox.className = "ready";
    message.textContent = "GO!";
    startTime = Date.now();
    gameState = "ready";
  }, randomDelay);
}

gameBox.addEventListener("click", () => {
  if (gameState === "idle") {
    startRound();
  } else if (gameState === "waiting") {
    clearTimeout(timeoutId);
    gameBox.className = "early";
    message.textContent = "Too soon! 🛑 Wait for GO!";
    result.textContent = "Penalty: Try again.";
    gameState = "idle";
    thumbsupImg.style.display = "none";
  } else if (gameState === "ready") {
    const reactionTime = Date.now() - startTime;
    const rank = ranks.find(r => reactionTime <= r.maxTime);
    message.textContent = `Your time: ${reactionTime} ms`;
    result.textContent = `🏁 Rank: ${rank.rank}`;
    gameBox.className = "idle";
    gameState = "idle";
    thumbsupImg.style.display = "inline";
  }
});
