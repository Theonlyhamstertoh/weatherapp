const saveToLocal = (weatherData) => {
  localStorage.setItem('weatherData', JSON.stringify(weatherData));
}

const fetchLocal = () => {
  const weatherData = JSON.parse(localStorage.getItem('weatherData'));
  return weatherData;
}

export {saveToLocal, fetchLocal};
