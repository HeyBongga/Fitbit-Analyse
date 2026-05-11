import { Gyroscope } from "gyroscope";
import { formatTime } from "../utils/format";
import { BaseSensor } from "./BaseSensor";

export class GyroscopeSensor extends BaseSensor {
  constructor() {
    super("Gyroscope");
    console.log(`Gyroscope: ${Gyroscope}`);
    this.isSupported = typeof Gyroscope !== "undefined";

    if (this.isSupported) {
      this.hardware = new Gyroscope({ frequency: 1 });
    } else {
      this.hardware = null;
    }
  }

  getValue() {
    return {
      sensorName: this.sensorName,
      value: {
        x: this.hardware.x,
        y: this.hardware.y,
        z: this.hardware.z
      },
      timestamp: this.timestamp || new Date().toISOString()
    };
  }

  /**
   * Gibt alle Gyroscope-Werte als String zurück (für Debugging)
   */
  getValues() {
    return `${this.sensorName}: x=${this.hardware.x}, y=${this.hardware.y}, z=${this.hardware.z} [${this.timestamp}]`;
  }

  init(labelElement) {
    if (this.isSupported) {
      //console.log("This device has a Gyroscope!");

      labelElement.value.text = "GYRO: x: NaN, y: NaN, z: NaN";
      labelElement.timestamp.text = `@ ${formatTime(Date.now())}`;

      this.hardware.addEventListener("reading", () => {
        if (this.hardware.x === undefined || this.hardware.y === undefined || this.hardware.z === undefined) {
          labelElement.value.text = "Gyro: x: NaN, y: NaN, z: NaN";
        } else {
          this.updateValue({ value: { x: this.hardware.x, y: this.hardware.y, z: this.hardware.z } });
          labelElement.value.text = `Gyro: x: ${this.hardware.x}, y: ${this.hardware.y}, z: ${this.hardware.z} \n @ ${formatTime(Date.now())}`;
          labelElement.timestamp.text = `@ ${formatTime(Date.now())}`;
          // Emittiere Event für Logger
          this.emit("myreading");
        }
      });
      this.hardware.start();
    } else {
      console.log("❌This device does NOT have a Gyroscope!");
      labelElement.value.text = "Gyro: Not supported!";
    }
  }
}

const gyroscopeSensor = new GyroscopeSensor();

export function initGyroscope(labelElement) {
  gyroscopeSensor.init(labelElement);
}

export { gyroscopeSensor };