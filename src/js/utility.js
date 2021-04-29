const switchTimeTo24Hours = () => {};

const showDefault = () => {};

const throwErrorIfNotFound = () => {};

function formatTemp(temperature) {
  return Math.round(temperature);
}

function formatUnits(units) {
  if (units === "imperial") {
    return "°F";
  } else {
    return "°C";
  }
}

function formatDistance(data, units) {
  if (units === "imperial") {
    return data + "mph";
  } else {
    return data + "m/s";
  }
}

function capitalize(text) {
  return text
    .toLowerCase()
    .split(" ")
    .map((str) => str.charAt(0).toUpperCase() + str.substring(1))
    .join(" ");
}

export { formatTemp, capitalize, formatUnits, formatDistance };
