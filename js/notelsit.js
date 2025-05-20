import { getAllNotes } from './indexdb.js';
document.addEventListener('DOMContentLoaded', async () => {
  const notes = await getAllNotes();
  const container = document.getElementById('notesContainer');
  if (notes.length === 0) {
    container.innerHTML = "<p>Brak notatek.</p>";
    return;
  }
  const list = document.createElement('ul');
  notes.forEach(note => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${note.city}</strong><br />
      <br>${note.note}<br/>
      ${note.content || 'Brak treści pogodowych'}<br />
      <em>${note.date || 'brak daty'}</em>
    `;
    list.appendChild(li);
  });
  container.appendChild(list);
});
