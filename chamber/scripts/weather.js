// Apia, Samoa
const WEATHER_API_KEY = "1ac8a89ab0dfe30a5d46a20e32f01a90";
const LAT = -13.8333;
const LON = -171.7667;
const UNITS = "metric"; // Celsius

async function getWeatherData() {
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${WEATHER_API_KEY}&units=${UNITS}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&appid=${WEATHER_API_KEY}&units=${UNITS}`;

  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentUrl),
      fetch(forecastUrl),
    ]);

    if (!currentRes.ok || !forecastRes.ok) {
      throw new Error("Weather API error");
    }

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    displayCurrentWeather(currentData);
    displayForecast(forecastData);
  } catch (error) {
    console.error("Error loading weather:", error);
    const desc = document.getElementById("current-desc");
    if (desc) desc.textContent = "Weather data not available.";
  }
}

function displayCurrentWeather(data) {
  const tempElem = document.getElementById("current-temp");
  const descElem = document.getElementById("current-desc");

  if (!tempElem || !descElem) return;

  const temp = Math.round(data.main.temp);
  const description = data.weather[0].description || "";

  tempElem.textContent = temp;
  descElem.textContent =
    description.charAt(0).toUpperCase() + description.slice(1);
}

function displayForecast(data) {
  const container = document.getElementById("weather-forecast");
  if (!container) return;

  container.innerHTML = "";

  // 3-day forecast
  const indexes = [8, 16, 24]; // 24h apart
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  indexes.forEach((i) => {
    const entry = data.list[i];
    if (!entry) return;

    const date = new Date(entry.dt * 1000);
    const dayName = dayNames[date.getDay()];
    const temp = Math.round(entry.main.temp);
    const description = entry.weather[0].description || "";

    const card = document.createElement("article");
    card.classList.add("forecast-day");

    card.innerHTML = `
      <h3>${dayName}</h3>
      <p class="forecast-temp">${temp}°C</p>
      <p class="forecast-desc">${
        description.charAt(0).toUpperCase() + description.slice(1)
      }</p>
    `;

    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", getWeatherData);
