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

function showWeather(response) {
  console.log(response.data);
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
}
function search(city) {
  let apiKey = "e0a5a97de9a0b7a951e9d154a8f9bad8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}
function handleSub(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

function findLocation(position) {
  let apiKey = "e0a5a97de9a0b7a951e9d154a8f9bad8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
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
