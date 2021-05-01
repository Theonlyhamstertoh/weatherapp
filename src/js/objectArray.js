const weatherItems = {
  current: [],
  daily: [],
  hourly: [],
  cards: [],
};

const data = {
  cardCoords: [],
  settings: {
    units: "imperial",
    clockSystem: "12",
  },
  default: {
    main: "Moscow",
    cards: ["london", "Tokyo", "Budapest", "Moscow", "Berlin"]
  },
  searched_Coords: [],
  cardsOnly: false,
}

export {weatherItems, data};

    //  {lat: 64.9841821,lon: -18.1059013}, {lat: 24.7736546, lon: -78.0000547}]