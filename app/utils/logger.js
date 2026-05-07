class DatenLogger {
  constructor() {
    this.logs = [];
    this.sensors = [];
    this.isRecording = false;
    this.recordingStartTime = null;
    this.sendInterval = null;
  }

  //Startet die Messung - Logging aktivieren
  startRecording() {
    this.isRecording = true;
    this.recordingStartTime = new Date().toISOString();
    this.logs = []; // Alte Daten löschen
    console.log("[Logger] ▶️ Messung startet...");
    //console.log(`🔴 [Logger] Recording gestartet um ${this.recordingStartTime}`);
  }

  //Stoppt die Messung - Logging deaktivieren
  stopRecording() {
    this.isRecording = false;
    console.log("[Logger] ⏹️ Messung stoppt...");
    //console.log(`⏹️ [Logger] Recording gestoppt. ${this.logs.length} Datenpunkte gesammelt.`);
    return {
      startTime: this.recordingStartTime,
      endTime: new Date().toISOString(),
      dataCount: this.logs.length,
      data: [...this.logs]
    };
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
      timestamp: new Date().toISOString(),
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
      timestamp: timestamp || new Date().toISOString()
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