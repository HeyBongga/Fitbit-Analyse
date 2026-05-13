import * as document from "document";
import * as messaging from "messaging";

import { Clock } from "./clock";
import { initBodyPresence, bodyPresenceSensor } from "./sensors/bodypresence";
import { initHeartRate, heartRateSensor } from "./sensors/heartrate";
import { initAccelerometer, accelerometerSensor } from "./sensors/accelerometer";
import { initGyroscope, gyroscopeSensor } from "./sensors/Gyroscope";    
import { initSleep } from "./metrics/sleep";
import { initActivity } from "./metrics/excercise";
import { initProfile } from "./system/profile";
import { initPower } from "./system/power";
import { initOrientation, orientationSensor } from "./sensors/orientation";
import { datenLogger } from "./utils/logger";

////////////////////////////////////////////////////////////////////////
// Get references to the label elements in the document
const bg = document.getElementById("background");
const clockLabel = document.getElementById("clockLabel");
const toggleBtn = document.getElementById("toggleBtn");
const toggleBtnText = document.getElementById("toggleBtnText");
const batteryLabel = document.getElementById("batteryLabel");
const bodyPresenceLabel = document.getElementById("bodyPresenceLabel");
const bodyPresenceTimestamp = document.getElementById("bodyPresenceTimestamp");
const hrLabel1 = document.getElementById("hrLabel1");
const hrLabel2 = document.getElementById("hrLabel2");
const accLabel1 = document.getElementById("accLabel1");
const accLabel2 = document.getElementById("accLabel2");
const gyroLabel1 = document.getElementById("gyroLabel1");
const gyroLabel2 = document.getElementById("gyroLabel2"); 
const orientationLabel1 = document.getElementById("orientationLabel1");
const orientationLabel2 = document.getElementById("orientationLabel2");
const sleepLabel1 = document.getElementById("sleepLabel1");
const sleepLabel2 = document.getElementById("sleepLabel2");
const activityLabel1 = document.getElementById("activityLabel1");
const activityLabel2 = document.getElementById("activityLabel2");
const profileLabel = document.getElementById("profileLabel");

const loggerlabels = [
  document.getElementById("loggerLabel1"),
  document.getElementById("loggerLabel2"),
  document.getElementById("loggerLabel3"),
  document.getElementById("loggerLabel4"),
  document.getElementById("loggerLabel5")
];

/////////////////////////////////////////////////////////////////////////
// Initialize the clock and sensors with the respective label elements
const appClock = new Clock(clockLabel, bg, toggleBtn, toggleBtnText);
appClock.initClock();
appClock.setPages([
  document.getElementById("page0"),
  document.getElementById("page1"),
  document.getElementById("page2")
]);
appClock.attachEventListeners();
//////////////////////////////////////////////////////////////////////////
initBodyPresence({value: bodyPresenceLabel, timestamp: bodyPresenceTimestamp});
initHeartRate({value: hrLabel1,timestamp: hrLabel2});
initAccelerometer({value: accLabel1,timestamp: accLabel2});
initGyroscope({value: gyroLabel1,timestamp: gyroLabel2});
initOrientation({value: orientationLabel1,timestamp: orientationLabel2});
initSleep({value: sleepLabel1,timestamp: sleepLabel2});
initActivity({value: activityLabel1,timestamp: activityLabel2});
initProfile({value: profileLabel,timestamp: null});
initPower({value: batteryLabel,timestamp: null});
/////////////////////////////////////////////////////////////////////////
// Registriere alle Sensoren beim Logger
datenLogger.addSensor(heartRateSensor);
datenLogger.addSensor(bodyPresenceSensor);
datenLogger.addSensor(accelerometerSensor);
//datenLogger.addSensor(gyroscopeSensor);
//datenLogger.addSensor(orientationSensor);

console.log("✅[APP] Alle Sensoren beim Logger registriert");
/////////////////////////////////////////////////////////////////////////
// Messung Start/Stop und Datenverwaltung
let sendDataInterval = null;

appClock.onRecordingChange((isRecording) => {
  if (isRecording) {
    // ✅ MESSUNG STARTET
    datenLogger.startRecording();
    
    // Starte Timer: Sende Daten alle 60 Sekunden an Companion
    sendDataInterval = setInterval(() => {
      const dataToSend = datenLogger.sendCurrentData();
      
      if (dataToSend && messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        console.log(JSON.stringify(dataToSend).length);
        messaging.peerSocket.send({
          type: "measurement_data",
          action: "data_update",
          timestamp: dataToSend.timestamp,
          dataCount: dataToSend.dataCount,
          data: dataToSend.data
        });
        console.log(`⬆️[App] Sende ${datenLogger.getAllLogs().length} Datenpunkte an Companion...`);
        datenLogger.clearLogs(); // Optional: Logs nach Versand löschen, um Speicher zu sparen
      }
    }, 1000); // Alle ... Sekunden
    
  } else {
    // ⏹️ MESSUNG STOPPT    
    // Stoppe den Timer
    if (sendDataInterval) {
      clearInterval(sendDataInterval);
      sendDataInterval = null;
    }
    
    // Finale Daten speichern und versenden
    const recording = datenLogger.stopRecording();
    
    if (recording && messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      console.log(JSON.stringify(recording).length);
      messaging.peerSocket.send({
        type: "measurement_complete",
        action: "recording_stopped",
        timestamp: recording.endTime,
        duration: recording.duration,
        dataCount: recording.dataCount,
        data: recording.data
      });
      const index = recording.index-1;
      if(loggerlabels[index]) {
        loggerlabels[index].text = `Messung ${recording.index}: ${recording.duration}`;
      }

      console.log(`[App] ✅ Finale Messung versendet an Companion`);
      datenLogger.clearLogs(); // Optional: Logs nach Versand löschen
    }
  }
});

// messaging.peerSocket.onmessage = (evt) => {
//   console.log("⬇️[App] Nachricht vom Companion erhalten");

//   const data = evt.data;

//   if (!data || data.type !== "upload_status") {
//     return;
//   }
//   if(loggerlabels[data.index]) {
//     loggerlabels[data.index].text = data.text;
//   }
// }
/////////////////////////////////////////////////////////////////////////
