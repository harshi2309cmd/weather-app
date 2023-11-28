function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  let dateTimeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  dateTimeElement.innerHTML = formatDate(date);
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src= "${response.data.condition.icon_url}" class= "weather-app-icon"></img>`;
  console.log(response);
}

function searchCity(city) {
  let apiKey = "46t1d6250b9dfoaa4e1934e5af2ca368";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(updateWeather);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Paris");
