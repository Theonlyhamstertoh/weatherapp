import { findWeatherIcon, findExtraInfoIcons } from "./getImages";
import { weatherItems } from "./displayWeather";
import { formatTemp, capitalize, formatUnits, formatDistance } from "./utility";
import {getTimeDifference, convertClockTime, liveUpdateTime} from "./fetchCityTime";

function displayCurrentData(get, units) {
  const todayData = get.weatherData.current;
  const Unixtime = get.Unixtime;
  const cityInfo = get.cityInfo;
  

  const formatTime = convertClockTime(Unixtime, "24");
  const timeDifference = getTimeDifference(Unixtime);
  const city = cityInfo[0];
  const state = cityInfo[1];

  const icon = findWeatherIcon(todayData.weather[0].icon);
  const description = capitalize(todayData.weather[0].description);
  const temp = formatTemp(todayData.temp);
  const tempUnit = formatUnits(units);
  const todaySection = document.querySelector(".today_section");
  const weatherContainer = document.createElement("div");
  weatherContainer.classList.add("WI_area");

  const currentHTML = `
    <div class='WI_time-wrapper'>
      <h4 class='WI_time skinnyFS'>${formatTime}</h4>
      <i class='WI_hourDifference'>${timeDifference}</i>
    </div>
    <div class='WI_description skinnyFS'>${description}</div>
    <div class='WI_location cityLocationFS'>${city}, ${state}</div>
    <div class='WI_tempWrapper'>
      <h1 class='WI_temp tempFS'>${temp}</h1>
      <h4 class='WI_tempUnit titleFS'>${tempUnit}</h4>
      <div class='WI_icon'><img class='medCloud' src='${icon}'></div>
    </div>
  `;
  const createFRAG = document
    .createRange()
    .createContextualFragment(currentHTML);
  weatherContainer.appendChild(createFRAG);
  weatherItems.current.push(weatherContainer);
  todaySection.appendChild(weatherContainer);

  // set up live clock and store the interval ID to allow for deletion later
  weatherItems.intervalID = liveUpdateTime(Unixtime);
}


function displayExtraCurrentData(get, units) {
  const todayData = get.weatherData.current;
  const rainChance = get.weatherData.hourly[0].pop;
  const airQuality = get.cityInfo[2];


  const wind_speed = formatDistance(todayData.wind_speed, units);
  const uv_index = todayData.uvi;
  const feels_like = todayData.feels_like; //need to convert
  const dew_point = todayData.dew_point;
  const humidity = todayData.humidity;
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
        <h4 id='windInfo'class='textFS--bold'>${feels_like}°</h4>
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
      <img class='extraInfoIcons' src='${findExtraInfoIcons("airQuality")}'>
      <div class='WI_e-info'>
        <p class='textFS'>Air Quality</p>
        <h4 id='windInfo'class='textFS--bold'>${airQuality}</h4>
      </div>
    </div>
    <div class='WI_e-item'>
      <img class='extraInfoIcons' src='${findExtraInfoIcons("pressure")}'>
      <div class='WI_e-info'>
        <p class='textFS'>pressure</p>
        <h4 id='windInfo'class='textFS--bold'>${pressure} hPa</h4>
      </div>
    </div>
    <div class='WI_e-item'>
      <img class='extraInfoIcons' src='${findExtraInfoIcons("dew")}'>
      <div class='WI_e-info'>
        <p class='textFS'>dew point</p>
        <h4 id='windInfo'class='textFS--bold'>${dew_point}°</h4>
      </div>
    </div>
    <div class='WI_e-item'>
      <img class='extraInfoIcons' src='${findExtraInfoIcons("humidity")}'>
      <div class='WI_e-info'>
        <p class='textFS'>humidity</p>
        <h4 id='windInfo'class='textFS--bold'>${humidity}%</h4>
      </div>
    </div>
  </div>`;
  const createFRAG = document
    .createRange()
    .createContextualFragment(extraWeatherDataHTML);
  extraWeatherContainer.appendChild(createFRAG);
  todaySection.appendChild(extraWeatherContainer);
}

export { displayCurrentData, displayExtraCurrentData };
