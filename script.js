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

