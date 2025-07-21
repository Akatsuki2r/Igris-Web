const button = document.getElementById("arise-button")
const welcome = document.getElementById("homepage-container")
const hud = document.getElementById("hud-container")

button.addEventListener("click", () => {
    welcome.classList.add("fade-out");

    // Wait 1 second before switching screens
    setTimeout(() => {
        welcome.style.display = "none";
        hud.classList.remove("hidden");
        hud.classList.add("fade-in");
  }, 1000);
})