import {getWeatherData} from "./fetchWeather";
import {format, fromUnixTime, getHours} from "date-fns";

function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context('../img/weather', false, /\.(png|jpe?g|svg)$/));



const saveLocalStorage = () => {};

const displayWeather = async (coords) => {

  const weatherData = await getWeatherData(coords);
  console.log(weatherData)
  // displayWeekData(weatherData.daily);
  // displayCurrentData(weatherData.current);
  displayHourlyData(weatherData.hourly);
};


function displayWeekData(weekData) {
  console.log(weekData.dt, weekData.weather[0].icon, weekData.temp);
  const time = weekData.dt;
  const icon = findWeatherIcon(weatherData.weather[0].icon);
  const temp = weatherData.temp;
}


function displayCurrentData(todayData) {
  console.log(todayData);
}

// include sunset and sunrise!!
function displayHourlyData(hourlyData) {
  const hourlyContainer = document.querySelector('.hourForecastList');
  hourlyData.forEach(eachHour => {
    const time = convertTo12Hours(eachHour.dt);
    const icon = findWeatherIcon(eachHour.weather[0].icon);
    const temp = formatTemp(eachHour.temp);

    const hourDomArray = [];
    const createHourDOM = document.createElement('li');
    createHourDOM.classList.add('hour_item');


    const hourHTML = `
      <div class='hour_time titleFS'>${time}</div>
      <div class='hour_icon'><img class='iconSize' src='${icon}'></div>
      <div class='hour_temp titleFS'>${temp}</div>
    `
    const createHourFRAG = document.createRange().createContextualFragment(hourHTML);

    createHourDOM.appendChild(createHourFRAG);
    hourlyContainer.appendChild(createHourDOM);
  })
}

function formatTemp(temperature) {
  return Math.round(temperature) + currentTempUnit();
}

// later add a temp unit switcher
function currentTempUnit() {
  return '°F';
}
function displayMinuteData(minuteData) {
  console.log(minuteData);
}

function unixToDate(unixTime) {
    return fromUnixTime(unixTime);

}

function convertTo12Hours(time) {
  const date = unixToDate(time);
  return format(date, 'haaa');
}

function convertTo24Hours(time) {
  const date = unixToDate(time);
  return format(date, 'H:mm');
}
const findWeatherIcon = (icon) => {
  console.log(icon)
  switch(icon) {
    case "01d":
      return images[0];
    case "01n":
      return images[1];
    case "02d":
      return images[2];
    case "02n":
      return images[3];
    case "03d":
    case "03n":
      return images[4];
    case "04d":
    case "04n":
      return images[5];
    case "09d":
      case "09n":
      return images[6];
    case "10d":
      return images[7];
    case "10n":
      return images[8];
    case "11d":
    case "11n":
      return images[9];
    case "13d":
    case "13n":
      return images[10];
    case "50d":
    case "50n":
      return images[11];

  }
}



export {displayWeather};