import "../sass/main.scss";
import { displayWeather } from "./displayWeather";
import { fetchUserInputLocation } from "./fetchWeather";
import { deleteCards, displayCards } from "./displayCards";
import { data } from "./objectArray";


const initialize = (() => {
  fetchUserInputLocation.coords(data.default.main)

  let index = 0;
  const interval = setInterval(() => {
    data.cardsOnly = true;
    fetchUserInputLocation.coords(data.default.cards[index++], true);
    if(index === data.default.cards.length) {
      clearInterval(interval)
    }
  }, 500)

  const searchInput = document.querySelector(".input_text");
  const cardSearchInput = document.querySelector(".card_input");
  
  const searchButton = document.querySelector(".input_button");
  searchButton.addEventListener("click", () => {
    fetchUserInputLocation.coords(searchInput);
  });
  
  const addCardButton = document.querySelector(".addButton");
  addCardButton.addEventListener("click", (e) => {
    if(cardSearchInput === '') return;
    data.cardsOnly = true;
    fetchUserInputLocation.coords(cardSearchInput, true);
  });
})();


