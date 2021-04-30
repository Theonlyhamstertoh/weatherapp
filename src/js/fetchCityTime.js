import {
  differenceInHours,
  differenceInMilliseconds,
  differenceInMinutes,
  differenceInSeconds,
  format,
  fromUnixTime,
  getUnixTime,
} from "date-fns";

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

  // get difference in minutes and convert to hours
  const timeDifference = (differenceInMinutes(localTime, formatCityTime) / 60).toFixed(0);

  if (Math.sign(timeDifference) === -1) {
    return Math.abs(timeDifference) + " hours ahead";
  } else if (Math.sign(timeDifference) === 1) {
    return Math.abs(timeDifference) + " hours behind";
  } else if (Math.abs(Math.sign(timeDifference)) === 0) {
    return "";
  }
}

function convertClockTime(time, clockType) {
  const date = fromUnixTime(time);
  if (clockType === "12L") {
    return format(date, "pp");
  } else if (clockType === "12") {
    return format(date, "haaa");
  } else if (clockType === "24") {
    return format(date, "H:mm:ss");
  }
}

function formatToDay(time) {
  const date = fromUnixTime(time);
  return format(date, "EEEE");
}

function getFutureTime(currentLocationTime, futureTime) {
  const timeDifference = differenceInMilliseconds(
    getUnixTime(new Date()),
    futureTime
  );
  const forecastTime = currentLocationTime + -timeDifference;
  const formatTime = convertClockTime(forecastTime, "12");
  return formatTime;
}

const liveUpdateTime = (timeSnapshot) => {
  const time = document.querySelector(".WI_time");
  let unix = timeSnapshot;
  const clock = window.setInterval(() => {
    time.textContent = convertClockTime(unix++, "24");
  }, 1000);
  return clock;
};
export {
  getTimeDifference,
  getCityTime,
  formatToDay,
  convertClockTime,
  getFutureTime,
  liveUpdateTime,
};