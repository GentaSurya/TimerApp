let timerDisplaySec = document.querySelector(".js-timer-sec");
let timerDisplayMin = document.querySelector(".js-timer-min");
let timesUp = document.querySelector(".times-up");

const startButton = document.querySelector(".js-button-start");
const resetButton = document.querySelector(".js-button-reset");
const addMin = document.querySelector(".add-min");
const removeMin = document.querySelector(".remove-min");
const paraf = document.querySelector(".paraf");

let closeBtn = "";
let intervalId;
let audio = "";
let seconds = 60;
let minutes = 0;

startButton.addEventListener("click", () => {
  if (startButton.innerHTML === "Start" && minutes > 0) {
    clearInterval(intervalId);
    intervalId = setInterval(countMin, 1000);
    addMin.innerHTML = "⏱";
    removeMin.innerHTML = "⏱";
    paraf.innerHTML = "(Count Down)";
    startButton.innerHTML = "Pause";
  } else if (startButton.innerHTML === "Pause") {
    clearInterval(intervalId);
    startButton.innerHTML = "Start";
  }
});

addMin.addEventListener("click", () => {
  if (addMin.innerHTML === "+") {
    minutes++;
    timerDisplayMin.innerHTML = minutes;
  }
});

removeMin.addEventListener("click", () => {
  if (minutes > 0 && removeMin.innerHTML === "-") {
    minutes--;
    timerDisplayMin.innerHTML = minutes;
  }
});

resetButton.addEventListener("click", () => {
  clearInterval(intervalId);
  addMin.innerHTML = "+";
  removeMin.innerHTML = "-";
  timerDisplayMin.innerHTML = "0";
  timerDisplaySec.innerHTML = "00";
  startButton.innerHTML = "Start";
  paraf.innerHTML = "(Set Minute)";
  minutes = 0;
  seconds = 60;
});

function playAudio() {
  audio = new Audio("audio/ringtone.mp3");
  audio.play();
}

function alertDisplay() {
  const displayAlert = `<div class="times-alert">
  <p class="p-alert">Timer Done</P>
  <button class="close-btn close">Close</button>
  </div>
  `;
  timesUp.innerHTML = displayAlert;
  playAudio();

  closeBtn = document.querySelector(".close-btn");
  closeBtn.addEventListener("click", () => {
    timesUp.innerHTML = "";
    audio.pause();
  });
}

function timeUp() {
  if (timerDisplayMin.innerHTML === "0" && timerDisplaySec.innerHTML === "00") {
    alertDisplay();
    addMin.innerHTML = "+";
    removeMin.innerHTML = "-";
    clearInterval(intervalId);
    startButton.innerHTML = "Start";
    minutes = 0;
    seconds = 60;
  }
}

function countMin() {
  if (minutes >= 0) {
    timerDisplayMin.innerHTML = minutes - 1;
  }
  if (seconds > 0) {
    countSec();
  }
  if (timerDisplaySec.innerHTML === "00") {
    seconds += 60;
    minutes -= 1;
    timerDisplayMin.innerHTML = minutes;
  }

  timeUp();
}

function countSec() {
  if (seconds <= 60 && seconds > 0 && minutes > 0) {
    seconds--;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  timerDisplaySec.innerHTML = seconds;
}
