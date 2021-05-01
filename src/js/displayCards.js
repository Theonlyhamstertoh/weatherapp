import { formatTemp } from "./utility";
import {weatherItems, data} from "./objectArray";
import { saveToLocal } from "./localStorage";
import {getNecessaryWeatherData} from "./fetchWeather";
import { getTimeDifference } from "./fetchCityTime";
import { findExtraInfoIcons } from "./getImages";

const displayCards = async (coords) => {
  const get = await getNecessaryWeatherData(coords);
  const todayData = get.weatherData.current;
  const city = get.cityInfo[0];
  const timeDifference = getTimeDifference(get.Unixtime);
  const id = randomId();
  const temp = formatTemp(todayData.temp);
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
  const cardSection = document.querySelector('.card_section');
  const createNewCard = document.createElement('div');
  const createCardFRAG = document.createRange().createContextualFragment(cardHTML);
  createNewCard.classList.add('card');
  createNewCard.classList.add(getRandomColor())
  createNewCard.dataset.id = id;

  //appends child to the the DOM 
  createNewCard.appendChild(createCardFRAG);
  cardSection.appendChild(createNewCard)
  weatherItems.cards.push(createNewCard);
  
  data.cardCoords.push({id, coords})
  saveToLocal(data);

  
  createNewCard.addEventListener('click', deleteCards)
  
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

  data.cardCoords.forEach((el, index) => {if(el.id === targetID) {
    data.cardCoords.splice(index, 1);
  }})

  console.log(weatherItems.cards, data)
}
function randomId() {
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

export {displayCards};