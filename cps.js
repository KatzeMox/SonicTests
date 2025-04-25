let timeLimit = 0;
let clicks = 0;
let timer;
let timeLeft = 0;
let started = false;

const cpsBox = document.getElementById("cps-box");
const result = document.getElementById("cps-result");
const instruction = document.getElementById("cps-instruction");
const restartBtn = document.getElementById("cps-restart");

function selectTime(seconds) {
  timeLimit = seconds;
  timeLeft = seconds;
  clicks = 0;
  started = false;
  result.textContent = "";
  cpsBox.className = "cps-idle";
  instruction.textContent = `Timer set: ${seconds} seconds. Click here to start!`;
  restartBtn.style.display = "none";
}

function handleClick() {
  if (!timeLimit) {
    instruction.textContent = "Select a time first!";
    return;
  }

  if (!started) {
    started = true;
    cpsBox.className = "cps-active";
    instruction.textContent = `Go! Time left: ${timeLeft}s`;
    timer = setInterval(updateTimer, 1000);
  }

  if (started && timeLeft > 0) {
    clicks++;
    result.textContent = `Clicks: ${clicks}`;
  }
}

function updateTimer() {
  timeLeft--;
  if (timeLeft > 0) {
    instruction.textContent = `Time left: ${timeLeft}s`;
  } else {
    clearInterval(timer);
    cpsBox.className = "cps-done";
    instruction.textContent = `Time's up!`;
    const cps = (clicks / timeLimit).toFixed(2);
    result.textContent = `Your CPS: ${cps}`;
    restartBtn.style.display = "inline-block";
  }
}

function resetCPS() {
  timeLimit = 0;
  clicks = 0;
  started = false;
  result.textContent = "";
  instruction.textContent = "Select time above, then click here to begin!";
  cpsBox.className = "cps-idle";
  restartBtn.style.display = "none";
}
