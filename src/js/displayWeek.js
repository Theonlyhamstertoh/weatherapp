import { findWeatherIcon } from "./getImages";
import { formatTemp } from "./utility";
import { formatToDay } from "./fetchCityTime";
import { weatherItems } from "./index";

export default function displayWeekData(dailyData) {
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
        <h4 class='date_temp dateFS'>${temp}°</h4>
      </div>
     `;
    //append element onto the DOM
    const creatDayFRAG = document
      .createRange()
      .createContextualFragment(dayHTML);

    createDayDOM.appendChild(creatDayFRAG);
    weatherItems.daily.push(createDayDOM);
    dailyContainer.appendChild(createDayDOM);
  });
}
