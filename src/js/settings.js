import displayCards from "./displayCards";
import { displayWeather, callDisplayCard } from "./displayWeather";
import { data, weatherItems } from "./objectArray";

const allCheckBox = document.querySelectorAll('input[type="checkbox"]');

const buttonHandler = async (e) => {
  const temp = document.querySelector('.setting_temp');
  const clock = document.querySelector(".setting_clock");
  if (e.target.checked) {
    switch(e.target) {
      case temp: 
        console.log(temp)
        data.settings.units = "metric";
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
        break;
      case clock: 
        data.settings.clockSystem = '12';
        break;
    }
  }

  weatherItems.cards.forEach(card => card.remove());
  data.cardCoords.forEach(el => displayCards(el));
  displayWeather(data.searched_Coords);
};

allCheckBox.forEach((el) => {
  el.addEventListener("click", buttonHandler);
});
