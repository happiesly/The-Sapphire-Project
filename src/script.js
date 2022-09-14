function displayDate(dayTime) {
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = currentDate.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let month = currentDate.getMonth();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let date = currentDate.getDate();
  let year = currentDate.getFullYear();
  let dayArray = days[day];
  let monthArray = months[month];
  return `${dayArray}, ${monthArray} ${date}, ${year}. (${hours}:${minutes})`;
}
function arrangeDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecastDetails = response.data.daily;
  let forecast = document.querySelector(".forecast-panel");
  let forecastHTML = `<div class="row">`;
  forecastDetails.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-6">
      <div class="forecast-date">${arrangeDate(forecastDay.dt)}</div>
      <img src="http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png" alt="icon" width="48" />
      <span class="forecast-temp">
        <span class="forecast-temp-max">${Math.round(
          forecastDay.temp.max
        )}°/</span>
        <span class="forecast-temp-min">${Math.round(
          forecastDay.temp.min
        )}°</span>
      </span>

<div class="forecast-description"><em> ${
          forecastDay.weather[0].description
        }</em></div>
      ........................
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "0fbf741dd6f046088a411342ceb1813f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#degree").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#sky").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humid").innerHTML = response.data.main.humidity;
  document.querySelector("#windy").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document.querySelector("#sky").innerHTML =
    response.data.weather[0].description;
  document
    .querySelector("#weather-icon")
    .setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}
function search(city) {
  let apiKey = "0fbf741dd6f046088a411342ceb1813f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}
function handleSub(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

function findLocation(position) {
  let apiKey = "0fbf741dd6f046088a411342ceb1813f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
  console.log(apiUrl);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}

function showFahrenheit(event) {
  event.preventDefault;
  let temperatureId = document.querySelector("#degree");
  celsiusLink.classList.remove("active");
  fahrenheit.classList.add("active");
  let temperature = temperatureId.innerHTML;
  temperature = Number(temperature);
  temperatureId.innerHTML = Math.round((temperature * 9) / 5 + 32);
}
function showCelsius(event) {
  event.preventDefault;
  let celsiusDegree = document.querySelector("#degree");
  celsiusLink.classList.add("active");
  fahrenheit.classList.remove("active");
}
let dateId = document.querySelector("#date");
let currentDate = new Date();
dateId.innerHTML = displayDate(currentDate);

let searchId = document.querySelector("#search");
searchId.addEventListener("submit", handleSub);

let currentLocation = document.querySelector("#current-button");
currentLocation.addEventListener("click", getCurrentLocation);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

search("uyo");
