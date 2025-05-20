import { saveNoteOffline } from "./indexdb.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("noteForm");

  if (!form) {
    console.error("Nie znaleziono formularza #noteForm");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const city = document.getElementById("city").value;
    const note = document.getElementById("note").value;

    try {
      await saveNoteOffline({
        city,
        note,
        date: new Date()
      });

      alert("Notatka zapisana!");
      form.reset();
    } catch (err) {
      console.error("Błąd przy zapisie notatki:", err);
      alert("Wystąpił błąd podczas zapisu.");
    }
  });
});