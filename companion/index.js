import * as messaging from "messaging";

console.log("Companion started");

let csv = "timestamp,x,y,z\n";
let isRecording = false;

messaging.peerSocket.onmessage = (evt) => {
  // Start/Stop Signal von der Watch
  if (evt.data.type === "measurement") {
    if (evt.data.action === "start") {
      isRecording = true;
      csv = "timestamp,x,y,z\n"; // Reset CSV
      console.log("Messung gestartet, CSV zurückgesetzt");
    } else if (evt.data.action === "stop") {
      isRecording = false;
      console.log("Messung gestoppt. Daten gesammelt:");
      console.log(csv);
    }
  } 
  // Sensordaten von der Watch empfangen
  else if (evt.data.type === "sensorData" && isRecording) {
    csv += `${evt.data.timestamp},${evt.data.x},${evt.data.y},${evt.data.z}\n`;
    console.log("Daten empfangen und in CSV geschrieben");
  }
};

messaging.peerSocket.onopen = () => {
  console.log("Companion verbunden");
};