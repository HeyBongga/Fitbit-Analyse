class DatenLogger {
  constructor() {
    this.logs = [];
    this.sensors = [];
    this.isRecording = false;
    this.recordingStartTime = null;
    this.recordingEndTime = null;
    this.sendInterval = null;
    this.index = 0;
  }

  //Startet die Messung - Logging aktivieren
  startRecording() {
    this.isRecording = true;
    this.recordingStartTime = new Date();
    this.logs = []; // Alte Daten löschen
    console.log("[Logger] ▶️ Messung startet...");
  }

  //Stoppt die Messung - Logging deaktivieren
  stopRecording() {
    this.isRecording = false;
    this.recordingEndTime = new Date();
    console.log("[Logger] ⏹️ Messung stoppt...");
    this.index++;
    return {
      index: this.index,
      startTime: this.recordingStartTime,
      endTime: this.recordingEndTime,
      duration: this.getRecordingDuration(),
      dataCount: this.logs.length,
      data: [...this.logs]
    };
  }

  getRecordingDuration() {
    if (this.recordingStartTime && this.recordingEndTime) {
      const durationMs = this.recordingEndTime - this.recordingStartTime;
      //Umrechnung
      const totalSeconds = Math.floor(durationMs / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const remainingSeconds = totalSeconds % 60;

      // Schöner String
      let durationText = "";

      if (hours > 0) {
        durationText += `${hours}h `;
      }

      if (minutes > 0 || hours > 0) {
        durationText += `${minutes}min `;
      }

      durationText += `${remainingSeconds}sek`;

    }
    return durationText.trim();
  }

  // Gibt den aktuellen Recording-Status zurück
  getRecordingStatus() {
    return this.isRecording;
  }

  // Gibt die gesammelten Daten zurück und leert den Logger
  sendCurrentData() {
    if (!this.isRecording) {
      return null;
    }
    
    const dataToSend = {
      timestamp: new Date(),
      dataCount: this.logs.length,
      data: [...this.logs] 
    };
    
    return dataToSend;
  }

  // Fügt einen Sensor zum Logger hinzu und registriert einen Listener für dessen Daten
  addSensor(sensor) {
    if (!sensor) {
      console.error("Sensor ist null oder undefined");
      return;
    }

    this.sensors.push(sensor);
    console.log(`✅[Logger] Sensor "${sensor.sensorName}" registriert`);

    // Registriere einen Listener auf den Sensor
    // Der Sensor sendet die Daten automatisch via emit("myreading")
    sensor.addEventListener("myreading", (data) => {
      // NUR LOGGEN WENN RECORDING AKTIV IST!
      if (this.isRecording) {
        //console.log(`[Logger]: ${data}`);
        this.logs.push(data);
      }
    });
  }

  //Loggt manuell mit Namen und Wert
  log(sensorName, sensorValue, timestamp = null) {
    const entry = {
      sensorName: sensorName,
      sensorValue: sensorValue,
      timestamp: timestamp || new Date()
    };
    this.logs.push(entry);
  }

  getAllLogs() {
    return this.logs;
  }

  getLogsBySensor(sensorName) {
    return this.logs.filter(log => log.sensorName === sensorName);
  }

  clearLogs() {
    this.logs = [];
  }
}

const datenLogger = new DatenLogger();

export { datenLogger };