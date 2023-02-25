function getCurrentDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = date.getDay();
  let dayList = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return `${dayList[day]} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}ºC`;
  document.querySelector(
    "#Humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#Wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )}km/h`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "c8735bb7e8e2f8d8a38c7501f3cd47d3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "c8735bb7e8e2f8d8a38c7501f3cd47d3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
let citySearch = document.querySelector("#citySearch");

citySearch.addEventListener("submit", handleSubmit);

dateElement.innerHTML = getCurrentDate(currentTime);

let currentLocationButton = document.querySelector("#currentLocationButton");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Sydney");
