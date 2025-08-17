// DOM Elements
const elements = {
  button: document.getElementById("arise-button"),
  welcome: document.getElementById("homepage-container"),
  hud: document.getElementById("hud-container"),
  timeElements: Array.from(document.querySelectorAll('.time')),
  startButton: document.querySelector("#start_btn"),
  focusWidget: document.getElementById("focus-mode"),
  focusScreen: document.getElementById("focus-screen"),
  backButton: document.getElementById("back_btn"),
  dot: document.querySelector('.dot'),
  timerCircle: document.querySelector('.timer-circle'),
  body: document.body
};

// Timer State
const timerState = {
  interval: null,
  activeTimer: 'pomodoro-timer',
  timerIds: ['pomodoro-timer', 'short-timer', 'long-timer'],
  remainingTime: 25 * 60,
  totalTime: 25 * 60,
  preset: 25 * 60
};

// Constants
const TRANSITION_DURATION = 800; // matches CSS transition time

// Error Handling
function checkRequiredElements() {
  const requiredElements = [
    elements.button, elements.welcome, elements.hud,
    elements.focusWidget, elements.focusScreen
  ];
  
  if (requiredElements.some(el => !el)) {
    console.error("Required elements not found");
    return false;
  }
  return true;
}

// Animation Functions
function fadeOut(element) {
  element.classList.add("fade-out", "hide");
}

function fadeIn(element) {
  element.classList.remove("hidden");
  void element.offsetWidth; // Force reflow
  element.classList.add("fade-in");
}

// Screen Transitions
function handleAriseClick() {
  fadeOut(elements.welcome);
  
  setTimeout(() => {
    elements.welcome.classList.add("hidden");
    fadeIn(elements.hud);
  }, TRANSITION_DURATION);
}

function handleWidgetClick() {
  elements.hud.classList.add("hidden");
  document.getElementById("focus").style.display = "block";
  fadeIn(elements.focusScreen);
}

function handleBackClick() {
  elements.focusScreen.classList.add("hidden");
  document.getElementById("focus").style.display = "none";
  fadeIn(elements.hud);
}

// Timer Functions
function setActiveTimer(id) {
  timerState.activeTimer = id;
  timerState.timerIds.forEach(tid => {
    const el = document.getElementById(tid);
    if (el) el.classList.toggle('active', tid === id);
  });
}

function setProgress(angleDeg) {
  elements.dot.style.background = `conic-gradient(#fff ${angleDeg}deg, transparent ${angleDeg}deg)`;
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function updateTimerDisplay() {
  const activeTimerElement = document.querySelector(`#${timerState.activeTimer} .time`);
  if (activeTimerElement) {
    activeTimerElement.textContent = formatTime(timerState.remainingTime);
  }
  
  const progress = timerState.totalTime 
    ? ((timerState.totalTime - timerState.remainingTime) / timerState.totalTime) * 360 
    : 0;
  setProgress(progress);
}

function startTimer() {
  clearInterval(timerState.interval);
  
  if (timerState.remainingTime <= 0) {
    timerState.remainingTime = timerState.preset;
    setProgress(0);
  }
  
  timerState.totalTime = timerState.preset;
  updateTimerDisplay();
  
  timerState.interval = setInterval(() => {
    timerState.remainingTime--;
    if (timerState.remainingTime < 0) {
      clearInterval(timerState.interval);
      timerState.remainingTime = 0;
      updateTimerDisplay();
      setProgress(360);
      alert("Time's up!");
      return;
    }
    updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerState.interval);
}

function skipTimer() {
  clearInterval(timerState.interval);
  timerState.remainingTime = timerState.preset;
  setProgress(0);
  updateTimerDisplay();
}

function prime(durationSec, id) {
  clearInterval(timerState.interval);
  timerState.preset = durationSec;
  timerState.remainingTime = durationSec;
  timerState.totalTime = durationSec;
  setActiveTimer(id);
  updateTimerDisplay();
}

// Mode Functions
function setMode(mode) {
  const modes = ["pomodoro", "short-break", "long-break"];
  
  modes.forEach(m => {
    elements.body.classList.remove(m);
    elements.timerCircle.classList.remove(m);
  });
  
  if (modes.includes(mode)) {
    elements.body.classList.add(mode);
    elements.timerCircle.classList.add(mode);
    playSound(mode);
  }
}

function playSound(mode) {
  const sounds = {
    "pomodoro": "sounds/pomodoro.mp3",
    "short-break": "sounds/short-break.mp3",
    "long-break": "sounds/long-break.mp3"
  };
  
  if (sounds[mode]) {
    new Audio(sounds[mode]).play();
  }
}

// Event Listeners
function initializeEventListeners() {
  if (!checkRequiredElements()) return;
  
  elements.button.addEventListener("click", handleAriseClick);
  elements.focusWidget.addEventListener("click", handleWidgetClick);
  elements.backButton.addEventListener("click", handleBackClick);
  
  // Timer controls
  document.getElementById('pomodoro-session').addEventListener('click', () => {
    prime(25 * 60, 'pomodoro-timer');
    setMode("pomodoro");
  });
  document.getElementById('short-break').addEventListener('click', () => {
    prime(5 * 60, 'short-timer');
    setMode("short-break");
  });
  document.getElementById('long-break').addEventListener('click', () => {
    prime(10 * 60, 'long-timer');
    setMode("long-break");
  });
  
  elements.startButton.addEventListener('click', startTimer);
  document.getElementById('stop_btn').addEventListener('click', stopTimer);
  document.getElementById('skip_btn').addEventListener('click', skipTimer);
}

// Initialize
window.addEventListener('load', () => {
  initializeEventListeners();
  timerState.timerIds.forEach(id => document.getElementById(id)?.classList.remove('active'));
  prime(25 * 60, 'pomodoro-timer');
  setMode("pomodoro");
});