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

// Random Number between 0 -9
const randomNumber = () => {
  let randomNum = Math.floor(Math.random() * 10);
  return randomNum;
};

// Get Exercises based on day of Week
const getExercise = () => {
  const dayOfWeek = 1;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "031f90f2bamsh08f92af0c6fe80cp1d5a1bjsndaa3aea41ea9",
      "X-RapidAPI-Host": "exercises-by-api-ninjas.p.rapidapi.com",
    },
  };

  // Monday - Push day
  if (dayOfWeek === 1) {
    fetch(`${exerciseURL}?muscle=chest`, options)
      .then((response) => response.json())
      .then((json) => {
        const chestExercise = json[randomNumber()];
        fetch(`${exerciseURL}?muscle=triceps`, options)
          .then((response) => response.json())
          .then((json) => {
            const tricepsExercise = json[randomNumber()];
            fetch(`${exerciseURL}?muscle=shoulders`, options)
              .then((response) => response.json())
              .then((json) => {
                const shouldersExercise = json[randomNumber()];
                workoutDay(
                  chestExercise,
                  tricepsExercise,
                  shouldersExercise,
                  dayOfWeek
                );
              });
          });
      });
  }
  // Tuesday - Pull Day
  else if (dayOfWeek === 2) {
    fetch(`${exerciseURL}?muscle=middle_back`, options)
      .then((response) => response.json())
      .then((json) => {
        const middlebackExercise = json[randomNumber()];
        fetch(`${exerciseURL}?muscle=traps`, options)
          .then((response) => response.json())
          .then((json) => {
            const trapsExercise = json[randomNumber()];
            fetch(`${exerciseURL}?muscle=lats`, options)
              .then((response) => response.json())
              .then((json) => {
                const latsExercise = json[randomNumber()];
                workoutDay(
                  middlebackExercise,
                  trapsExercise,
                  latsExercise,
                  dayOfWeek
                );
              });
          });
      });
  }
  // Wednesday - Legs
  else if (dayOfWeek === 3) {
    fetch(`${exerciseURL}?muscle=quadriceps`, options)
      .then((response) => response.json())
      .then((json) => {
        const quadsExercise = json[randomNumber()];
        fetch(`${exerciseURL}?muscle=hamstrings`, options)
          .then((response) => response.json())
          .then((json) => {
            const hamstringsExercise = json[randomNumber()];
            fetch(`${exerciseURL}?muscle=calves`, options)
              .then((response) => response.json())
              .then((json) => {
                const calvesExercise = json[randomNumber()];
                workoutDay(
                  quadsExercise,
                  hamstringsExercise,
                  calvesExercise,
                  dayOfWeek
                );
              });
          });
      });
  }
  // Thursday - Cardio
  else if (dayOfWeek === 4) {
    fetch(`${exerciseURL}?type=cardio`, options)
      .then((response) => response.json())
      .then((json) => {
        const cardio1Exercise = json[randomNumber()];
        fetch(`${exerciseURL}?type=cardio`, options)
          .then((response) => response.json())
          .then((json) => {
            const cardio2Exercise = json[randomNumber()];
            fetch(`${exerciseURL}?type=cardio`, options)
              .then((response) => response.json())
              .then((json) => {
                const cardio3Exercise = json[randomNumber()];
                workoutDay(
                  cardio1Exercise,
                  cardio2Exercise,
                  cardio3Exercise,
                  dayOfWeek
                );
              });
          });
      });
  }
  // Friday - Stretching
  else if (dayOfWeek === 5) {
    fetch(`${exerciseURL}?type=stretching`, options)
      .then((response) => response.json())
      .then((json) => {
        const stretch1Exercise = json[randomNumber()];
        fetch(`${exerciseURL}?type=stretching`, options)
          .then((response) => response.json())
          .then((json) => {
            const stretch2Exercise = json[randomNumber()];
            fetch(`${exerciseURL}?type=stretching`, options)
              .then((response) => response.json())
              .then((json) => {
                const stretch3Exercise = json[randomNumber()];
                workoutDay(
                  stretch1Exercise,
                  stretch2Exercise,
                  stretch3Exercise,
                  dayOfWeek
                );
              });
          });
      });
  }
};

// Display the Workout of the Day
const workoutDay = (exercise1, exercise2, exercise3, dayOfWeek) => {
  const exerciseEl = document.createElement("div");
  exerciseEl.classList.add("exercise-routine");
  console.log();
  const exerciseInnerHtml = `<div class="workout">
            <h3>${
              dayOfWeek === 0
                ? "Rest Day"
                : dayOfWeek === 1
                ? "Push Day"
                : dayOfWeek === 2
                ? "Pull Day"
                : dayOfWeek === 3
                ? "Leg Day"
                : dayOfWeek == 4
                ? "Cardio Day"
                : dayOfWeek === 5
                ? "Stretching Day"
                : dayOfWeek === 6
                ? "Rest Day"
                : ""
            }</h3>
            <div class="workout-table">
            <table>
            <tr>
              <th>Exercise</th>
              <th>Sets</th>
              <th>Reps</th>
            </tr>
            <tr>
              <td>${exercise1.name}</td>
              <td>3</td>
              <td>10</td>
            </tr>
            <tr>
            <td>${exercise2.name}</td>
            <td>3</td>
            <td>10</td>
            </tr>
            <tr>
            <td>${exercise3.name}</td>
            <td>3</td>
            <td>10</td>
            </tr>
          </table> </div>`;

  exerciseEl.innerHTML = exerciseInnerHtml;
  quad3.appendChild(exerciseEl);
};

// add up class to screen class to move the screen up and display a new screen
startBtn.addEventListener("click", () => screens[0].classList.add("up"));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  screens[1].classList.add("up");
  profileInfo();
  getExercise();
});

// BMI = weight(kg) * height(in meters)^2
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

// Display BMI/Calorie Intake/Current Weight/Goal Weight in the Profile Section
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
