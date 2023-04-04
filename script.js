// Fitness App
// By: Tyler Dinn

import Workout from "./workout";

const screens = document.querySelectorAll(".screen");
const startBtn = document.querySelector(".start-btn");
const submitBtn = document.querySelector(".submitBtn");

const usersName = document.getElementById("name");
const age = document.getElementById("age");
const feet = document.getElementById("feet");
const inches = document.getElementById("inches");
const currWeight = document.getElementById("curr-weight");
const goWeight = document.getElementById("go-weight");

const form = document.querySelector("form");
const quad1 = document.querySelector(".quad1");
const quad3 = document.querySelector(".quad3");
const quad4 = document.querySelector(".quad4");

const exerciseRadios = document.querySelectorAll('input[name="exercise"]');
const search = document.getElementById("search");
const foodBtn = document.querySelector(".foodBtn");

console.log(search.value);

const getFood = () => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "031f90f2bamsh08f92af0c6fe80cp1d5a1bjsndaa3aea41ea9",
      "X-RapidAPI-Host": "nutritionix-api.p.rapidapi.com",
    },
  };

  fetch(
    `https://nutritionix-api.p.rapidapi.com/v1_1/search/${search.value}?fields=item_name%2Cnf_calories`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      quad4.innerHTML = `${response.hits[1].fields.item_name} - ${response.hits[1].fields.nf_calories} Cal`;

      console.log(response);
    })
    .catch((err) => console.error(err));
};

const exerciseURL =
  "https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises";

// Random Number between 0 -9
// const randomNumber = () => {
//   let randomNum = Math.floor(Math.random() * 10);
//   return randomNum;
// };

// Get Exercises based on day of Week
const getExercise = async () => {
  //   let selectedExercise;

  //   exerciseRadios.forEach((radio) => {
  //     if (radio.checked) {
  //       selectedExercise = radio.value;
  //     }
  //   });
  //   if (selectedExercise === "Body Weight") {
  //     typeURL = "?type=plyometrics";
  //   }
  //   else if (selectedExercise === "Weight Training") {
  //       typeURL =

  //   }

  try {
    const dayOfWeek = new Date().getDay();

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "031f90f2bamsh08f92af0c6fe80cp1d5a1bjsndaa3aea41ea9",
        "X-RapidAPI-Host": "exercises-by-api-ninjas.p.rapidapi.com",
      },
    };

    // Monday - Push day
    if (dayOfWeek === 1) {
      const chestRsp = await fetch(`${exerciseURL}?muscle=chest`, options);
      const chestJson = await chestRsp.json();
      const chestExercise = chestJson[randomNumber()];

      const tricepsRsp = await fetch(`${exerciseURL}?muscle=triceps`, options);
      const tricepsJson = await tricepsRsp.json();
      const tricepsExercise = tricepsJson[randomNumber()];

      const shouldersRsp = await fetch(
        `${exerciseURL}?muscle=shoulders`,
        options
      );
      const shouldersJson = await shouldersRsp.json();
      const shouldersExercise = shouldersJson[randomNumber()];

      workoutDay(chestExercise, tricepsExercise, shouldersExercise, dayOfWeek);
    }
    // Tuesday - Pull Day
    else if (dayOfWeek === 2) {
      const middleBackRsp = await fetch(
        `${exerciseURL}?muscle=middle_back`,
        options
      );
      const middleBackJson = await middleBackRsp.json();
      const middlebackExercise = middleBackJson[randomNumber()];

      const trapsRsp = await fetch(`${exerciseURL}?muscle=traps`, options);
      const trapsJson = await trapsRsp.json();
      const trapsExercise = trapsJson[randomNumber()];

      const latsRsp = await fetch(`${exerciseURL}?muscle=lats`, options);
      const latsJson = await latsRsp.json();
      const latsExercise = latsJson[randomNumber()];

      workoutDay(middlebackExercise, trapsExercise, latsExercise, dayOfWeek);
    }
    // Wednesday - Legs
    else if (dayOfWeek === 3) {
      const quadsRsp = await fetch(`${exerciseURL}?muscle=quadriceps`, options);
      const quadsJson = await quadsRsp.json();
      const quadsExercise = quadsJson[randomNumber()];

      const hamsRsp = await fetch(`${exerciseURL}?muscle=hamstrings`, options);
      const hamsJson = await hamsRsp.json();
      const hamstringsExercise = hamsJson[randomNumber()];

      const calvesRsp = await fetch(`${exerciseURL}?muscle=calves`, options);
      const calvesJson = await calvesRsp.json();
      const calvesExercise = calvesJson[randomNumber()];

      workoutDay(quadsExercise, hamstringsExercise, calvesExercise, dayOfWeek);
    }
    // Thursday - Cardio
    else if (dayOfWeek === 4) {
      const cardioRsp1 = await fetch(`${exerciseURL}?type=cardio`, options);
      const cardio1Json = await cardioRsp1.json();
      const cardio1Exercise = cardio1Json[randomNumber()];

      const cardioRsp2 = await fetch(`${exerciseURL}?type=cardio`, options);
      const cardio2Json = await cardioRsp2.json();
      const cardio2Exercise = cardio2Json[randomNumber()];

      const cardioRsp3 = await fetch(`${exerciseURL}?type=cardio`, options);
      const cardio3Json = await cardioRsp3.json();
      const cardio3Exercise = cardio3Json[randomNumber()];

      workoutDay(cardio1Exercise, cardio2Exercise, cardio3Exercise, dayOfWeek);
    }

    // Friday - Stretching
    if (dayOfWeek === 5) {
      const response1 = await fetch(`${exerciseURL}?type=stretching`, options);
      const json1 = await response1.json();
      const stretch1Exercise = json1[randomNumber()];

      const response2 = await fetch(`${exerciseURL}?type=stretching`, options);
      const json2 = await response2.json();
      const stretch2Exercise = json2[randomNumber()];

      const response3 = await fetch(`${exerciseURL}?type=stretching`, options);
      const json3 = await response3.json();
      const stretch3Exercise = json3[randomNumber()];

      workoutDay(
        stretch1Exercise,
        stretch2Exercise,
        stretch3Exercise,
        dayOfWeek
      );
    }
  } catch (error) {
    throw new Error("Error");
  }
};

// Display the Workout of the Day
// FIX!! REST DAY NOT DISPLAYING
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
    usersName.value
  }'s Profile</h2><div class="info"><h3>BMI: ${calculateBMI()}</h3>
    <h3>Calorie Intake: ${calorieIntake()}</h3><h3>Weight: ${
    currWeight.value
  }lbs</h3><h3>Goal Weight: ${goWeight.value}lbs</h3></div>
  `;

  profileEl.innerHTML = profileInnerHtml;
  quad1.appendChild(profileEl);
};

// add up class to screen class to move the screen up and display a new screen
startBtn.addEventListener("click", () => screens[0].classList.add("up"));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // Move screen up again
  screens[1].classList.add("up");
  profileInfo();
  getExercise();
});

foodBtn.addEventListener("click", (e) => {
  getFood();
  console.log(search.value);
});
