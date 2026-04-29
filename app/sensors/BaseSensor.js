import { formatTime } from "../utils/format";


export class BaseSensor {
  constructor(sensorName) {
    this.sensorName = sensorName;
    this.currentValue = null;
    this.timestamp = null;
    this.listeners = []; // Liste für EventListener
  }

  //Registriert einen Listener für "myreading" Events
  addEventListener(eventType, callback) {
    if (eventType === "myreading") {
      this.listeners.push(callback);
    }
  }
  
  //Emittiert ein "myreading" Event an alle registrierten Listener
  emit(eventType) {
    if (eventType === "myreading") {
      this.listeners.forEach(callback => {
        callback(this.getValues());
      });
    }
  }
  
  //Abstrakte Methode - muss von Child-Klassen implementiert werden
  //Gibt die aktuellen Sensordaten als Objekt zurück
  getValue() {
    return {
      sensorName: this.sensorName,
      value: this.currentValue,
      timestamp: this.timestamp || new Date().toISOString()
    };
  }

  //Gibt alle Sensorwerte als String zurück (für Debugging)
  getValues() {
    return `${this.sensorName}: ${JSON.stringify(this.currentValue)} @[${this.timestamp}]`;
  }

  //Setzt den aktuellen Wert und den Timestamp
  updateValue(value) {
    this.currentValue = value;
    this.timestamp = new Date().toISOString();
  }
}
