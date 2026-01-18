import axios from "axios";

const BASE_URL = "https://swapi.py4e.com/api/people/";

export const getAllPeople = async () => {
  let allCharacters = [];
  let url = BASE_URL;

  try {
    while (url) {
      const response = await axios.get(url);
      allCharacters = [...allCharacters, ...response.data.results];
      url = response.data.next; // Move to the next page
    }
    return allCharacters;
  } catch (error) {
    console.error("Error fetching all Star Wars characters:", error);
    return [];
  }
};
