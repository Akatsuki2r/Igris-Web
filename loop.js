const button = document.getElementById("start-button");
const welcome = document.getElementById("welcome-screen");
const hud = document.getElementById("hud");

button.addEventListener("click", () => {
  // Fade out welcome screen
  welcome.classList.add("fade-out");

  // Wait 1 second before switching screens
  setTimeout(() => {
    welcome.style.display = "none";
    hud.classList.remove("hidden");
    hud.classList.add("fade-in");
  }, 1000);
});
