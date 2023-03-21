const screens = document.querySelectorAll(".screen");
const startBtn = document.querySelector(".start-btn");

startBtn.addEventListener("click", () => screens[0].classList.add("up"));
