import {
  getWeatherData,
  fetchCityInfo
} from "./fetchWeather";

import {
  getCityLocationInfo,
  getTimeDifference,
  getCityTime,
  formatToDay,
  convertClockTime,
  formatTemp,
  getFutureTime,
} from "./utility";

import { findWeatherIcon, findExtraInfoIcons } from "./getImages";

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

  console.log(await fetchCityInfo());
  const weatherData = await getWeatherData(coords);
  console.log(weatherData)
  const locationInfo = await getCityLocationInfo(
    coords.lat,
    coords.lon,
    weatherData.timezone
  );
  const Unixtime = getCityTime(weatherData.timezone_offset);
  clearPrevious();

  displayWeekData(weatherData.daily);
  displayCurrentData(
    weatherData.current,
    Unixtime,
    locationInfo,
    weatherData.hourly[0].pop
  );
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

function displayCurrentData(todayData, Unixtime, location, rainChance) {
  const formattime = convertClockTime(Unixtime, "12L");
  const timeDifference = getTimeDifference(Unixtime);
  // const state = location.state;
  // const city = location.cityName;
  const icon = findWeatherIcon(todayData.weather[0].icon);
  const description = todayData.weather[0].description; // need to capitalize
  const wind_speed = todayData.wind_speed; //ned to convert
  const uv_index = todayData.uvi;
  const feels_like = todayData.feels_like; //need to convert
  const dew_point = todayData.dew_point;
  const humidity = todayData.humidity;
  const visibility = todayData.visibility; // need to convert
  const temp = formatTemp(todayData.temp);
  const pressure = todayData.pressure;
  const extraWeatherContainer = document.querySelector(".WI_e-area");
  const extraWeatherGrid = document.createElement("div");
  extraWeatherGrid.classList.add("WI_e-grid");
  weatherItems.current.push(extraWeatherGrid);

  const extraWeatherDataHTML = `
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
    </div>`;
  const createFRAG = document
    .createRange()
    .createContextualFragment(extraWeatherDataHTML);
  extraWeatherGrid.appendChild(createFRAG);
  extraWeatherContainer.appendChild(extraWeatherGrid);

  // const timeDifference
  // const biggerIcon
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
      <div class='hour_time titleFS'>${time}</div>
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
