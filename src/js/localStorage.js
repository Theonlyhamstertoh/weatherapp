const saveToLocal = (weatherObjectArray) => {
  localStorage.setItem('weatherInfo', JSON.stringify(weatherObjectArray));
}

const fetchLocal = () => {
  const weatherData = JSON.parse(localStorage.getItem('weatherInfo'));

  if(weatherData === null) {
    return {
      cards: [{id: "381c", coords: {lon: -0.1257, lat: 51.5085}}, {id: "a090", coords: {lon: 116.3972, lat: 39.9075}}],
      settings: {
        units: "imperial",
        clockSystem: "12",
      },
    mainSearch: {lat: 51.5074,lon: 0.1278},
    cardsOnly: false,
    }
  } else {
    return weatherData;
  }
}

export {saveToLocal, fetchLocal};
