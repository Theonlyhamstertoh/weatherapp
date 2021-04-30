import "../sass/main.scss";
import { displayWeather } from "./displayWeather";
import { fetchUserInputLocation } from "./fetchWeather";
import "./settings"
const searchInput = document.querySelector(".input_text");
const cardSearchInput = document.querySelector(".card_input");

const searchButton = document.querySelector(".input_button");
searchButton.addEventListener("click", () => {
  fetchUserInputLocation.coords(searchInput);
});

const addCardButton = document.querySelector(".addButton");
addCardButton.addEventListener("click", () => {
  fetchUserInputLocation.coords(cardSearchInput, true);
});

