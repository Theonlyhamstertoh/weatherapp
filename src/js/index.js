import "../sass/main.scss";
import { defineSearchType } from "./displayWeather";
import { fetchUserInputLocation } from "./fetchWeather";





const searchButton = document.querySelector(".input_button");
searchButton.addEventListener("click", fetchUserInputLocation.coords);

const getLocationTime = async () => {};

const switchTemperatureUnits = () => {};

const switchTimeTo24Hours = () => {
  
};

const showDefault = () => {};

const throwErrorIfNotFound = () => {};
