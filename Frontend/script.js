const button = document.getElementById("arise-button");
const welcome = document.getElementById("homepage-container");
const hud = document.getElementById("hud-container"); // Fixed: was missing # in querySelector
const time =  Array.from(document.querySelectorAll('.time'))
const start =  document.querySelector("#start_btn")
// Error handling

console.log(time);
if (!button || !welcome || !hud) {
  console.error("Required elements not found");
} else {
  button.addEventListener("click", handleAriseClick);
}
// Arise to hud logic

function handleAriseClick() {
  // Step 1: Trigger fade-out animation
  welcome.classList.add("fade-out", "hide");

  // Step 2: Wait for fade to finish
  setTimeout(() => {
    // Fully hide the welcome screen
    welcome.classList.add("hidden");

    // Make HUD visible
    hud.classList.remove("hidden");
    // Force a reflow to restart animation
    void hud.offsetWidth;
    // Trigger fade-in animation
    hud.classList.add("fade-in");
  }, 800); // matches CSS transition time
}

//

const focus_widget = document.getElementById("focus-mode");
const focus_screen = document.getElementById("focus-screen");
const back_btn = document.getElementById("back_btn")
// Error handling
if (!focus_widget || !focus_screen || !hud) {
  console.error("Required elements not found");
} else {
  focus_widget.addEventListener("click", handleWidgetClick);
}

// When clicking the widget
function handleWidgetClick() {
  hud.classList.add("hidden");

  const focusContainer = document.getElementById("focus");
  focusContainer.style.display = "block";
  focus_screen.classList.remove("hidden");
}

// When clicking the back button
back_btn.addEventListener("click", () => {
  focus_screen.classList.add("hidden");

  const focusContainer = document.getElementById("focus");
  focusContainer.style.display = "none";

  hud.classList.remove("hidden");
});
;



// ----- Progress + countdown state -----
let countdown = null;
let totalTime = 0;
let remainingTime = 0;
let preset = 25 * 60; // default mode
let activeId = 'pomodoro-timer';
let timeEl = null;

const dot = document.querySelector('.dot');
const timerIds = ['pomodoro-timer', 'short-timer', 'long-timer'];

// ----- helpers -----
function setActiveTimer(id) {
  activeId = id;
  timerIds.forEach(tid => {
    const el = document.getElementById(tid);
    if (!el) return;
    el.classList.toggle('active', tid === id);
  });
  timeEl = document.querySelector(`#${id} .time`);
}

function setProgress(angleDeg) {
  dot.style.background = `conic-gradient( ${angleDeg}deg, transparent ${angleDeg}deg)`;
}

function formatAndShow() {
  const m = Math.floor(remainingTime / 60);
  const s = remainingTime % 60;
  if (timeEl) timeEl.textContent = `${m}:${s.toString().padStart(2, '0')}`;

  const progress = totalTime ? ((totalTime - remainingTime) / totalTime) * 360 : 0;
  setProgress(progress);
}

// Prepare a mode without starting it
function prime(durationSec, id) {
  clearInterval(countdown);
  preset = durationSec;
  totalTime = durationSec;
  remainingTime = durationSec;
  setActiveTimer(id);
  formatAndShow();
  if (durationSec === 0) setProgress(0);
}

function startTimer(durationSec = preset) {
  clearInterval(countdown);
  totalTime = durationSec;

  // If we were paused, continue from remainingTime; otherwise start fresh
  if (remainingTime <= 0 || remainingTime > durationSec) {
    remainingTime = durationSec;
  }
  formatAndShow();

  countdown = setInterval(() => {
    remainingTime--;
    if (remainingTime < 0) {
      clearInterval(countdown);
      remainingTime = 0;
      formatAndShow();
      alert("Time’s up!");
      return;
    }
    formatAndShow();
  }, 1000);
}

// ----- wire up mode buttons -----
document.getElementById('pomodoro-session').addEventListener('click', () => {
  prime(25 * 60, 'pomodoro-timer');  // show 25:00, not running
});
document.getElementById('short-break').addEventListener('click', () => {
  prime(5 * 60, 'short-timer');      // show 05:00, not running
});
document.getElementById('long-break').addEventListener('click', () => {
  prime(10 * 60, 'long-timer');      // show 10:00, not running
});

// ----- control buttons -----
document.getElementById('start_btn').addEventListener('click', () => startTimer());
document.getElementById('stop_btn').addEventListener('click', () => clearInterval(countdown)); // pause
document.getElementById('skip_btn').addEventListener('click', () => {
  clearInterval(countdown);
  remainingTime = 0;
  formatAndShow();
});

// ----- init -----
window.addEventListener('load', () => {
  // Hide all, show pomodoro as the active one with 25:00
  timerIds.forEach(id => document.getElementById(id).classList.remove('active'));
  prime(25 * 60, 'pomodoro-timer');
});
