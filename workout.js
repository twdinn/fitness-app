class Workout {
  constructor(muscle, sets, reps) {
    // this.name = name;
    // this.description = description;
    this.sets = sets;
    this.reps = reps;
    // this.category = category;
    this.muscle = muscle;
  }

  getExercise = () => {
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
}

const randomNumber = (data) => {
  let randomNum = Math.floor(Math.random() * data.length);
  console.log(randomNum);
  return randomNum;
};

const exerciseURL =
  "https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises";

const exercise = new Workout("biceps", 3, 10).getExercise();
