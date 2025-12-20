const GreetingText = document.getElementById("Greeting-text");
const SubmitButton1 = document.getElementById("input1-submit-button")
const Input1Container = document.querySelector(".input1-container");
const Container1 = document.getElementById("container1")
const IgrisContainer = document.getElementById("igris-output-container")
const IgrisReply = document.querySelector("#igris-output")
const igrisLines = [
  "Focus sharpened. Time is under control.",
  "Another cycle begins. Execute.",
  "Distractions detected. Prioritize.",
  "You are behind schedule. Adjust now.",
  "System stable. Continue forward.",
  "Momentum matters more than motivation.",
  "Triple T is proud gng",
];


const randomIndex = Math.floor(Math.random() * igrisLines.length);
GreetingText.textContent = igrisLines[randomIndex];



SubmitButton1.addEventListener("click", () => {

        
    GreetingText.style.opacity = "0"; 

    setTimeout(() => {
        GreetingText.style.display = "none";
    }, 400);
    IgrisContainer.classList.remove('hidden')
    Container1.classList.add('afterclick-state');
    IgrisContainer.classList.add('igris-afterclick');


});
