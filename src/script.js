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
let dateId = document.querySelector("#date");
let currentDate = new Date();
dateId.innerHTML = displayDate(currentDate);
