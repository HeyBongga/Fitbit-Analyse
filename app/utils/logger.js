class DatenLogger {
  constructor() {
    this.logs = [];
  }

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
  addSensor(sensor) {
    sensor.addEventListener("reading", () => {
      const timestamp = new Date().toISOString();
      const value = sensor.value ||  || `${sensor.x},${sensor.y},${sensor.z}`;
      this.log(sensor.constructor.name, value, timestamp);
    }
}
}

// const datenLogger = new DatenLogger();

// datenLogger.log("Temperatur", "22.5°C");
// datenLogger.log("Luftfeuchtigkeit", "60%");
// datenLogger.log("Temperatur", "23.1°C");

// console.log(datenLogger.getAllLogs());
// console.log(datenLogger.getLogsBySensor("Temperatur"));
// console.log(datenLogger.exportAsJSON());