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
const quad3 = document.querySelector(".quad3");

const exerciseURL =
  "https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises";

const randomNumber = () => {
  let randomNum = Math.floor(Math.random() * 10);
  return randomNum;
};

// const dayOfWeek = new Date().getDay();
// let muscles = [];
// switch (dayOfWeek) {
//   case 1: // Monday
//     muscles = ["chest", "triceps", "shoulders"];
//     break;
//   case 2: // Tuesday
//     muscles = ["lower_back", "middle_back", "biceps", "lats", "traps"];
//     break;
//   case 3: // Wednesday
//     muscles = ["quadriceps", "calves", "glutes", "hamstrings"];
//     break;
//   // add more cases for other days of the week
// }

const getExercise = () => {
  //   const muscle = [Math.floor(Math.random() * muscles.length)];
  const muscle = "chest";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "031f90f2bamsh08f92af0c6fe80cp1d5a1bjsndaa3aea41ea9",
      "X-RapidAPI-Host": "exercises-by-api-ninjas.p.rapidapi.com",
    },
  };

  fetch(`${exerciseURL}?muscle=${muscle}`, options)
    .then((response) => response.json())
    .then((json) => {
      const exercise = json[randomNumber()];
      workoutDay(exercise);
      console.log(exercise.name);
    });
};

const workoutDay = (exercise) => {
  const exerciseEl = document.createElement("div");
  exerciseEl.classList.add("exercise-routine");

  const exerciseInnerHtml = `<div class="workout">
          <h3>Push Day</h3>
          <div class="workout-table">
          <table>
          <tr>
            <th>Exercise</th>
            <th>Sets</th>
            <th>Reps</th>
          </tr>
          <tr>
            <td>${exercise.name}</td>
            <td>3</td>
            <td>10</td>
          </tr>
          <tr>
          <td>${exercise.name}</td>
          <td>3</td>
          <td>10</td>
          </tr>
          <tr>
          <td>${exercise.name}</td>
          <td>3</td>
          <td>10</td>
          </tr>
        </table> </div>`;

  exerciseEl.innerHTML = exerciseInnerHtml;
  quad3.appendChild(exerciseEl);
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

  const profileInnerHtml = `<h2>${
    name.value
  }'s Profile</h2><div class="info"><h3>BMI: ${calculateBMI()}</h3>
    <h3>Calorie Intake: ${calorieIntake()}</h3><h3>Weight: ${
    currWeight.value
  }lbs</h3><h3>Goal Weight: ${goWeight.value}lbs</h3></div>
  `;

  profileEl.innerHTML = profileInnerHtml;
  quad1.appendChild(profileEl);
};
