let currentTime = new Date();
let h3 = document.querySelector("h3");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[currentTime.getDay()];
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
} else {
  minutes = minutes + "";
}
h3.innerHTML = `${day} ${hours}:${minutes}`;

function formatHours(timestamp) {
  let time = new Date(timestamp);
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function showWeather(response) {
  document.querySelector("#city-display").innerHTML = response.data.name;

  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = `Humidity: ${Math.round(
    response.data.main.humidity
  )}%`;
  document.querySelector("#pressure").innerHTML = `Pressure: ${Math.round(
    response.data.main.pressure
  )}mb`;
  document.querySelector("#wind").innerHTML = `Wind speed: ${Math.round(
    response.data.wind.speed
  )}km/h`;
  document.querySelector("#sunrise").innerHTML = formatHours(
    response.data.sys.sunrise * 1000
  );
  document.querySelector("#sunset").innerHTML = formatHours(
    response.data.sys.sunset * 1000
  );
}

function search(event) {
  event.preventDefault();
  let searchCityInput = document.querySelector("#city-search");
  let apiKey = "39faa63dc5dee7f7d77d1a54512a8f2d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCityInput.value}&units=metric&appid=${apiKey}`;

  let h1 = document.querySelector("#city-display");
  h1.innerHTML = `${searchCityInput.value}`;
  axios.get(apiUrl).then(showWeather);
}
let form = document.querySelector("#city-form");
form.addEventListener("submit", search);

function changeTempC(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temp");
  currentTemp.innerHTML = "19";
}

function changeTempF(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temp");
  currentTemp.innerHTML = "66";
}

let changeTempUnitC = document.querySelector("#temp-link-C");
changeTempUnitC.addEventListener("click", changeTempC);

let changeTempUnitF = document.querySelector("#temp-link-F");
changeTempUnitF.addEventListener("click", changeTempF);
