const DB_NAME = "WeatherNoteDB";
const DB_VERSION = 2;
const STORE_NOTES = "notes";

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject("Błąd podczas otwierania bazy IndexedDB.");
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains(STORE_NOTES)) {
        const store = db.createObjectStore(STORE_NOTES, { keyPath: "id", autoIncrement: true });
        store.createIndex("city", "city", { unique: false });
      }
    };
  });
}

export async function saveNoteOffline(noteData) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NOTES, "readwrite");
    const store = tx.objectStore(STORE_NOTES);

    const req = store.add(noteData);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function getAllNotes() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NOTES, "readonly");
    const store = tx.objectStore(STORE_NOTES);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}