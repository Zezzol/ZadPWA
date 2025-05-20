async function getWeather() {
  const city = document.getElementById("weatherCity").value;
  const resultDiv = document.getElementById("weatherResult");

  try {
    // Krok 1: Geokodowanie miasta → współrzędne (Open-Meteo nie obsługuje nazw miast bezpośrednio)
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
    const geoData = await geoRes.json();
    if (!geoData.results || geoData.results.length === 0) throw new Error("Nie znaleziono miasta");

    const { latitude, longitude, name, country } = geoData.results[0];

    // Krok 2: Pogoda bieżąca
    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
    const weatherData = await weatherRes.json();

    const weather = weatherData.current_weather;
    const weatherText = `
      <p><strong>${name}, ${country}</strong></p>
      <p>Temperatura: ${weather.temperature}°C</p>
      <p>Wiatr: ${weather.windspeed} km/h</p>
      <p>Czas pomiaru: ${weather.time}</p>
    `;

    resultDiv.innerHTML = weatherText;

  } catch (err) {
    console.error(err);
    resultDiv.innerText = "Nie udało się pobrać danych (offline lub brak miasta).";
  }
}