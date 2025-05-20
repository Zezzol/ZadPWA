if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("SW zarejestrowany"))
    .catch((err) => console.error("SW error:", err));
}
