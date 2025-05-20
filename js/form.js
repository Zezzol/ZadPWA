import { saveNoteOffline } from "./indexdb.js";
import { getWeatherForCity } from "./weatherAPI.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("noteForm");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const city = document.getElementById("city").value;
    const noteText = document.getElementById("note").value;

    try {
      const weather = await getWeatherForCity(city);

      const weatherSummary = `
        Pogoda w ${weather.city}, ${weather.country}:
        Temperatura: ${weather.temperature}°C
        Wiatr: ${weather.windspeed} km/h
        Czas pomiaru: ${weather.time}
      `;

      await saveNoteOffline({
        city: weather.city,
        content: `${noteText}\n\n${weatherSummary}`,
        date: new Date().toISOString()
      });

      alert("Notatka z pogodą zapisana!");
      form.reset();

    } catch (err) {
      console.error(err);
      alert("Błąd podczas pobierania pogody lub zapisu notatki.");
    }
  });
});