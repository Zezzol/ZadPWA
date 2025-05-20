export async function getWeatherForCity(city) {
  const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
  const geoData = await geoRes.json();
  if (!geoData.results || geoData.results.length === 0) throw new Error("Nie znaleziono miasta");

  const { latitude, longitude, name, country } = geoData.results[0];

  const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
  const weatherData = await weatherRes.json();
  const weather = weatherData.current_weather;

  return {
    city: name,
    country,
    temperature: weather.temperature,
    windspeed: weather.windspeed,
    time: weather.time,
  };
}