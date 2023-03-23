const screens = document.querySelectorAll(".screen");
const startBtn = document.querySelector(".start-btn");
const submitBtn = document.querySelector(".submitBtn");
const name = document.getElementById("name");
const age = document.getElementById("age");
const feet = document.getElementById("feet");
const inches = document.getElementById("inches");
const currWeight = document.getElementById("curr-weight");
const goWeight = document.getElementById("go-weight");
const form = document.querySelector("form");
const quad1 = document.querySelector(".quad1");

const getExercise = () => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "uYaI7K4eIHJmAZrReF4A3g==VBhRMCWvNysjX2oH",
      "X-RapidAPI-Host": "exercises-by-api-ninjas.p.rapidapi.com",
    },
  };

  fetch(
    "https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?muscle=biceps",
    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response[0]))
    .catch((err) => console.error(err));
};

startBtn.addEventListener("click", () => screens[0].classList.add("up"));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  screens[1].classList.add("up");
  profileInfo();
  getExercise();
});

const calculateBMI = () => {
  const heightInMeters = feet.value * 0.3048 + inches.value * 0.0254;
  const weightInKg = currWeight.value * 0.453592;
  const bmi = weightInKg / Math.pow(heightInMeters, 2).toFixed(1);

  return bmi;
};

const calorieIntake = () => {
  const calories = currWeight.value * 15 - 500;

  return calories;
};

const profileInfo = () => {
  const profileEl = document.createElement("div");
  profileEl.classList.add("profile-info");

  const profileInnerHtml = `<h1>${
    name.value
  }'s Profile</h1><div class="info"><h2>BMI: ${calculateBMI()}</h2>
    <h2>Calorie Intake: ${calorieIntake()}</h2><h2>Weight: ${
    currWeight.value
  }lbs</h2><h2>Goal Weight: ${goWeight.value}lbs</h2></div>
  `;

  profileEl.innerHTML = profileInnerHtml;
  quad1.appendChild(profileEl);
};
