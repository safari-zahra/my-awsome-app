 //const { default: axios } = require("axios");


let apiKey="8f2374b487bf3796819ba34bbaf253b4";


let now = new Date();

let day = now.getDay();
let hour = now.getHours();
let min = now.getMinutes();
let daysWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let time = "".concat(daysWeek[day], " , ").concat(hour, ":").concat(min);
let date = document.querySelector("#date");
date.innerHTML = time;

let searchForm = document.querySelector("#search-form");

let current = "isfahan";

function showCityName(isCurrent = false) {

  let cityInput = isCurrent ? current : document.querySelector("#city-input").value;
  let cityName = document.querySelector("#city");
  let weatherType = document.querySelector("#weather-type");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector("#icon");
 // let aa ="https://api.openweathermap.org/data/2.5/weather?q=London&appid=94e4cb4000e002bf1b316d0d3bb17f2c"
   let URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`

  axios.get(URL)
  .then(function (response) {
    // handle success
      console.log(response.data.weather[0].icon);
    cityName.innerHTML= response.data.name;
      weatherType.innerHTML = response.data.weather[0].description;
      humidity.innerHTML = `${response.data.main.humidity}%`;
      wind.innerHTML = `${response.data.wind.speed} Km/h`;
      icon.setAttribute("src" , `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
      icon.setAttribute("alt" , response.data.name );

     // document.querySelector("#app").innerHTML = templateEng({city:response.data.name},document.querySelector("#app").innerHTML);
  })

  //cityName.innerHTML = cityInput; // document.getElementById("#city-input").value;
}

// function templateEng(params,html){
//   for(param in params){
//     var replace = "/\{\{"+params[param]+"\}\}/g";
//     var re = new RegExp(replace,"g");
//     html.replace(re,param);
//   }
//   return html;
// }

document.getElementById('location-button').addEventListener("click", () => {showCityName(false)});
document.getElementById('current-location-button').addEventListener("click", () => {showCityName(true)});


var apiUrlGeo = `http://api.openweathermap.org/geo/1.0/direct?q=Isfahan&appid=${apiKey}`;
console.log(apiUrlGeo)


function handlePosition(){
  let cityName = document.querySelector("#city");
 // navigator.geolocation.getCurrentPosition(showPosition)

 axios.get(apiUrlGeo).then(function (response){
  console.log(response);

  cityName.innerHTML=response.data[0].name;
  
})
}


 let currentLocation= document.querySelector("#current-location-button");
 currentLocation.addEventListener("click", handlePosition);


// function showPosition(position) {
//   console.log('showPosition')
//   console.log(position)
// }


function tofahrenheit(event) {
  event.preventDefault();
  let Celsius = 17; // in Celsius

    let cToFahr = Celsius * 9 / 5 + 32;
    let temperature = document.querySelector("#temperature");
  temperature.innerHTML = cToFahr;
}

 let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", tofahrenheit);
var celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", tocelsius);

function tocelsius(event) {
  event.preventDefault();
    let Celsius = 5 / 9 * (62.6 - 32);
    let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Celsius;
}