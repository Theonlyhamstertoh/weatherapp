import {displayCards, updateCards} from "./displayCards";
import { displayWeather } from "./displayWeather";
import { data, weatherItems } from "./objectArray";



const buttonHandler = async (e) => {
  const temp = document.querySelector('.setting_temp');
  const clock = document.querySelector(".setting_clock");
  if (e.target.checked) {
    switch(e.target) {
      case temp: 
        data.settings.units = "metric";
        weatherItems.cards.forEach(el => {
          updateCards(el);
        })
        break;
      case clock: 
        data.settings.clockSystem = '24';
        break;
    }
  } else {
    switch(e.target) {
      case temp: 
        console.log(temp)
        data.settings.units = "imperial";
        weatherItems.cards.forEach(el => {
          updateCards(el);
        })
        break;
      case clock: 
        data.settings.clockSystem = '12';
        break;
    }
  }


  displayWeather(data.mainSearch.coords);
};



export {buttonHandler}