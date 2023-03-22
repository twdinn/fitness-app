const screens = document.querySelectorAll(".screen");
const startBtn = document.querySelector(".start-btn");
const submitBtn = document.querySelector(".submitBtn");
const name = document.getElementById("name");
const age = document.getElementById("age");
const height = document.getElementById("height");
const currWeight = document.getElementById("curr-weight");
const goWeight = document.getElementById("go-weight");
const form = document.querySelector("form");

startBtn.addEventListener("click", () => screens[0].classList.add("up"));
form.addEventListener("submit", (e) => {
  e.preventDefault();
  screens[1].classList.add("up");

  console.log(name.value);
});
