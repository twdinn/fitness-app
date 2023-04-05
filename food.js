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
