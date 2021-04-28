import { requestCityInUS, requestCityInEU } from "./fetchWeather";
import {
  differenceInHours,
  differenceInMilliseconds,
  differenceInSeconds,
  format,
  fromUnixTime,
  getHours,
  getUnixTime,
} from "date-fns";



const switchTemperatureUnits = () => {};

const switchTimeTo24Hours = () => {};

const showDefault = () => {};

const throwErrorIfNotFound = () => {};

function getCityTime(offset) {
  const d = new Date();
  const localTime = d.getTime();
  const localOffset = d.getTimezoneOffset() * 60000;
  const utc = localTime + localOffset;
  const cityTime = utc + 1000 * offset;
  const Unixtime = cityTime / 1000;
  return Unixtime;
}

function getTimeDifference(cityTime) {
  const localTime = new Date();
  const formatCityTime = fromUnixTime(cityTime)
  const timeDifference = differenceInHours(localTime, formatCityTime);
  if (Math.sign(timeDifference) === -1) {
    return Math.abs(timeDifference) + " hours ahead";
  } else if (Math.sign(timeDifference) === 1) {
    return Math.abs(timeDifference) + " hours behind";
  } else if (Math.abs(Math.sign(timeDifference)) === 0) {
    return "";
  }
}

async function getCityLocationInfo(lat, lon, timezone) {
  // if(timezone.split('/')[0] == 'America') {
  
  // };
  // const userInput = document.querySelector(".input_text").value;
  
  // const locationInfo = await fetch(requestCityInUS(lat, lon), {
  //   mode: "cors",
  // }).then(response => response.json());
  // console.log(locationInfo.address.city)
}

const saveLocalStorage = () => {};

function formatTemp(temperature) {
  return Math.round(temperature) + "°";
}

function convertClockTime(time, clockType) {
  const date = fromUnixTime(time);
  if(clockType === '12L') {
    return format(date, 'p')
  } else if(clockType === '12') {
    return format(date, "haaa");
  } else if(clockType === '24'){
    return format(date, "H:mm");
  } 
}

function formatToDay(time) {
  const date = fromUnixTime(time);
  return format(date, "EEEE");
}

function capitalize(text) {
  return text
    .toLowerCase()
    .split(" ")
    .map((str) => str.charAt(0).toUpperCase() + str.substring(1))
    .join(" ");
}

function formatToMiles(meters) {
  return meters * 0.00062137;
}

function getFutureTime(currentLocationTime, forecastTIme) {
  const timeDifference = differenceInMilliseconds(getUnixTime(new Date()), forecastTIme);
  const forecastTime = currentLocationTime + Math.abs(timeDifference);
  const formatTime = convertClockTime(forecastTime, '12');
  return formatTime;
}

function formatPressure() {}
export {
  getCityLocationInfo,
  getTimeDifference,
  getCityTime,
  formatToDay,
  convertClockTime,
  formatTemp,
  getFutureTime,
};
