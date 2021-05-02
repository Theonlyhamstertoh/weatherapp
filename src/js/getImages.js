// function that imports all image files from the specific folder.
function importAll(r) {
  return r.keys().map(r);
}

// import all images from the "weather" folder
const weatherIcon = importAll(
  require.context("../img/weather", false, /\.(png|jpe?g|svg)$/)
);

// import all images from the "icons" folder
const extraInfoIcons = importAll(
  require.context("../img/icons", false, /\.(png|jpe?g|svg)$/)
);

// return the correct icons based on the image type
const findExtraInfoIcons = (type) => {
  switch (type) {
    case "airQuality":
      return extraInfoIcons[0];
    case "rain":
      return extraInfoIcons[1];
    case "dew":
      return extraInfoIcons[2];
    case "feels_like":
      return extraInfoIcons[3];
    case "humidity":
      return extraInfoIcons[4];
    case "pressure":
      return extraInfoIcons[5];
    case "uvi":
      return extraInfoIcons[6];
    case "wind":
      return extraInfoIcons[7];
    case "delete":
      return extraInfoIcons[9];
    default:
      return extraInfoIcons[0];
  }
};

// return the correct icons based on the image type
const findWeatherIcon = (icon) => {
  switch (icon) {
    case "01d":
      return weatherIcon[0];
    case "01n":
      return weatherIcon[1];
    case "02d":
      return weatherIcon[2];
    case "02n":
      return weatherIcon[3];
    case "03d":
    case "03n":
      return weatherIcon[4];
    case "04d":
    case "04n":
      return weatherIcon[5];
    case "09d":
    case "09n":
      return weatherIcon[6];
    case "10d":
      return weatherIcon[7];
    case "10n":
      return weatherIcon[8];
    case "11d":
    case "11n":
      return weatherIcon[9];
    case "13d":
    case "13n":
      return weatherIcon[10];
    case "50d":
    case "50n":
      return weatherIcon[11];
    default:
      return weatherIcon[0];
  }
};

export { findWeatherIcon, findExtraInfoIcons };
