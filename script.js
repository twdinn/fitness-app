// Fitness App
// By: Tyler Dinn

const usersName = document.getElementById("name");

// const email = document.getElementById("signup-email").value;

// const password = document.getElementById("signup-password").value;

// const confirmPass = document.getElementById("con-password").value;
const age = document.getElementById("age");

const feet = document.getElementById("feet");

const inches = document.getElementById("inches");

const currWeight = document.getElementById("curr-weight");

const goWeight = document.getElementById("go-weight");
const profileAge = document.getElementById("profile-age");

// const continBtn = document.getElementById("contin-btn");
const createBtn = document.getElementById("create-btn");
const profileContainer = document.querySelector(".profile-container");
const form = document.getElementById("sign-form");

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
  const name = localStorage.getItem("Name");
  const age = localStorage.getItem("Age");
  const height = localStorage.getItem("Height");
  const weight = localStorage.getItem("Weight");
  const goal = localStorage.getItem("Goal Weight");

  console.log(name);
  console.log(age);
  console.log(height);
  console.log(weight);
  console.log(goal);

  // document.querySelector("#profile-name").textContent = name;
  // document.querySelector("#profile-age").textContent = age;
  // document.querySelector("#profile-height").textContent = height;
  // document.querySelector("#profile-weight").textContent = weight;
  // document.querySelector("#profile-goal").textContent = goal;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  localStorage.setItem("Name", usersName.value);
  localStorage.setItem("Age", age.value);
  localStorage.setItem("Height", `${feet.value} ft ${inches.value} in`);
  localStorage.setItem("Weight", currWeight.value);
  localStorage.setItem("Goal Weight", goWeight.value);

  window.location.href = "http://127.0.0.1:5500/profile.html";

  profileInfo();
});
