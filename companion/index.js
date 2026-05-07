import * as messaging from "messaging";

console.log("✅ Companion started");

let allMeasurements = [];

messaging.peerSocket.onmessage = (evt) => {

  console.log("⬇️[Companion] Daten erhalten");
  // Flach die einzelnen Datenpunkte hinzufügen, nicht das gesamte data Array
  allMeasurements.push(...evt.data.data);
  console.log("[Companion] Aktuelle Messung (JSON):", JSON.stringify(evt.data.data, null, 2));


  // Messung abgeschlossen
  if (evt.data.type === "measurement_complete") {
    console.log("[Companion] Messung abgeschlossen!");
    console.log('[Companion] Datenpunkte:', allMeasurements.length);
    console.log("[Companion] Alle Messungen:", JSON.stringify(allMeasurements, null, 2));
    sendToServer(allMeasurements);
    console.log("⬆️[Companion] Alle Daten geuploaded");
    clearMeasurements();
  }
};

messaging.peerSocket.onopen = () => {
  console.log("✅ Companion verbunden");
};

function sendToServer(data) {
  fetch("https://shortcut-unworn-greedless.ngrok-free.dev/save", {   // ⬅️ DEINE IP! ngrok-WebInterface: http://127.0.0.1:4040
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(() => console.log("✅ Daten erfolgreich gesendet"))
  .catch(err => {
    console.log("❌ Fehler:", err);
    console.log("❌ Fehler (string):", JSON.stringify(err));
});
}

function clearMeasurements() {
  allMeasurements = [];
  //console.log("🧹 Alle Messungen gelöscht");
}