import { getISODay } from "date-fns"
import { data } from "./objectArray"

const requestLocationDetails = (location) => {
  return `http://api.weatherapi.com/v1/forecast.json?key=4e4430f419224926bda142239212804&q=${location}&aqi=yes`
}
const requestCity = (lat, lon) => {
  return ` https://eu1.locationiq.com/v1/reverse.php?key=pk.675a9bde9e55352626c5991da9954141&lat=${lat}&lon=${lon}&addressdetails=1&format=json`
}

const fetchCityInfo = async(lat, lon, locallyStoredCity) => {
  const searchInput = document.querySelector(".input_text");
  const card_input = document.querySelector('.card_input')

  if(searchInput.value !== '' ) {
    return await fetchCityWithInput(searchInput.value);
  } else if (card_input.value !== '' && data.cardsOnly === true) {
    return await fetchCityWithInput(card_input.value);
  } else if(locallyStoredCity !== undefined) {
    return await fetchCityWithInput(locallyStoredCity);
  } else {
    const cityNameFromCoords = await fetchONLYCity(lat, lon);
    return await fetchCityWithInput(cityNameFromCoords) 
  }
}

async function fetchCityWithInput(location) {
  const getCityInfo = await fetch(requestLocationDetails(location), { mode: "cors"}).then(response => response.json());
  const airQuality =  getCityInfo.current.air_quality["us-epa-index"];
  const state =  getCityInfo.location.region;
  const country =  getCityInfo.location.country;
  const city =  getCityInfo.location.name;
  
  if (country === 'United States of America') {
    return [city, state, airQuality];
  } else {
    return [city, country, airQuality];
  }
}

async function fetchAirQuality(lat, lon) {
  const coords = lat + "," + lon;
  const getCityInfo = await fetch(requestLocationDetails(coords), { mode: "cors"}).then(response => response.json());
  return getCityInfo.current.air_quality["us-epa-index"];
}

async function fetchONLYCity(lat, lon) {
  const cityInfo = await fetch(requestCity(lat, lon), {
    mode: "cors",
  }).then((response) => response.json());
  const address = cityInfo.address;
  if(address.city === undefined) {
    return address.state
  }
  if(address.city === 'Shinjuku') return "Tokyo"
  return address.city;
} 

export default fetchCityInfo;