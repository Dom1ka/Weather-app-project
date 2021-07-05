// Real time
let now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let realTime = document.querySelector("#real-time");
realTime.innerHTML = `${day}, ${hours}:${minutes}`;

// search location

function searchLocation(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city");
  let cityLocation = document.querySelector("#city-location");

  let units = "metric";
  let apiKey = "708c6e03dd68365a43c77d48ed40d262";
  let apiUrlTwo = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
  console.log(apiUrlTwo);

  if (searchInput.value) {
    cityLocation.innerHTML = `${searchInput.value}`;
  } else {
    alert("Please, search for a city");
  }
  axios.get(apiUrlTwo).then(showData);
}

let searchForm = document.querySelector("#search-bar");
searchForm.addEventListener("submit", searchLocation);

//
// MY LOCATION TEMPERATURE

//showData is STEP 4
function showData(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;

  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed * 3.6); //default is m/s

  let currentLocation = document.querySelector("#city-location");
  currentLocation.innerHTML = `${city}`;

  let currentTemp = document.querySelector(".current-temperature");
  currentTemp.innerHTML = `${temperature}`;

  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `${humidity} %`;

  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `${wind} km/h`;
}

//myPosition function is STEP 3
function myLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let units = "metric";
  let apiKey = "708c6e03dd68365a43c77d48ed40d262";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showData);
}

function currentLocation() {
  navigator.geolocation.getCurrentPosition(myLocation); // STEP 2
}

let myCurrentLocation = document.querySelector("#my-location"); // STEP 1
myCurrentLocation.addEventListener("click", currentLocation);

// Celsium to Fahrenheit convert

let celsiumTemperature = 14;
let fahrenheitTemperature = Math.round((celsiumTemperature * 9) / 5 + 32);

function celsium() {
  let currentTemperature = document.querySelector(".current-temperature");
  currentTemperature.innerHTML = `${celsiumTemperature}`;
}

let showCelsiumTemp = document.querySelector("#celsium");
showCelsiumTemp.addEventListener("click", celsium);

function fahrenheit() {
  let currentTemperature = document.querySelector(".current-temperature");
  currentTemperature.innerHTML = `${fahrenheitTemperature}`;
}

let showFahrenheitTemp = document.querySelector("#fahrenheit");
showFahrenheitTemp.addEventListener("click", fahrenheit);
