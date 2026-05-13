import * as messaging from "messaging";
import { SERVER_URL } from "./config.js";

console.log("✅ Companion started");

let allMeasurements = [];
//let Messung = 0;

messaging.peerSocket.onmessage = (evt) => {

  console.log("⬇️[Companion] Daten erhalten");
  // Flach die einzelnen Datenpunkte hinzufügen, nicht das gesamte data Array
  allMeasurements.push(...evt.data.data);
  console.log("[Companion] Aktuelle Messung (JSON):", JSON.stringify(evt.data.data, null, 2));


  // Messung abgeschlossen
  if (evt.data.type === "measurement_complete") {
    // Messung++;
    console.log("[Companion] Messung abgeschlossen!");
    console.log(`[Companion] Messungsdauer: ${evt.data.duration}`);
    console.log('[Companion] Datenpunkte:', allMeasurements.length);
    console.log("[Companion] Alle Messungen:", JSON.stringify(allMeasurements, null, 2));
    sendToServer(allMeasurements,evt.data.duration,allMeasurements.length);
    clearMeasurements();
  }
};

messaging.peerSocket.onopen = () => {
  console.log("✅ Companion verbunden");
};

// async function sendUploadStatus(success, Messung, message) {
//   await Promise.resolve();

//   console.log("sendUploadStatus wurde aufgerufen");
//   console.log("Socket State:", messaging.peerSocket.readyState, messaging.peerSocket.OPEN);

//   if (messaging.peerSocket.readyState !== messaging.peerSocket.OPEN) {
//     return;
//   }
//   try{
//     messaging.peerSocket.send({
//         type: "upload_status",
//         index: Messung - 1,
//         text: success
//           ? `${Messung}. ${message}`
//           : `${Messung}. ${message}`
//       });
//       console.log("[Companion] Upload-Bestätigung gesendet an App");
//   }
//   catch(err) {
//     console.log("❌ Fehler beim Senden der Upload-Bestätigung:", err);
//   }
// };

function sendToServer(data, duration, dataCount) {
  fetch(SERVER_URL + "/save", {   
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ data, duration, dataCount })
  })
  .then(() => {
      //sendUploadStatus(true, Messung, "Daten erfolgreich geuploaded!");
      console.log("⬆️[Companion] Alle Daten geuploaded");
    }
  )
  .catch(err => {
    console.log("❌ Fehler:", err);
    console.log("❌ Fehler (string):", JSON.stringify(err));
    
    //sendUploadStatus(false, Messung, "Daten upload fehlgeschlagen!");
    //console.log("⬆️[Companion] Fehlermeldung gesendet an App");
    
  });
};

function clearMeasurements() {
  allMeasurements = [];
  //console.log("🧹 Alle Messungen gelöscht");
};