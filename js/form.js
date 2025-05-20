import { saveNoteOffline } from "./indexdb.js";
import { getWeatherForCity } from "./weatherAPI.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("noteForm");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const city = document.getElementById("city").value;
    const noteText = document.getElementById("note").value;

    let weatherSummary = null;

    try {
      const weather = await getWeatherForCity(city);

      weatherSummary = `

      Pogoda w ${weather.city}, ${weather.country}:
      Temperatura: ${weather.temperature}°C
      Wiatr: ${weather.windspeed} km/h
      `.trim();
    } catch (err) {
      console.warn("Nie udało się pobrać danych pogodowych:", err);
    }

    try {
      await saveNoteOffline({
        city,
        noteText,
        content: weatherSummary ? `\n${weatherSummary}` : "",
        date: new Date().toISOString()
      });

      alert("Notatka zapisana!");
      form.reset();
    } catch (err) {
      console.error("Błąd zapisu notatki:", err);
      alert("Wystąpił błąd podczas zapisu notatki.");
    }
  });
});
