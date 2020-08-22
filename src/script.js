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
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function showTemperature(response) {
  celciusTemperature = response.data.main.temp;
  document.querySelector("#todayTemp").innerHTML = Math.round(
    celciusTemperature
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
  document
    .querySelector("#todayIcon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

function search(city) {
  let apiKey = "28f52080b9de7ad64256839acc8afe17";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#inputPassword2");
  search(cityInput.value);
}
search("Chicago");

let citySearch = document.querySelector("#city-button");
citySearch.addEventListener("click", handleSubmit);

function converttoFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#todayTemp");
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function converttoCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#todayTemp");
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", converttoFahrenheit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", converttoCelcius);
