function defineSearchType() {
  const searchInput = document.querySelector(".searchInput");
  const regex = new RegExp("^[0-9]+$");
  if (regex.test(searchInput.value)) {
    return `zip=${searchInput.value}`;
  }
  return `q=${searchInput.value}`;
}

const requestCoords = (location) =>
  `http://api.openweathermap.org/data/2.5/weather?appid=70d3ce744008d557a872cee31d8820ce&${location}`;



const requestWeatherAPI = (coords, units) =>
  `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&units=${units}&appid=70d3ce744008d557a872cee31d8820ce`;

let isWeatherFetched = false;
const getIsWeatherFetched = () => {
  return isWeatherFetched;
}
const updateIsWeatherFetched =(condition) => {
  return isWeatherFetched = condition;
}

async function getWeatherData(unit) {
  const response = await fetch(requestCoords(defineSearchType()), {
    mode: "cors",
  });
  const searchedLocation = await response.json();
  const fetchCoords = searchedLocation.coord;
  const allInOneResponse = await fetch(requestWeatherAPI(fetchCoords, unit), {
    mode: "cors",
  });
  const weatherData = await allInOneResponse.json();
  return weatherData;
}

export {
  defineSearchType,
  requestCoords,
  requestWeatherAPI,
  getWeatherData,
  getIsWeatherFetched, 
  updateIsWeatherFetched,
};
