import { BodyPresenceSensor } from "body-presence";
import { BaseSensor } from "./BaseSensor";
import { formatTime } from "../utils/format";

export class BodyPresenceSensorWrapper extends BaseSensor {
  constructor() {
    super("BodyPresence");
    this.hardware = new BodyPresenceSensor();
  }

  getValue() {
    return {
      sensorName: this.sensorName,
      value: this.hardware.present ? "on-wrist" : "off-wrist",
      timestamp: this.timestamp || new Date().toISOString()
    };
  }

  //Gibt alle BodyPresence-Werte als String zurück (für Debugging)
  getValues() {
    return `${this.sensorName}: ${this.hardware.present ? "on-wrist" : "off-wrist"} [${this.timestamp}]`;
  }

  init(labelElement) {
    labelElement.value.text = "NaN";

    this.hardware.addEventListener("reading", () => {
      this.updateValue({ value: this.hardware.present ? "on-wrist" : "off-wrist" });
      labelElement.value.text = this.hardware.present ? "Body present: Yes" : "Body present: No";
      labelElement.timestamp.text = `@ ${formatTime(Date.now())}`;
      // Emittiere Event für Logger
      this.emit("myreading");
    });

    this.hardware.start();
  }
}

const bodyPresenceSensor = new BodyPresenceSensorWrapper();

export function initBodyPresence(labelElement) {
  bodyPresenceSensor.init(labelElement);
}

export { bodyPresenceSensor };