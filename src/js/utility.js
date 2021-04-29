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
  const formatCityTime = fromUnixTime(cityTime);
  const timeDifference = differenceInHours(localTime, formatCityTime);
  if (Math.sign(timeDifference) === -1) {
    return Math.abs(timeDifference) + " hours ahead";
  } else if (Math.sign(timeDifference) === 1) {
    return Math.abs(timeDifference) + " hours behind";
  } else if (Math.abs(Math.sign(timeDifference)) === 0) {
    return "";
  }
}

const saveLocalStorage = () => {};

function formatTemp(temperature) {
  return Math.round(temperature);
}

function convertClockTime(time, clockType) {
  const date = fromUnixTime(time);
  if (clockType === "12L") {
    return format(date, "pp");
  } else if (clockType === "12") {
    return format(date, "haaa");
  } else if (clockType === "24") {
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

function getFutureTime(currentLocationTime, futureTime) {
  const timeDifference = differenceInMilliseconds(
    getUnixTime(new Date()),
    futureTime
  );
  const forecastTime = currentLocationTime + (-timeDifference);
  const formatTime = convertClockTime(forecastTime, "12");
  return formatTime;
}

const liveUpdateTime = (timeSnapshot) => {
  const time = document.querySelector('.WI_time');
  let unix = timeSnapshot;
  const clock = window.setInterval(() => {
    time.textContent = convertClockTime(unix++, "12L");
  }, 1000)
  return clock;
};
function formatPressure() {}
export {
  getTimeDifference,
  getCityTime,
  formatToDay,
  convertClockTime,
  formatTemp,
  getFutureTime,
  liveUpdateTime,
  capitalize,
};
