import { getWeatherData } from "./fetchWeather";

import {
  getTimeDifference,
  getCityTime,
  formatToDay,
  convertClockTime,
  formatTemp,
  getFutureTime,
  liveUpdateTime,
} from "./utility";

import fetchCityInfo from "./fetchCityName";
import { findWeatherIcon, findExtraInfoIcons } from "./getImages";
import { fromUnixTime } from "date-fns";

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
}

const displayWeather = async (coords) => {
  const weatherData = await getWeatherData(coords);
  const cityInfo = await fetchCityInfo(coords.lat, coords.lon);
  const Unixtime = getCityTime(weatherData.timezone_offset);
  clearPrevious();

  displayWeekData(weatherData.daily);
  displayCurrentData(weatherData.current, Unixtime, cityInfo, weatherData.hourly[0].pop);
  displayExtraCurrentData(weatherData.current, weatherData.hourly[0].pop);
  displayHourlyData(weatherData.hourly, weatherData.timezone_offset);
};

function displayWeekData(dailyData) {
  const dailyContainer = document.querySelector(".week_forecast-container");
  dailyData.forEach((eachDay) => {
    const time = formatToDay(eachDay.dt);
    const icon = findWeatherIcon(eachDay.weather[0].icon);
    const temp = formatTemp(eachDay.temp.day);

    const createDayDOM = document.createElement("li");
    createDayDOM.classList.add("date");

    const dayHTML = `
      <h4 class='date_title dateFS'>${time}</h4>
      <div class='date_icon-temp'>
        <img class='date_icon iconSize' src='${icon}' >
        <h4 class='date_temp dateFS'>${temp}</h4>
      </div>
     `;

    const creatDayFRAG = document
      .createRange()
      .createContextualFragment(dayHTML);

    createDayDOM.appendChild(creatDayFRAG);
    weatherItems.daily.push(createDayDOM);
    dailyContainer.appendChild(createDayDOM);
  });
}

function displayCurrentData(todayData, Unixtime, location) {
  const formatTime = convertClockTime(Unixtime, "12L");
  const timeDifference = getTimeDifference(Unixtime);
  const city = location[0];
  const state = location[1];

  const icon = findWeatherIcon(todayData.weather[0].icon);
  const description = todayData.weather[0].description; // need to capitalize
  const temp = formatTemp(todayData.temp);

  const todaySection = document.querySelector('.today_section');
  const weatherContainer = document.createElement('div');
  weatherContainer.classList.add('WI_area');

  const currentHTML = `
    <div class='WI_time-wrapper'>
      <h4 class='WI_time skinnyFS'>${formatTime}</h4>
      <i class='WI_hourDifference'>${timeDifference}</i>
    </div>
    <div class='WI_description skinnyFS'>${description}</div>
    <div class='WI_location cityLocationFS'>${city}, ${state}</div>
    <div class='WI_tempWrapper'>
      <h1 class='WI_temp tempFS'>${temp}</h1>
      <h4 class='WI_temp-switcher titleFS'>°</h4>
      <div class='WI_icon'><img class='medCloud' src='${icon}'></div>
    </div>
  ` 
  const createFRAG = document.createRange().createContextualFragment(currentHTML);
  weatherContainer.appendChild(createFRAG);
  weatherItems.current.push(weatherContainer);
  todaySection.appendChild(weatherContainer);
  
}

function displayExtraCurrentData(todayData, rainChance) {
  const wind_speed = todayData.wind_speed; //ned to convert
  const uv_index = todayData.uvi;
  const feels_like = todayData.feels_like; //need to convert
  const dew_point = todayData.dew_point;
  const humidity = todayData.humidity;
  const visibility = todayData.visibility; // need to convert
  const pressure = todayData.pressure;
  
  
  const todaySection = document.querySelector(".today_section");
  const extraWeatherContainer = document.createElement("div");
  extraWeatherContainer.classList.add("WI_e-area");
  weatherItems.current.push(extraWeatherContainer);

  const extraWeatherDataHTML = `
  <div class='WI_e-grid'>
    <div class='WI_e-item'>
      <img class='extraInfoIcons' src='${findExtraInfoIcons("wind")}'>
      <div class='WI_e-info'>
        <p class='textFS'>Wind</p>
        <h4 id='windInfo'class='textFS--bold'>${wind_speed}</h4>
      </div>
    </div>
    <div class='WI_e-item'>
      <img class='extraInfoIcons' src='${findExtraInfoIcons("uvi")}'>
      <div class='WI_e-info'>
        <p class='textFS'>UV Index</p>
        <h4 id='windInfo'class='textFS--bold'>${uv_index}</h4>
      </div>
    </div>
    <div class='WI_e-item'>
      <img class='extraInfoIcons' src='${findExtraInfoIcons("feels_like")}'>
      <div class='WI_e-info'>
        <p class='textFS'>Feels like</p>
        <h4 id='windInfo'class='textFS--bold'>${feels_like}</h4>
      </div>
    </div>
    <div class='WI_e-item'>
      <img class='extraInfoIcons' src='${findExtraInfoIcons("rain")}'>
      <div class='WI_e-info'>
        <p class='textFS'>Chance of rain</p>
        <h4 id='windInfo'class='textFS--bold'>${rainChance}%</h4>
      </div>
    </div>
    <div class='WI_e-item'>
      <img class='extraInfoIcons' src='${findExtraInfoIcons("visibility")}'>
      <div class='WI_e-info'>
        <p class='textFS'>Visibility</p>
        <h4 id='windInfo'class='textFS--bold'>${visibility}</h4>
      </div>
    </div>
    <div class='WI_e-item'>
      <img class='extraInfoIcons' src='${findExtraInfoIcons("pressure")}'>
      <div class='WI_e-info'>
        <p class='textFS'>pressure</p>
        <h4 id='windInfo'class='textFS--bold'>${pressure}</h4>
      </div>
    </div>
    <div class='WI_e-item'>
      <img class='extraInfoIcons' src='${findExtraInfoIcons("dew")}'>
      <div class='WI_e-info'>
        <p class='textFS'>dew point</p>
        <h4 id='windInfo'class='textFS--bold'>${dew_point}</h4>
      </div>
    </div>
    <div class='WI_e-item'>
      <img class='extraInfoIcons' src='${findExtraInfoIcons("humidity")}'>
      <div class='WI_e-info'>
        <p class='textFS'>humidity</p>
        <h4 id='windInfo'class='textFS--bold'>${humidity}</h4>
      </div>
    </div>
  </div>`;
  const createFRAG = document
    .createRange()
    .createContextualFragment(extraWeatherDataHTML);
  extraWeatherContainer.appendChild(createFRAG);
  todaySection.appendChild(extraWeatherContainer);
}
// include sunset and sunrise!!
function displayHourlyData(hourlyData, offset) {
  const currentLocationTime = getCityTime(offset);
  const hourlyContainer = document.querySelector(".hourForecastList");
  hourlyData.forEach((eachHour) => {
    const time = getFutureTime(currentLocationTime, eachHour.dt);
    const icon = findWeatherIcon(eachHour.weather[0].icon);
    const temp = formatTemp(eachHour.temp);

    const createHourDOM = document.createElement("li");
    createHourDOM.classList.add("hour_item");

    const hourHTML = `
      <div class='hour_time titleFS'>${time}°</div>
      <div class='hour_icon'><img class='iconSize' src='${icon}'></div>
      <div class='hour_temp titleFS'>${temp}</div>
    `;
    const createHourFRAG = document
      .createRange()
      .createContextualFragment(hourHTML);

    createHourDOM.appendChild(createHourFRAG);
    weatherItems.hourly.push(createHourDOM);
    hourlyContainer.appendChild(createHourDOM);
  });
}

export default displayWeather;
