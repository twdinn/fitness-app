class Workout {
  constructor(muscle) {
    // this.name = name;
    // this.description = description;
    // this.sets = sets;
    // this.reps = reps;
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

    fetch(
      `https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?muscle=${this.muscle}`,
      options
    )
      .then((response) => response.json())
      .then((response) => console.log(response[randomNumber()].name))
      .catch((err) => console.error(err));
  };
}

const randomNumber = () => {
  let randomNum = Math.floor(Math.random() * 10);
  return randomNum;
};

// const exerciseURL =
//   "https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises";

const exercise = new Workout("chest").getExercise();
