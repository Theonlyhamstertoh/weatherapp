const saveToLocal = (weatherObjectArray) => {
  localStorage.setItem('weatherInfo', JSON.stringify(weatherObjectArray));
}

const fetchLocal = () => {
  const weatherData = JSON.parse(localStorage.getItem('weatherInfo'));

  if(weatherData === null) {
    return {
      cards: [{id: "93a6", coords: {lon: 121.4581, lat: 31.2222}, city: "Shanghai"},
      {id: "f360", coords: {lon: 37.6156, lat: 55.7522}, city: "Moscow"},
      {id: "30b3", coords: {lon: -118.0373, lat: 33.817}, city: "Cypress"},
      {id: "3da5", coords: {lon: 19.0399, lat: 47.498}, city: "Budapest"},],
      settings: {
        units: "imperial",
        clockSystem: "12",
      },

    mainSearch: {
      city: "Rome",
      coords: {lat: 41.902782, lon: 12.496366}
    },
    cardsOnly: false,
    }
  } else {
    return weatherData;
  }
}

export {saveToLocal, fetchLocal};
