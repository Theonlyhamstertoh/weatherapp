import { getWeatherData } from "./fetchWeather";
import { getCityTime } from "./fetchCityTime";
import fetchCityInfo from "./fetchCityName";
import { saveToLocal } from "./localStorage";
import displayWeekData from "./displayWeek";
import displayHourlyData from "./displayHourly";
import { displayCurrentData, displayExtraCurrentData } from "./displayCurrent";

const weatherItems = {
  current: [],
  daily: [],
  hourly: [],
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

const displayWeather = async (coords, units) => {
  const weatherData = await getWeatherData(coords);
  const cityInfo = await fetchCityInfo(coords.lat, coords.lon, units);
  const Unixtime = getCityTime(weatherData.timezone_offset);
  clearPrevious();

  displayCurrentData(
    weatherData.current,
    Unixtime,
    cityInfo,
    weatherData.hourly[0].pop,
    units
  );

  displayExtraCurrentData(
    weatherData.current,
    weatherData.hourly[0].pop,
    cityInfo[2],
    units
  );
  
  displayWeekData(weatherData.daily);
  displayHourlyData(weatherData.hourly, weatherData.timezone_offset);
  saveToLocal(weatherData);
};

export { displayWeather, weatherItems };
