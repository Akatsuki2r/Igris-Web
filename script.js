const button = document.getElementById("arise-button");
const welcome = document.getElementById("homepage-container");
const hud = document.getElementById("hud-container"); // Fixed: was missing # in querySelector

// Error handling
if (!button || !welcome || !hud) {
  console.error("Required elements not found");
} else {
  button.addEventListener("click", handleAriseClick);
}

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


const focus_widget = document.getElementById("focus-mode");
const focus_screen = document.getElementById("focus-screen");

// Error handling
if (!focus_widget || !focus_screen || !hud) {
  console.error("Required elements not found");
} else {
  focus_widget.addEventListener("click", handleWidgetClick);
}

function handleWidgetClick() {
  hud.classList.add("fade-out", "hide");

  setTimeout(() => {
    hud.classList.add("hidden");

    const focusContainer = document.getElementById("focus");
    focusContainer.style.display = "block"; // 👈 Show the section

    focus_screen.classList.remove("hidden");
    void focus_screen.offsetWidth;
    focus_screen.classList.add("fade-in");
  }, 800);
}

const back_btn = document.getElementById("back_btn");

back_btn.addEventListener("click", () => {
  focus_screen.classList.add("fade-out", "hide");

  setTimeout(() => {
    focus_screen.classList.add("hidden");
    focus_screen.classList.remove("fade-in");

    const focusContainer = document.getElementById("focus");
    focusContainer.style.display = "none"; // 👈 hide the focus section

    hud.classList.remove("hidden");
    void hud.offsetWidth;
    hud.classList.add("fade-in");
  }, 800);
});
