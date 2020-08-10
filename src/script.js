function formatDate() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let hours = [
    "12",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
  ];
  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let hour = hours[now.getHours()];
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let today = `${day}, ${month} ${date}, ${hour}:${minute}`;

  return today;
}

let currentDate = document.querySelector("li#todaysDate");

currentDate.innerHTML = formatDate();

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
