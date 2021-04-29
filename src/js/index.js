import "../sass/main.scss";
import { fetchUserInputLocation } from "./fetchWeather";

const searchButton = document.querySelector(".input_button");
searchButton.addEventListener("click", fetchUserInputLocation.coords);


// const allCheckBox = document.querySelectorAll('input[type="checkbox"]');


// const buttonHandler = (e) => {
//   const temp = e.target.classList.contains('setting_temp');
//   const clock = e.target.classList.contains('setting_clock');
//   const mode = e.target.classList.contains('setting_mode');
//   if(e.target.checked) {
//     if(temp) {
//       console.log('temp'); 
//       displayWeather(weatherItems.coords)
//     } else if(clock) {
//       console.log('clock')
//     } else {
//       console.log('mode')
//     }
//   }
// } 

// allCheckBox.forEach(el => {
//   el.addEventListener('click', buttonHandler);
// })

