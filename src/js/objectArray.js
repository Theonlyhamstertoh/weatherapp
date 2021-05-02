import { fetchLocal } from "./localStorage";

const weatherItems = {
  current: [],
  daily: [],
  hourly: [],
  cards: [],
};

const data = fetchLocal();

export {weatherItems, data};

    //  {lat: 64.9841821,lon: -18.1059013}, {lat: 24.7736546, lon: -78.0000547}]

        // cards: ["london", "Tokyo", "Budapest", "Moscow", "Berlin"]