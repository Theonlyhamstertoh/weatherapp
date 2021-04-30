const saveToLocal = (coords) => {
  localStorage.setItem('mainWeather', JSON.stringify(coords));
}

const fetchLocal = () => {
  const weatherData = JSON.parse(localStorage.getItem('mainWeather'));
  return weatherData;
}

export {saveToLocal, fetchLocal};
