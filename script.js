// Fitness App
// By: Tyler Dinn

const startBtn = document.getElementById("start-btn");

const startPage = document.getElementById("start-page");
const signupPage = document.getElementById("signup-page");
const profilePage = document.getElementById("profile-page");
const workoutPage = document.getElementById("workout-page");
const foodPage = document.getElementById("food-page");

const profileLink = document.getElementById("profile-nav-link");
const workoutLink = document.getElementById("workout-nav-link");
const foodLink = document.getElementById("food-nav-link");

const createBtn = document.getElementById("create-btn");
const usersName = document.getElementById("name");
const age = document.getElementById("age");
const feet = document.getElementById("feet");
const inches = document.getElementById("inches");
const currWeight = document.getElementById("curr-weight");
const goWeight = document.getElementById("go-weight");
const form = document.getElementById("sign-form");

// ------------  Start Page ------------
startBtn.addEventListener("click", () => {
  startPage.classList.add("hidden");
  foodPage.classList.remove("hidden");
});

// ------------  Profile Page ------------

const feetToMeters = 0.3048;
const inchesToMeters = 0.0254;
const poundsToKg = 0.453592;

// BMI = weight(kg) * height(in meters)^2
const calculateBMI = () => {
  const heightInMeters =
    feet.value * feetToMeters + inches.value * inchesToMeters;
  const weightInKg = currWeight.value * poundsToKg;
  const bmi = (weightInKg / Math.pow(heightInMeters, 2)).toFixed(1);

  return bmi;
};

const calorieIntake = () => {
  const calories = currWeight.value * 15 - 500;

  return calories;
};

// Display Name, Age, Height, BMI/Calorie Intake/Current Weight/Goal Weight in the Profile Section
const profileInfo = () => {
  const bmi = calculateBMI();
  const calories = calorieIntake();

  const profileName = document.getElementById("profile-name");
  const profileAge = document.getElementById("profile-age");
  const profileHeight = document.getElementById("profile-height");
  const profileWeight = document.getElementById("profile-weight");
  const profileGoal = document.getElementById("profile-goal");
  const profileBMI = document.getElementById("bmi");
  const profileCalories = document.getElementById("cal-intake");

  const Name = localStorage.getItem("Name");

  profileName.innerHTML = `${Name}'s Profile`;
  profileAge.innerHTML = localStorage.getItem("Age");
  profileHeight.innerHTML = localStorage.getItem("Height");
  profileWeight.innerHTML = localStorage.getItem("Weight");
  profileGoal.innerHTML = localStorage.getItem("Goal Weight");
  profileBMI.innerHTML = bmi;
  profileCalories.innerHTML = calories;

  signupPage.classList.add("hidden");
  profilePage.classList.remove("hidden");
};

// Save User Info to Local Storage and Redirect to Profile page and call profileInfo function
form.addEventListener("submit", (e) => {
  e.preventDefault();

  localStorage.setItem("Name", usersName.value);
  localStorage.setItem("Age", age.value);
  localStorage.setItem("Height", feet.value + " ft. " + inches.value + " in.");
  localStorage.setItem("Weight", currWeight.value + " lbs.");
  localStorage.setItem("Goal Weight", goWeight.value + " lbs.");

  profileInfo();
});

createBtn.addEventListener("click", () => {
  profilePage.classList.add("hidden");
  signupPage.classList.remove("hidden");
});

// Add event listener to the document instead of individual nav links
document.addEventListener("click", function (event) {
  // Check if the clicked element is a nav link
  if (
    event.target.matches("#profile-nav-link, #workout-nav-link, #food-nav-link")
  ) {
    // Get the ID of the section to show
    var sectionId = event.target.getAttribute("href");

    // Remove hidden class from the target section
    document.querySelector(sectionId).classList.remove("hidden");

    // Add hidden class to the other sections
    var sections = document.querySelectorAll("section:not(" + sectionId + ")");
    sections.forEach(function (section) {
      section.classList.add("hidden");
    });

    // Prevent default link behavior
    event.preventDefault();
  }
});

// ------------  Workout Page ------------
const randomNumber = (data) => {
  let randomNum = Math.floor(Math.random() * data.length);
  return randomNum;
};

const exerciseURL =
  "https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises";

class Exercise {
  constructor(muscle, sets, reps) {
    this.muscle = muscle;
    this.sets = sets;
    this.reps = reps;
  }

  getExerciseByMuscle = async () => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "031f90f2bamsh08f92af0c6fe80cp1d5a1bjsndaa3aea41ea9",
        "X-RapidAPI-Host": "exercises-by-api-ninjas.p.rapidapi.com",
      },
    };
    try {
      const response = await fetch(
        `${exerciseURL}?muscle=${this.muscle}`,
        options
      );
      const data = await response.json();
      const exercise = data[randomNumber(data)];
      return { name: exercise.name, sets: this.sets, reps: this.reps };
    } catch (error) {
      console.error("An Error Occurred with the Fetch Request");
    }
  };

  getExerciseByType = async () => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "031f90f2bamsh08f92af0c6fe80cp1d5a1bjsndaa3aea41ea9",
        "X-RapidAPI-Host": "exercises-by-api-ninjas.p.rapidapi.com",
      },
    };
    try {
      const response = await fetch(
        `${exerciseURL}?type=${this.muscle}`,
        options
      );
      const data = await response.json();
      const exercise = data[randomNumber(data)];
      return { name: exercise.name, sets: this.sets, reps: this.reps };
    } catch (error) {
      console.error("An Error Occurred with the Fetch Request");
    }
  };
}

const pushDay = () => {
  return [
    new Exercise("chest", 3, 8),
    new Exercise("triceps", 3, 12),
    new Exercise("shoulders", 3, 12),
  ];
};

const pullDay = () => {
  return [
    new Exercise("lower_back", 3, 8),
    new Exercise("traps", 3, 8),
    new Exercise("biceps", 3, 12),
  ];
};

const legDay = () => {
  return [
    new Exercise("quadriceps", 3, 8),
    new Exercise("hamstrings", 3, 8),
    new Exercise("calves", 3, 12),
  ];
};

const cardioDay = () => {
  return [
    new Exercise("cardio", 3, 8),
    new Exercise("cardio", 3, 8),
    new Exercise("cardio", 3, 12),
  ];
};

const stretchingDay = () => {
  return [
    new Exercise("stretching", 3, 8),
    new Exercise("stretching", 3, 8),
    new Exercise("stretching", 3, 12),
  ];
};

const exerciseDay = async () => {
  const dayOfWeek = 1;
  let title;
  let promises = [];

  if (dayOfWeek === 0 || dayOfWeek === 6) {
    title = "Rest Day";
    return Promise.resolve({ title });
  } else if (dayOfWeek === 1) {
    title = "Push Day";
    promises = pushDay();
  } else if (dayOfWeek === 2) {
    title = "Pull Day";
    promises = pullDay();
  } else if (dayOfWeek === 3) {
    title = "Leg Day";
    promises = legDay();
  } else if (dayOfWeek === 4) {
    title = "Cardio Day";
    promises = cardioDay();
  } else if (dayOfWeek === 5) {
    title = "Stretching Day";
    promises = stretchingDay();
  } else {
    console.error(error);
  }

  return Promise.all(promises).then((exercises) => {
    if (dayOfWeek === 4 || dayOfWeek === 5) {
      return Promise.resolve({
        exercise1: exercises[0].getExerciseByType(),
        exercise2: exercises[1].getExerciseByType(),
        exercise3: exercises[2].getExerciseByType(),
        title,
      });
    } else {
      return Promise.resolve({
        exercise1: exercises[0].getExerciseByMuscle(),
        exercise2: exercises[1].getExerciseByMuscle(),
        exercise3: exercises[2].getExerciseByMuscle(),
        title,
      });
    }
  });
};

const displayWorkout = async () => {
  const workoutDay = document.getElementById("workout-day");
  const exercise1Name = document.getElementById("exercise1-name");
  const exercise1Sets = document.getElementById("exercise1-sets");
  const exercise1Reps = document.getElementById("exercise1-reps");
  const exercise2Name = document.getElementById("exercise2-name");
  const exercise2Sets = document.getElementById("exercise2-sets");
  const exercise2Reps = document.getElementById("exercise2-reps");
  const exercise3Name = document.getElementById("exercise3-name");
  const exercise3Sets = document.getElementById("exercise3-sets");
  const exercise3Reps = document.getElementById("exercise3-reps");

  try {
    const results = await exerciseDay();
    workoutDay.innerHTML = results.title;
    if (
      results.exercise1 === undefined ||
      results.exercise2 === undefined ||
      results.exercise3 === undefined
    ) {
      return null;
    } else {
      exercise1Name.innerHTML = await results.exercise1.then((res) => res.name);
      exercise1Sets.innerHTML = await results.exercise1.then((res) => res.sets);
      exercise1Reps.innerHTML = await results.exercise1.then((res) => res.reps);
      exercise2Name.innerHTML = await results.exercise2.then((res) => res.name);
      exercise2Sets.innerHTML = await results.exercise2.then((res) => res.sets);
      exercise2Reps.innerHTML = await results.exercise2.then((res) => res.reps);
      exercise3Name.innerHTML = await results.exercise3.then((res) => res.name);
      exercise3Sets.innerHTML = await results.exercise3.then((res) => res.sets);
      exercise3Reps.innerHTML = await results.exercise3.then((res) => res.reps);
    }
  } catch (error) {
    console.error(error);
  }
};

displayWorkout();

// ------------  Food Page ------------

const foodURL = "https://api.npoint.io/4139ad030354aa30cda7";

const getFood = async () => {
  const response = await fetch(foodURL);
  const data = await response.json();
  return data;
};
console.log(getFood());
