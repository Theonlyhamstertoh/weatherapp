import { CtoF, formatTemp, FtoC } from "./utility";
import { data, weatherItems } from "./index";
import { saveToLocal } from "./localStorage";
import { getNecessaryWeatherData } from "./fetchWeather";
import { getTimeDifference } from "./fetchCityTime";
import { findExtraInfoIcons } from "./getImages";

const displayCards = async (coords, onlyLocalData,alreadyHaveID, localStoredCity) => {
  const get = await getNecessaryWeatherData(coords, localStoredCity);

  const todayData = get.weatherData.current;
  const city = get.cityInfo[0];
  const timeDifference = getTimeDifference(get.Unixtime);
  const id = randomId(alreadyHaveID);
  const temp = formatTemp(todayData.temp);
  const addButton = document.querySelector(".addCard");
  const cardSearchInput = document.querySelector(".card_input");
  const cardContainer = document.querySelector(".cardContainer");
  const cardHTML = `
    <img src='${findExtraInfoIcons("delete")}' class='delete superSmallSize'>
    <div class='card_location'>
      <h4 class='card_title dateFS'>${city}</h4>
      <h6 class='card_timeDifference textFS'>${timeDifference}</h6>
    </div>
    <div class='card_info'>
      <h1 class='card_temp dateFS--big'>${temp}°</h1>
  </div>
  `;
  //create the card and append the HTML
  const createNewCard = document.createElement("div");
  const createCardFRAG = document
    .createRange()
    .createContextualFragment(cardHTML);
  createNewCard.classList.add("card");
  createNewCard.classList.add(getRandomColor());
  createNewCard.dataset.id = id;

  //appends child to the the DOM
  createNewCard.appendChild(createCardFRAG);
  cardContainer.insertBefore(createNewCard, addButton);
  weatherItems.cards.push(createNewCard);

  // add a event listener to detect if user deletes the card
  createNewCard.addEventListener("click", deleteCards);

  // reset the search input
  cardSearchInput.value = "";
  // set cardsONly to false so that the main searchbar doesn't accidentally create a card
  data.cardsOnly = false;
  // prevent adding of the same cities if retrieving from local data
  if (onlyLocalData === true) return;
  // puses and save to local storage
  data.cards.push({ id, coords, city });
  saveToLocal(data);
};

const getRandomColor = () => {
  const colorArray = [
    "color1",
    "color2",
    "color3",
    "color4",
    "color5",
    "color6",
    "color7",
    "color8",
    "color9",
    "color10",
  ];

  return colorArray[Math.floor(Math.random() * 10)];
};

// goes through weatherItems and data object arrays and delete the card by finding its id.
const deleteCards = (e) => {
  if (!e.target.classList.contains("delete")) return;
  const targetID = e.target.parentNode.dataset.id;
  weatherItems.cards.forEach((el, index) => {
    if (el.dataset.id === targetID) {
      weatherItems.cards.splice(index, 1);
      el.remove();
    }
  });

  data.cards.forEach((el, index) => {
    if (el.id === targetID) {
      data.cards.splice(index, 1);
    }
  });
  saveToLocal(data);
};

// update the card's temperature when user switches temp.
const updateCards = async (el) => {
  const temp = el.querySelector(".card_temp");
  const takeOutDegree = parseInt(temp.textContent.slice(0, -1));

  if (data.settings.units === "metric") {
    temp.textContent = FtoC(takeOutDegree) + "°";
  } else if (data.settings.units === "imperial") {
    temp.textContent = CtoF(takeOutDegree) + "°";
  }
};

// return a random id
function randomId(ifAlreadyID) {
  if (ifAlreadyID !== undefined) return ifAlreadyID;
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

export { displayCards, updateCards };
