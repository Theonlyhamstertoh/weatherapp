import "../sass/main.scss";
import { defineSearchType } from "./API";


const saveLocalStorage = () => {

};


const sendDataController = () => {

}

const getLocationTime = async () => {

}

const switchTemperatureUnits = () => {

}

function getNeededWeekData(weekData) {
  console.log(weekData);
}
function getNeededTodaydata(todayData) {
  console.log(todayData)
}
function getNeededHourlyData(hourlyData) {
  console.log(hourlyData)
}
function getNeededMinuteData(minuteData) {
  console.log(minuteData)
}

const getWeatherData = async (getCoord) => {
  try {
    const coords = await getCoord;
    const fetchData = await fetch(requestWeatherAPI(coords, "imperial"), {mode: "cors"}).then(response => response.json());
    return fetchData;

  } catch (err) {
    throw new Error(err);
  }
};



(async () => {
  if ("geolocation" in navigator) {
    const coords = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    })
      .then((result) => {
        return {
          lon: result.coords.longitude,
          lat: result.coords.latitude,
        };
      })
      .catch((reject) => reject);

    if(coords.code) return coords.message;
    getWeatherData(coords);
  } else {
    return;
  }
})();

const fetchUserInputLocation = (() => {
  const fetchCityCoords = async () => {
    const response = await fetch(
      requestCoords(defineSearchType(), { mode: "cors" })
    ).then((result) => result.json());
    getWeatherData(response.coord);
  };

  const defineSearchType = () => {
    const searchInput = document.querySelector(".input_text");
    const regex = new RegExp("^[0-9]+$");
    if (regex.test(searchInput.value)) {
      return `zip=${searchInput.value}`;
    }
    return `q=${searchInput.value}`;
  };

  const requestCoords = (location) => {
    return `http://api.openweathermap.org/data/2.5/weather?appid=70d3ce744008d557a872cee31d8820ce&${location}`;
  };
  return { fetchCityCoords};
})();

const requestWeatherAPI = (coords, units) => {
  return `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&units=${units}&appid=70d3ce744008d557a872cee31d8820ce`;
};

const searchButton = document.querySelector(".input_button");
searchButton.addEventListener("click", fetchUserInputLocation.fetchCityCoords);

// // although now we got the value well, we need a way to access that value and make the request. We need to request the value essentially.

// async function weatherDataController() {
//   try {
//     const weatherData = await getWeatherData();
//     updateIsWeatherFetched(true);
//     const todayData = weatherData.current;
//     const weekData = weatherData.daily;
//     const hourlyData = weatherData.hourly;
//     const minuteData = weatherData.minute;

//     getNeededWeekData(weekData);
//     getNeededTodaydata(todayData);
//     getNeededHourlyData(hourlyData);
//     getNeededMinuteData(minuteData);
//   } catch {
//     console.log("ERROR");
//   }
// }


// //by default, unit will be imperial. And the div should display F. If clicked, switch.
// const switchTemperatureUnits = (e) => {}
// // const tempUnitButton = document.querySelector('.tempUnit');
// // tempUnitButton.addEventListener('click', switchTemperatureUnits)
