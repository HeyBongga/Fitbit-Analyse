import { BodyPresenceSensor } from "body-presence";
import { logPrototypeChain } from "../debug/prototype";
import { BaseSensor } from "./BaseSensor";

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
    labelElement.text = "NaN";

    this.hardware.addEventListener("reading", () => {
      this.updateValue({ value: this.hardware.present ? "on-wrist" : "off-wrist" });
      labelElement.text = this.hardware.present ? "Body present: Yes" : "Body present: No";
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