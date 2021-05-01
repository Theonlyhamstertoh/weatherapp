const saveToLocal = (weatherObjectArray) => {
  localStorage.setItem('weatherInfo', JSON.stringify(weatherObjectArray));
}

const fetchLocal = () => {
  const weatherData = JSON.parse(localStorage.getItem('weatherInfo'));
  return weatherData;
}

export {saveToLocal, fetchLocal};
