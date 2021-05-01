import { getNecessaryWeatherData} from "./fetchWeather";
import { saveToLocal } from "./localStorage";
import displayWeekData from "./displayWeek";
import displayHourlyData from "./displayHourly";
import { displayCurrentData, displayExtraCurrentData } from "./displayCurrent";
import {weatherItems, data} from "./objectArray";






const displayWeather = async (coords, units) => {
  data.searched_Coords = coords;
  const get = await getNecessaryWeatherData(coords);
  // clear previous before loading the new weather data
  clearPrevious();

  // display the data
  displayCurrentData(get);
  displayExtraCurrentData(get);
  displayWeekData(get.weatherData.daily);
  displayHourlyData(get);
  saveToLocal(data);
  console.log(coords)

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
}

export { displayWeather, getNecessaryWeatherData};
