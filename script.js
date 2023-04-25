// Fitness App
// By: Tyler Dinn

const startPage = document.getElementById("start-page");
const signupPage = document.getElementById("signup-page");
const profilePage = document.getElementById("profile-page");
const workoutPage = document.getElementById("workout-page");
const foodPage = document.getElementById("food-page");
const instrucPage = document.getElementById("instruc-page");

// ------------  Start Page ------------
const startBtn = document.getElementById("start-btn");

startBtn.addEventListener("click", () => {
  startPage.classList.add("hidden");
  signupPage.classList.remove("hidden");
});

// ------------  Navbar ------------------

const profileLink = document.getElementById("profile-nav-link");
const workoutLink = document.getElementById("workout-nav-link");
const foodLink = document.getElementById("food-nav-link");

const nav = document.getElementById("nav");
const toggleBtn = document.getElementById("toggle-btn");
const navLinks = document.getElementById("nav-links");
const navbarLinks = [profileLink, workoutLink, foodLink];

navbarLinks.forEach((link) => {
  link.addEventListener("click", () => {
    switch (link.id) {
      case "profile-nav-link":
        profilePage.classList.remove("hidden");
        workoutPage.classList.add("hidden");
        foodPage.classList.add("hidden");

        break;
      case "workout-nav-link":
        workoutPage.classList.remove("hidden");
        profilePage.classList.add("hidden");
        foodPage.classList.add("hidden");
        break;
      case "food-nav-link":
        foodPage.classList.remove("hidden");
        profilePage.classList.add("hidden");
        workoutPage.classList.add("hidden");
        break;
    }

    navLinks.classList.toggle("active");
    nav.classList.toggle("active");
  });
});

toggleBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  nav.classList.toggle("active");
});

// ------------  Profile Page ------------
const createBtn = document.getElementById("create-btn");
const usersName = document.getElementById("name");
const age = document.getElementById("age");
const feet = document.getElementById("feet");
const inches = document.getElementById("inches");
const currWeight = document.getElementById("curr-weight");
const goWeight = document.getElementById("go-weight");
const form = document.getElementById("sign-form");

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
const displayProfile = () => {
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
  nav.classList.remove("hidden");
};

// Save User Info to Local Storage and Redirect to Profile page and call displayProfile function
form.addEventListener("submit", (e) => {
  e.preventDefault();

  localStorage.setItem("Name", usersName.value);
  localStorage.setItem("Age", age.value);
  localStorage.setItem("Height", feet.value + " ft. " + inches.value + " in.");
  localStorage.setItem("Weight", currWeight.value + " lbs.");
  localStorage.setItem("Goal Weight", goWeight.value + " lbs.");

  displayProfile();
  nav.classList.remove("hidden");
});

// Save User Info to Local Storage and Redirect to Profile page and call profileInfo function
form.addEventListener("submit", (e) => {
  e.preventDefault();

  localStorage.setItem("Name", usersName.value);
  localStorage.setItem("Age", age.value);
  localStorage.setItem("Height", feet.value + " ft. " + inches.value + " in.");
  localStorage.setItem("Weight", currWeight.value + " lbs.");
  localStorage.setItem("Goal Weight", goWeight.value + " lbs.");

  displayProfile();
});

createBtn.addEventListener("click", () => {
  profilePage.classList.add("hidden");
  signupPage.classList.remove("hidden");
});

// ------------  Workout Page ------------
const randomNumber = (data) => {
  let randomNum = Math.floor(Math.random() * data.length);
  return randomNum;
};

const exerciseURL =
  "https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "031f90f2bamsh08f92af0c6fe80cp1d5a1bjsndaa3aea41ea9",
    "X-RapidAPI-Host": "exercises-by-api-ninjas.p.rapidapi.com",
  },
};

class Exercise {
  constructor(muscle, sets, reps) {
    this.muscle = muscle;
    this.sets = sets;
    this.reps = reps;
  }

  getExercise = async (type = "muscle") => {
    return await fetch(`${exerciseURL}?${type}=${this.muscle}`, options)
      .then((response) => response.json())
      .then((exercise) => {
        const index = randomNumber(exercise);
        return {
          name: exercise[index].name,
          instruc: exercise[index].instructions,
          sets: this.sets,
          reps: this.reps,
        };
      })
      .catch((error) =>
        console.error("An Error Occurred with the Fetch Request")
      );
  };
}

const pushDay = () => {
  return [
    new Exercise("chest", 3, 8),
    new Exercise("traps", 3, 8),
    new Exercise("biceps", 3, 12),
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
    new Exercise("stretching", 5, null),
    new Exercise("stretching", 5, null),
    new Exercise("stretching", 5, null),
  ];
};

const exerciseDay = async () => {
  const dayOfWeek = 2;
  let promises = [];
  let title = "";

  switch (dayOfWeek) {
    case 0:
    case 6:
      title = "Rest Day";
      return Promise.resolve({ title });
    case 1:
      title = "Push Day";
      promises = pushDay();
      break;
    case 2:
      title = "Pull Day";
      promises = pullDay();
      break;
    case 3:
      title = "Leg Day";
      promises = legDay();
      break;
    case 4:
      title = "Cardio Day";
      promises = cardioDay();
      break;
    case 5:
      title = "Stretching Day";
      promises = stretchingDay();
      break;
    default:
      console.error(error);
      break;
  }

  return Promise.all(promises).then((exercises) => {
    const type = dayOfWeek === 4 || dayOfWeek === 5 ? "type" : "muscle";
    return Promise.resolve({
      exercise1: exercises[0].getExercise(type),
      exercise2: exercises[1].getExercise(type),
      exercise3: exercises[2].getExercise(type),
      title,
    });
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
  const instrucInfo = document.getElementById("instruc-info");

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
      exercise1Name.addEventListener("click", () => {
        workoutPage.classList.add("hidden");
        instrucPage.classList.remove("hidden");
        results.exercise1.then((res) => {
          instrucInfo.innerHTML = res.instruc;
          nav.classList.add("hidden");
        });
      });

      exercise1Sets.innerHTML = await results.exercise1.then((res) => res.sets);
      exercise1Reps.innerHTML = await results.exercise1.then((res) => res.reps);

      exercise2Name.innerHTML = await results.exercise2.then((res) => res.name);
      exercise2Name.addEventListener("click", () => {
        workoutPage.classList.add("hidden");
        instrucPage.classList.remove("hidden");
        results.exercise2.then((res) => {
          instrucInfo.innerHTML = res.instruc;
          nav.classList.add("hidden");
        });
      });

      exercise2Sets.innerHTML = await results.exercise2.then((res) => res.sets);
      exercise2Reps.innerHTML = await results.exercise2.then((res) => res.reps);

      exercise3Name.innerHTML = await results.exercise3.then((res) => res.name);
      exercise3Name.addEventListener("click", () => {
        workoutPage.classList.add("hidden");
        instrucPage.classList.remove("hidden");
        results.exercise3.then((res) => {
          instrucInfo.innerHTML = res.instruc;
          nav.classList.add("hidden");
        });
      });
      exercise3Sets.innerHTML = await results.exercise3.then((res) => res.sets);
      exercise3Reps.innerHTML = await results.exercise3.then((res) => res.reps);
    }
  } catch (error) {
    console.error(error);
  }
};

displayWorkout();

const backBtn = document.getElementById("back-btn");
backBtn.addEventListener("click", () => {
  workoutPage.classList.remove("hidden");
  instrucPage.classList.add("hidden");
  nav.classList.remove("hidden");
});

// ------------  Food Page ------------

const foodURL = "https://api.npoint.io/8c42d61c32ddbde2d647";

const getFood = async () => {
  const response = await fetch(foodURL);
  const data = await response.json();
  return data;
};

const displayFood = async () => {
  const breakName = document.getElementById("break-name");
  const breakCal = document.getElementById("break-cal");
  const breakProtein = document.getElementById("break-protein");
  const lunchName = document.getElementById("lunch-name");
  const lunchCal = document.getElementById("lunch-cal");
  const lunchProtein = document.getElementById("lunch-protein");
  const supperName = document.getElementById("supper-name");
  const supperCal = document.getElementById("supper-cal");
  const supperProtein = document.getElementById("supper-protein");
  const totalCal = document.getElementById("total-cal");
  const totalProtein = document.getElementById("total-protein");

  try {
    const results = await getFood();
    const randomIndexBreak = randomNumber(results.food.breakfast);
    const randomIndexLunch = randomNumber(results.food.lunch);
    const randomIndexSupper = randomNumber(results.food.supper);

    breakName.innerHTML = results.food.breakfast[randomIndexBreak].name;
    breakCal.innerHTML = results.food.breakfast[randomIndexBreak].calories;
    breakProtein.innerHTML = `${results.food.breakfast[randomIndexBreak].protein}g`;

    lunchName.innerHTML = results.food.lunch[randomIndexLunch].name;
    lunchCal.innerHTML = results.food.lunch[randomIndexLunch].calories;
    lunchProtein.innerHTML = `${results.food.lunch[randomIndexLunch].protein}g`;

    supperName.innerHTML = results.food.supper[randomIndexSupper].name;
    supperCal.innerHTML = results.food.supper[randomIndexSupper].calories;
    supperProtein.innerHTML = `${results.food.supper[randomIndexSupper].protein}g`;

    totalCal.innerHTML =
      parseInt(breakCal.innerHTML) +
      parseInt(lunchCal.innerHTML) +
      parseInt(supperCal.innerHTML);

    totalProtein.innerHTML = `${
      parseInt(breakProtein.innerHTML) +
      parseInt(lunchProtein.innerHTML) +
      parseInt(supperProtein.innerHTML)
    }g`;
  } catch (error) {
    console.error(error);
  }
};

displayFood();
