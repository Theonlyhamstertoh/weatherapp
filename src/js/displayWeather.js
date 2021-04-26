import {getWeatherData} from "./fetchWeather";

const saveLocalStorage = () => {};

const displayWeather = async (coords) => {
  const weatherData = await getWeatherData(coords);
  // displayWeekData(weatherData.daily);
  // displayCurrentData(weatherData.current);
  displayHourlyData(weatherData.hourly);
};

const getLocationTime = async () => {};

const switchTemperatureUnits = () => {};

const switchTimeTo24Hours = () => {};

const showDefault = () => {};

const throwErrorIfNotFound = () => {};

function displayWeekData(weekData) {
  console.log(weekData);
}
function displayCurrentData(todayData) {
  console.log(todayData);
}
function displayHourlyData(hourlyData) {
  console.log(hourlyData.length);
  hourlyData.forEach(eachHour => {
    console.log(eachHour)
  })
}
function displayMinuteData(minuteData) {
  console.log(minuteData);
}

export {displayWeather};