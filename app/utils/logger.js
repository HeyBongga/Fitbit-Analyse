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
    console.log(`🔴 [Logger] Recording gestartet um ${this.recordingStartTime}`);
  }

  //Stoppt die Messung - Logging deaktivieren
  stopRecording() {
    this.isRecording = false;
    console.log(`⏹️ [Logger] Recording gestoppt. ${this.logs.length} Datenpunkte gesammelt.`);
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
    
    console.log(`📤 [Logger] Sende ${this.logs.length} Datenpunkte an Companion...`);
    return dataToSend;
  }

  // Fügt einen Sensor zum Logger hinzu und registriert einen Listener für dessen Daten
  addSensor(sensor) {
    if (!sensor) {
      console.error("Sensor ist null oder undefined");
      return;
    }

    this.sensors.push(sensor);
    console.log(`[Logger] Sensor "${sensor.sensorName}" registriert`);

    // Registriere einen Listener auf den Sensor
    // Der Sensor sendet die Daten automatisch via emit("myreading")
    sensor.addEventListener("myreading", (data) => {
      // NUR LOGGEN WENN RECORDING AKTIV IST!
      if (this.isRecording) {
        console.log(`✅[Logger]: ${data}`);
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

  exportAsJSON() {
    return JSON.stringify(this.logs, null, 2);
  }

  //Exportiert Logs als CSV Format
  exportAsCSV() {
    if (this.logs.length === 0) return "";

    // Bestimme alle Keys aus den Logs
    const keys = new Set();
    this.logs.forEach(log => {
      Object.keys(log).forEach(key => keys.add(key));
    });

    const keyArray = Array.from(keys);
    const csv = [keyArray.join(",")];

    this.logs.forEach(log => {
      const row = keyArray.map(key => log[key] || "");
      csv.push(row.join(","));
    });

    return csv.join("\n");
  }
}

const datenLogger = new DatenLogger();

export { datenLogger };