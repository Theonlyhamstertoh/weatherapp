import { CtoF, formatTemp, FtoC } from "./utility";
import {weatherItems, data} from "./objectArray";
import { saveToLocal } from "./localStorage";
import {getNecessaryWeatherData} from "./fetchWeather";
import { getTimeDifference } from "./fetchCityTime";
import { findExtraInfoIcons } from "./getImages";

const displayCards = async (coords, onlyLocalData, alreadyHaveID, localStoredCity) => {
  const get = await getNecessaryWeatherData(coords, localStoredCity);

  const todayData = get.weatherData.current;
  const city = get.cityInfo[0];
  const timeDifference = getTimeDifference(get.Unixtime);
  const id = randomId(alreadyHaveID);
  const temp = formatTemp(todayData.temp);
  const addButton = document.querySelector('.addCard');
  const cardSearchInput = document.querySelector(".card_input");
  const cardHTML = `
    <img src='${findExtraInfoIcons("delete")}' class='delete superSmallSize'>
    <div class='card_location'>
      <h4 class='card_title dateFS'>${city}</h4>
      <h6 class='card_timeDifference textFS'>${timeDifference}</h6>
    </div>
    <div class='card_info'>
      <h1 class='card_temp dateFS--big'>${temp}°</h1>
  </div>
  `
  const cardContainer = document.querySelector('.cardContainer');
  const createNewCard = document.createElement('div');
  const createCardFRAG = document.createRange().createContextualFragment(cardHTML);
  createNewCard.classList.add('card');
  createNewCard.classList.add(getRandomColor())
  createNewCard.dataset.id = id;

  //appends child to the the DOM 
  createNewCard.appendChild(createCardFRAG);
  cardContainer.insertBefore(createNewCard, addButton)
  weatherItems.cards.push(createNewCard);
  
  
  createNewCard.addEventListener('click', deleteCards)
  cardSearchInput.value = '';
  data.cardsOnly = false;
  if(onlyLocalData === true) return;
  data.cards.push({id, coords, city})
  saveToLocal(data);
} 

const getRandomColor = () => {
  const colorArray = ["color1","color2", "color3", "color4", "color5", "color6", "color7", "color8", "color9", "color10"];

  return colorArray[Math.floor(Math.random() * 10)]
}

const deleteCards = (e) => {
  if(!e.target.classList.contains('delete')) return;
  const targetID = e.target.parentNode.dataset.id;
  weatherItems.cards.forEach((el, index) => {
    if(el.dataset.id === targetID) {
      weatherItems.cards.splice(index, 1)
      el.remove();
    }
  }) 

  data.cards.forEach((el, index) => {if(el.id === targetID) {
    data.cards.splice(index, 1);
  }})
  saveToLocal(data);

}

const updateCards = async (el) => {
  const temp = el.querySelector('.card_temp');
  const takeOutDegree = parseInt(temp.textContent.slice(0, -1))

  if(data.settings.units === 'metric') {
    temp.textContent = FtoC(takeOutDegree) + "°";
  } else if(data.settings.units ===  'imperial') {
    temp.textContent = CtoF(takeOutDegree)  + "°";
  }
}

function randomId(ifAlreadyID) {
  if(ifAlreadyID !== undefined) return ifAlreadyID;
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

export {displayCards, updateCards};