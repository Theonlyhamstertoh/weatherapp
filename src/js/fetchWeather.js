import {displayWeather} from "./displayWeather";
const getWeatherData = async (getCoord, units) => {
  try {
    const coords = getCoord;
    const fetchData = await fetch(requestWeatherAPI(coords, "imperial"), {
      mode: "cors",
    }).then((response) => response.json());
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

    if (coords.code) return coords.message;
    displayWeather(coords);
  } else {
    return;
  }
})();

const fetchUserInputLocation = (() => {
  const coords = async (searchInput, cardsOnly) => {
    const response = await fetch(
      requestCoords(defineSearchType(searchInput), { mode: "cors" })
    ).then((result) => result.json());
    
    displayWeather(response.coord, cardsOnly);
  };

  const defineSearchType = (searchInput) => {
    const regex = new RegExp("^[0-9]+$");
    if (regex.test(searchInput.value)) {
      return `zip=${searchInput.value}`;
    }
    return `q=${searchInput.value}`;
  };

  const requestCoords = (location) => {
    return `http://api.openweathermap.org/data/2.5/weather?appid=70d3ce744008d557a872cee31d8820ce&${location}`;
  };
  return { coords };
})();

const requestWeatherAPI = (coords, units) => {
  return `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&units=${units}&appid=70d3ce744008d557a872cee31d8820ce`;
};

export { getWeatherData, fetchUserInputLocation };
