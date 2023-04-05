const randomNumber = (data) => {
  let randomNum = Math.floor(Math.random() * data.length);
  console.log(randomNum);
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

  getExerciseByMuscle = () => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "031f90f2bamsh08f92af0c6fe80cp1d5a1bjsndaa3aea41ea9",
        "X-RapidAPI-Host": "exercises-by-api-ninjas.p.rapidapi.com",
      },
    };

    fetch(`${exerciseURL}?muscle=${this.muscle}`, options)
      .then((response) => response.json())
      .then((response) =>
        console.log(
          `${response[randomNumber(response)].name}, Sets: ${
            this.sets
          }, Reps: ${this.reps}`
        )
      )
      .catch((err) => console.error(err));
  };
  // exerciseDay = () => {
  //   dayOfWeek = new Date().getDay();
  //   let exercise1;
  //   let exercise2;
  //   let exercise3;
  //   let title;

  //   if (dayOfWeek === 0 || dayOfWeek === 6) {
  //     title = "Rest Day";
  //     exercise1 = null;
  //     exercise2 = null;
  //     exercise3 = null;
  //   } else if (dayOfWeek === 1) {
  //     title = "Push Day";
  //     exercise1 = new Exercise("chest", 3, 8);
  //     exercise2 = new Exercise("triceps", 3, 12);
  //     exercise3 = new Exercise("shoulders", 3, 12);
  //   } else if (dayOfWeek === 2) {
  //     title = "Pull Day";
  //     exercise1 = new Exercise("lower_back", 3, 8);
  //     exercise2 = new Exercise("traps", 3, 8);
  //     exercise3 = new Exercise("biceps", 3, 12);
  //   } else if (dayOfWeek === 3) {
  //     title = "Leg Day";
  //     exercise1 = new Exercise("quadriceps", 3, 8);
  //     exercise2 = new Exercise("hamstrings", 3, 8);
  //     exercise3 = new Exercise("calves", 3, 12);
  //   } else {
  //     console.error(error);
  //   }
  //   return exercise1, exercise2, exercise3, title;
  // };
}

const exercise = new Exercise("biceps", 3, 10).getExerciseByMuscle();
