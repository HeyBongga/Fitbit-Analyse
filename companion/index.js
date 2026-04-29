import * as messaging from "messaging";

console.log("Companion started");

let csv = "timestamp,x,y,z\n";
let isRecording = false;
let currentMeasurement = null;
let allMeasurements = [];

messaging.peerSocket.onmessage = (evt) => {
  // Alt: Start/Stop Signal von der Watch
  if (evt.data.type === "measurement") {
    if (evt.data.action === "start") {
      isRecording = true;
      csv = "timestamp,x,y,z\n"; // Reset CSV
      //console.log("📍 Messung gestartet, CSV zurückgesetzt");
    } else if (evt.data.action === "stop") {
      isRecording = false;
      //console.log("📍 Messung gestoppt. Daten gesammelt:");
      console.log(csv);
    }
  } 
  // Alt: Sensordaten von der Watch empfangen
  else if (evt.data.type === "sensorData" && isRecording) {
    csv += `${evt.data.timestamp},${evt.data.x},${evt.data.y},${evt.data.z}\n`;
    console.log("[Companion]📍 Daten empfangen und in CSV geschrieben");
  }

  // 🆕 NEU: Periodische Daten-Updates alle 60 Sekunden
  else if (evt.data.type === "measurement_data") {
    console.log("📤 [Companion] Daten Update erhalten");
    console.log(`   Zeitstempel: ${evt.data.timestamp}`);
    console.log(`   Datenpunkte: ${evt.data.dataCount}`);
    console.log(`   Daten:`, evt.data.data);
    
    currentMeasurement = {
      timestamp: evt.data.timestamp,
      dataCount: evt.data.dataCount,
      data: evt.data.data
    };
    
    // Optional: Exportieren als JSON
    console.log("📋 Aktuelle Messung (JSON):", JSON.stringify(currentMeasurement, null, 2));
  }

  // 🆕 NEU: Messung abgeschlossen - finale Daten
  else if (evt.data.type === "measurement_complete") {
    console.log("✅ [Companion] Messung abgeschlossen!");
    console.log(`   End-Zeitstempel: ${evt.data.timestamp}`);
    console.log(`   Gesamte Datenpunkte: ${evt.data.dataCount}`);
    
    const completeMeasurement = {
      type: "measurement_complete",
      timestamp: evt.data.timestamp,
      dataCount: evt.data.dataCount,
      data: evt.data.data
    };
    
    // Speichere die komplette Messung
    allMeasurements.push(completeMeasurement);
    console.log(`📦 Messung #${allMeasurements.length} gespeichert`);
    
    // Exportiere als JSON
    console.log("📋 Komplette Messung (JSON):", JSON.stringify(completeMeasurement, null, 2));
    
    // Optional: Speichern in Datei oder Cloud
    console.log("💾 Alle Messungen:", JSON.stringify(allMeasurements, null, 2));
  }
};

messaging.peerSocket.onopen = () => {
  console.log("✅ Companion verbunden");
};