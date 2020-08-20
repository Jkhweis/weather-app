function formatDate(timestamp) {
  let now = new Date(timestamp);
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
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minute < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function showTemperature(response) {
  document.querySelector("#todayTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#humidityData").innerHTML =
    response.data.main.humidity;
  document.querySelector("#windData").innerHTML = response.data.wind.speed;
  document.querySelector("#todaysCondition").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#todaysDate").innerHTML = formatDate(
    response.data.dt * 1000
  );
}

function handleSubmit(event) {
  event.preventDefault();
  let apiKey = "28f52080b9de7ad64256839acc8afe17";
  let cityInput = document.querySelector("#enter-city").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let search = document.querySelector("#city-button");
search.addEventListener("click", handleSubmit);

function converttoFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#todayTemp");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function converttoCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#todayTemp");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", converttoFahrenheit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", converttoCelcius);
