import displayWeather from "./displayWeather";

const getWeatherData = async (getCoord) => {
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
  const coords = async () => {
    const response = await fetch(
      requestCoords(defineSearchType(), { mode: "cors" })
    ).then((result) => result.json());
    displayWeather(response.coord);
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
  return { coords };
})();

const requestWeatherAPI = (coords, units) => {
  return `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&units=${units}&appid=70d3ce744008d557a872cee31d8820ce`;
};
const requestLocationDetails = (location) => {
  return `http://api.weatherapi.com/v1/forecast.json?key=4e4430f419224926bda142239212804&q=${location}`
}

const fetchCityInfo = async() => {
  const searchInput = document.querySelector(".input_text");
  if(searchInput.value !== '') {
    const getCityName = await fetch(requestLocationDetails(searchInput.value), { mode: "cors"}).then(response => response.json());
    const getRegion =  getCityName.location.region;
    const getCountry =  getCityName.location.country;
    const getCity =  getCityName.location.name;
    if (getCountry === 'United States of America') {
      return {getCity, getRegion};
    } else {
      return {getCity, getCountry};
    }
  }
}
export { getWeatherData, fetchUserInputLocation, fetchCityInfo };
