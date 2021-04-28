
const requestLocationDetails = (location) => {
  return `http://api.weatherapi.com/v1/forecast.json?key=4e4430f419224926bda142239212804&q=${location}`
}
const requestCity = (lat, lon) => {
  return ` https://eu1.locationiq.com/v1/reverse.php?key=pk.675a9bde9e55352626c5991da9954141&lat=${lat}&lon=${lon}&addressdetails=1&format=json`
}


const fetchCityInfo = async(lat, lon) => {
  const searchInput = document.querySelector(".input_text");
  if(searchInput.value !== '') {
    return await fetchCityWithInput(searchInput.value);
  } else {
    return await fetchCityWithoutInput(lat, lon) 
  }
}

async function fetchCityWithInput(location) {
  const getCityInfo = await fetch(requestLocationDetails(location), { mode: "cors"}).then(response => response.json());
  const state =  getCityInfo.location.region;
  const country =  getCityInfo.location.country;
  const city =  getCityInfo.location.name;
  if (country === 'United States of America') {
    return [city, state];
  } else {
    return [city, country];
  }
}

async function fetchCityWithoutInput(lat, lon) {
  const cityInfo = await fetch(requestCity(lat, lon), {
    mode: "cors",
  }).then((response) => response.json());

  const address = cityInfo.address;
  if(address.country_code === 'us') {
    return [address.city, address.state];
  } else {
    return [address.city, address.state];
  }
} 

export default fetchCityInfo;