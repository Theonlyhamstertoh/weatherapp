
const messages = {
  "01d": ["It's really", "sunny", "now."],
  "01n": ["Wow, it's already", "night", "time."],
  "02": ["These are", "clouds"," protecting you from sunburn"],
  "03": ["Less sun. More", "clouds.", "Life goes on."],
  "04": ["God bless those", "clouds."],
  "09": ["Nothing is as beautiful as" , "rain"],
  "10": ["Listen to the sounds of", "rain", "drops."],
  "11": ["THUNN THUNNN", "THUNN", "DERRRR",],
  "13": ["It's", "snowing", "you can build a snowman.",],
  "50": ["so", "misty.", "Don't get lost",],
}

const findMessage = (icon) => {
  switch (icon) {
    case "01d":
      return messages["01d"]
    case "01n":
      return messages["01n"]
    case "02d":
    case "02n":
      return messages["02"]
    case "03d":
    case "03n":
      return messages["03"]
    case "04d":
    case "04n":
      return messages["04"]
    case "09d":
    case "09n":
      return messages["09"]
    case "10d":
      return messages["10"]
    case "11d":
    case "11n":
      return messages["11"]
    case "13d":
    case "13n":
      return messages["14"]
    case "50d":
    case "50n":
      return messages["50"]
    default:
      return messages["0"]
  }
};

export default findMessage;