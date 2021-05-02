import { getNecessaryWeatherData} from "./fetchWeather";
import { saveToLocal } from "./localStorage";
import displayWeekData from "./displayWeek";
import displayHourlyData from "./displayHourly";
import { displayCurrentData, displayExtraCurrentData } from "./displayCurrent";
import { data, weatherItems } from "./index";



// display the main weather (not the cards) onto the DOM.
const displayWeather = async (coords, localStoredMain) => {
  const get = await getNecessaryWeatherData(coords, localStoredMain);
  // clear previous before loading the new weather data
  clearPrevious();
  // send data to the functions and show the element on DOM
  displayCurrentData(get);
  displayExtraCurrentData(get);
  displayWeekData(get.weatherData.daily);
  displayHourlyData(get);
  
  // store the search into data object and save to local storage
  data.mainSearch.city = get.cityInfo[0];
  data.mainSearch.coords = coords;
  saveToLocal(data);
};



// clear out previous data
function clearPrevious() {
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
