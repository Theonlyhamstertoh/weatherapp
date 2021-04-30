import { formatTemp } from "./utility";
import { findWeatherIcon } from "./getImages";
import { getCityTime, getFutureTime } from "./fetchCityTime";
import { weatherItems } from "./displayWeather";

export default function displayHourlyData(get) {
  const hourlyData = get.weatherData.hourly;
  const offset = get.weatherData.timezone_offset
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
      <div class='hour_temp titleFS'>${temp}°</div>
    `;
    const createHourFRAG = document
      .createRange()
      .createContextualFragment(hourHTML);

    createHourDOM.appendChild(createHourFRAG);
    weatherItems.hourly.push(createHourDOM);
    hourlyContainer.appendChild(createHourDOM);
  });
}
