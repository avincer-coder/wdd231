const API_KEY = "700eea77ff92a81659d2b77e49103c7e";
const LAT = 20.0531;
const LON = -99.3417;

const CURRENT_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;
const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;

async function displayCurrentWeather() {
  try {
    const response = await fetch(CURRENT_WEATHER_URL);
    if (!response.ok) {
      throw new Error("Weather data not available");
    }

    const data = await response.json();

    const tempElement = document.getElementById("current-temp");
    const descElement = document.getElementById("weather-desc");
    const iconElement = document.getElementById("weather-icon");
    const humidityElement = document.getElementById("humidity");

    if (tempElement) {
      tempElement.textContent = `${Math.round(data.main.temp)}°C`;
    }

    if (descElement) {
      descElement.textContent = data.weather[0].description;
    }

    if (iconElement) {
      const iconCode = data.weather[0].icon;
      iconElement.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      iconElement.alt = data.weather[0].description;
    }

    if (humidityElement) {
      humidityElement.textContent = `${data.main.humidity}%`;
    }
  } catch (error) {
    const tempElement = document.getElementById("current-temp");
    if (tempElement) {
      tempElement.textContent = "N/A";
    }
  }
}

async function displayForecast() {
  try {
    const response = await fetch(FORECAST_URL);
    if (!response.ok) {
      throw new Error("Forecast data not available");
    }

    const data = await response.json();

    const forecasts = data.list
      .filter((item) => {
        return item.dt_txt.includes("12:00:00");
      })
      .slice(0, 3);

    forecasts.forEach((forecast, index) => {
      const dayElement = document.getElementById(`day${index + 1}-name`);
      const tempElement = document.getElementById(`day${index + 1}-temp`);

      if (dayElement && tempElement) {
        const date = new Date(forecast.dt * 1000);
        const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

        dayElement.textContent = `${dayName}:`;
        tempElement.textContent = `${Math.round(forecast.main.temp)}°C`;
      }
    });
  } catch (error) {
    // Forecast not available
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("current-temp")) {
    displayCurrentWeather();
    displayForecast();
  }
});
