import "../sass/main.scss";
import { displayCards } from "./displayCards";
import { displayWeather } from "./displayWeather";
import { fetchUserInputLocation } from "./fetchWeather";
import { fetchLocal } from "./localStorage";
import { data } from "./objectArray";
import {buttonHandler} from "./settings"



const allCheckBox = document.querySelectorAll('input[type="checkbox"]');

allCheckBox.forEach((el) => {
  el.addEventListener("click", buttonHandler);
});

const temp = document.querySelector('.setting_temp');
const clock = document.querySelector(".setting_clock");
if(data.settings.units === 'metric') {
  temp.checked = true;
  clock.checked = true;
}

displayWeather(data.mainSearch.coords, data.mainSearch.city)

let index = 0;
const interval = setInterval(() => {
  data.cardsOnly = true;
  if(data.cards === undefined || data.cards.length <= index ) {
    clearInterval(interval);
    data.cardsOnly = false;
  } else {
    displayCards(data.cards[index].coords, true, data.cards[index].id, data.cards[index].city );
  }
  index++;
}, 600)

const searchInput = document.querySelector(".input_text");
const cardSearchInput = document.querySelector(".card_input");

const searchButton = document.querySelector(".input_button");
searchButton.addEventListener("click", () => {
  fetchUserInputLocation.coords(searchInput);
  searchButton.disabled = true;
  window.setTimeout(() => searchButton.disabled = false, 500)
});

const addCardButton = document.querySelector(".addButton");
addCardButton.addEventListener("click", (e) => {
  if(cardSearchInput === '') return;
  data.cardsOnly = true;
  window.setTimeout(() => fetchUserInputLocation.coords(cardSearchInput, true), 500);
});

const settingPage = document.querySelector(".setting");
const input_setting = document.querySelector('.input_setting');
input_setting.addEventListener('click', () => {
  if(settingPage.classList.contains('displayNone')) {
    settingPage.classList.add('displayBlock');
    settingPage.classList.remove('displayNone')
  } else {
    settingPage.classList.remove('displayBlock');
    settingPage.classList.add('displayNone')
  }
})
const saveSetting = document.querySelector('.saveButton');
saveSetting.addEventListener('click', () => {
  settingPage.classList.remove("displayBlock")
  settingPage.classList.add('displayNone')
})


const data_wrapper = document.querySelector('.data_wrapper');
const loadingIcon = document.querySelector('.loadingIcon');

data_wrapper.style.display = 'none';
window.setTimeout(() => {
  data_wrapper.style.display = 'flex';
loadingIcon.style.display = 'none';
}, 2000)