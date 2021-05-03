import { displayCards } from "./displayCards";
import { displayWeather } from "./displayWeather";
import { getCityTime } from "./fetchCityTime";
import fetchCityInfo from "./fetchCityName";
import { data } from "./index";

// returns the data needed for the functions. 
async function getNecessaryWeatherData(coords, localStoredCity) {
  const weatherData = await getWeatherData(coords);
  let cityInfo;

  // if retrieving from local storage, send the city name to be fetched instead of coords for greater accucracy in the CITY LOCATION NAMING
  if(localStoredCity !== undefined) {
    cityInfo = await fetchCityInfo(undefined, undefined, localStoredCity);
  } else {
    cityInfo = await fetchCityInfo(coords.lat, coords.lon);
  }
  const Unixtime = getCityTime(weatherData.timezone_offset);
  return { weatherData, cityInfo, Unixtime };
}

// retrieve the weather data
const getWeatherData = async (getCoord) => {
  try {
    const coords = getCoord;
    const fetchData = await fetch(
      requestWeatherAPI(coords, data.settings.units),
      {
        mode: "cors",
      }
    ).then((response) => response.json());
    return fetchData;
  } catch (err) {
    const showError = document.querySelector('.showError');
    showError.textContent = 'Unable to find city';
    showError.classList.add('animateOut');
    window.setTimeout(() => showError.classList.remove('animateOut'), 500)
    throw new Error(err);
  }
};

// fetch user geolocation if user allows and use that data to be placed
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

    if (coords.code) return coords.message;
    displayWeather(coords);
  } else {
    return;
  }
})();


const fetchUserInputLocation = (() => {
  // convert the search input into coordinate values
  const coords = async (searchInput, cardsOnly) => {
    const response = await fetch(
      requestCoords(defineSearchType(searchInput), { mode: "cors" })
    ).then((result) => result.json());

    if (data.cardsOnly === true) {
      displayCards(response.coord); 
    } else {
      displayWeather(response.coord);
    }
  };

  // define the search type so that the values are correctly put into place
  const defineSearchType = (searchInput) => {
    if(typeof(searchInput ) === typeof('string')) {
      return `q=${searchInput}`;
    }
    const regex = new RegExp("^[0-9]+$");
    if (regex.test(searchInput.value)) {
      return `zip=${searchInput.value}`;
    }
    return `q=${searchInput.value}`;
  };

  const requestCoords = (location) => {
    return `https://api.openweathermap.org/data/2.5/weather?appid=70d3ce744008d557a872cee31d8820ce&${location}`;
  };
  return { coords };
})();

const requestWeatherAPI = (coords, units) => {
  return `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&units=${units}&appid=70d3ce744008d557a872cee31d8820ce`;
};

export { fetchUserInputLocation, getNecessaryWeatherData };
