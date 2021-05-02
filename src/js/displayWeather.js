import { getNecessaryWeatherData} from "./fetchWeather";
import { saveToLocal } from "./localStorage";
import displayWeekData from "./displayWeek";
import displayHourlyData from "./displayHourly";
import { displayCurrentData, displayExtraCurrentData } from "./displayCurrent";
import {weatherItems, data} from "./objectArray";
import fetchCityInfo from "./fetchCityName";






const displayWeather = async (coords, localStoredMain) => {
  const get = await getNecessaryWeatherData(coords, localStoredMain);
  console.log(get)
  // clear previous before loading the new weather data
  clearPrevious();
  // display the data
  displayCurrentData(get);
  displayExtraCurrentData(get);
  displayWeekData(get.weatherData.daily);
  displayHourlyData(get);
  
  data.mainSearch.city = get.cityInfo[0];
  data.mainSearch.coords = coords;
  saveToLocal(data);
};



function clearPrevious() {
  // clear out previous data
  weatherItems.current.forEach((item) => {
    item.remove();
  });

  weatherItems.daily.forEach((item) => {
    item.remove();
  });

  weatherItems.hourly.forEach((item) => {
    item.remove();
  });

  clearInterval(weatherItems.intervalID);
  

  // clear input
  const searchInput = document.querySelector(".input_text");
  searchInput.value = '';
}

export { displayWeather, getNecessaryWeatherData};
