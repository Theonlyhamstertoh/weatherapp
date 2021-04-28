function importAll(r) {
  return r.keys().map(r);
}

const weatherIcon = importAll(
  require.context("../img/weather", false, /\.(png|jpe?g|svg)$/)
);

const extraInfoIcons = importAll(
  require.context("../img/icons", false, /\.(png|jpe?g|svg)$/)
);

const findExtraInfoIcons = (type) => {
  switch (type) {
    case "rain":
      return extraInfoIcons[0];
    case "dew":
      return extraInfoIcons[1];
    case "feels_like":
      return extraInfoIcons[2];
    case "humidity":
      return extraInfoIcons[3];
    case "pressure":
      return extraInfoIcons[4];
    case "uvi":
      return extraInfoIcons[5];
    case "visibility":
      return extraInfoIcons[6];
    case "wind":
      return extraInfoIcons[7];
    default:
      return extraInfoIcons[0];
  }
};
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
