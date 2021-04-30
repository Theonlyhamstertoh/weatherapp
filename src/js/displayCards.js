import { formatTemp } from "./utility";
import { weatherItems } from "./displayWeather";

const displayCards = (get) => {
  const todayData = get.weatherData.current;
  const city = get.cityInfo[0];
  const state = get.cityInfo[1];
  const temp = formatTemp(todayData.temp);
  const cardHTML = `
    <h4 class='card_title cardFS'>${city}, ${state}</h4>
    <div class='card_info'>
      <h1 class='card_temp tempFS'>${temp}</h1>
      <h5 class='card_unit titleFS'>°</h5>
    </div>
  `
  const id = randomId();
  const gridContainer = document.querySelector('.gridContainer');
  const createNewCard = document.createElement('div');

  const createCardFRAG = document.createRange().createContextualFragment(cardHTML);
  createNewCard.classList.add('card');
  createNewCard.dataset.id = id;

  //appends child to the the DOM 
  createNewCard.appendChild(createCardFRAG);
  gridContainer.appendChild(createNewCard)
  weatherItems.cards.push(createNewCard);
} 

function randomId() {
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

export default displayCards;