async function retrieveWeatherData() {
  try {
    const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?appid=70d3ce744008d557a872cee31d8820ce&${"q=cypress"}`,
        { mode: "cors" }
    );

    if(response.status !== 200) {
        throw new Error();
    }

    const weatherData = await response.json();
    console.log(weatherData.main.temp);
    console.log(weatherData.main.feels_like);
    console.log(weatherData.main.humidity);
    console.log(weatherData.main.temp_max);
    console.log(weatherData.main);
    console.log(weatherData.weather[0].description);
    console.log(weatherData.weather[0].icon);

  } 
  catch {
    console.log('ERRORR ERREOR');
    throwErrorMessage();
  }


}

async function searchByHow() {}

console.log("aksjdlakdjaslkdjalskdjalksdjalksd");
retrieveWeatherData();

function displayData() {}

function getUserLocation() {}

function fetchWeather() {}

function throwErrorMessage() {}

function kelvinToCelsius() {

}
function kelvinToFahrenheit() {
    
}

//there is multiple ways of retrieving data. One way is by city, another by zip code and country, we need to account for all the ways
// detect if user inputted a coutry
