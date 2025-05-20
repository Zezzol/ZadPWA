import { getWeatherForCity } from "./weatherAPI.js";

window.getWeather = async function() {
  const city = document.getElementById("weatherCity").value;
  const resultDiv = document.getElementById("weatherResult");

  try {
    const weather = await getWeatherForCity(city);

    resultDiv.innerHTML = `
      <p><strong>${weather.city}, ${weather.country}</strong></p>
      <p>Temperatura: ${weather.temperature}°C</p>
      <p>Wiatr: ${weather.windspeed} km/h</p>
      <p>Czas pomiaru: ${weather.time}</p>
    `;

  } catch (err) {
    console.error(err);
    resultDiv.innerText = "Nie udało się pobrać danych.";
  }
};