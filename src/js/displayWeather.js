import { fetchUserInputLocation, getWeatherData } from "./fetchWeather";
import { getCityTime } from "./fetchCityTime";
import fetchCityInfo from "./fetchCityName";
import { saveToLocal } from "./localStorage";
import displayWeekData from "./displayWeek";
import displayHourlyData from "./displayHourly";
import displayCards from "./displayCards";
import { displayCurrentData, displayExtraCurrentData } from "./displayCurrent";

const weatherItems = {
  current: [],
  daily: [],
  hourly: [],
  cards: [],
  id: {
    cards: [],
    settings: [],
    searchQuery: {},
  },
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

const displayWeather = async (coords, cardsOnly, units) => {
  const get = await getNecessaryWeatherData(coords);
  console.log(get.cityInfo)
  if (cardsOnly === true) {
    return displayCards(get);
  }
  clearPrevious();
  displayCurrentData(get, units);
  displayExtraCurrentData(get, units);
  displayWeekData(get.weatherData.daily);
  displayHourlyData(get);
  saveToLocal(coords);
};

async function getNecessaryWeatherData(coords) {
  const weatherData = await getWeatherData(coords);
  const cityInfo = await fetchCityInfo(coords.lat, coords.lon);
  const Unixtime = getCityTime(weatherData.timezone_offset);
  return { weatherData, cityInfo, Unixtime };
}

export { displayWeather, weatherItems };
