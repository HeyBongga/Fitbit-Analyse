import { Accelerometer } from "accelerometer";
import { formatTime } from "../utils/format";
import { BaseSensor } from "./BaseSensor";

export class AccelerometerSensor extends BaseSensor {
  constructor() {
    super("Accelerometer");
    this.hardware = new Accelerometer({ frequency: 1 });
    this.isSupported = !!Accelerometer;
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
   * Gibt alle Accelerometer-Werte als String zurück (für Debugging)
   */
  getValues() {
    return `${this.sensorName}: x=${this.hardware.x}, y=${this.hardware.y}, z=${this.hardware.z} @[${this.timestamp}]`;
  }

  init(labelElement) {
    if (this.isSupported) {
      //console.log("This device has an Accelerometer!");

      labelElement.value.text = "ACC: x: NaN, y: NaN, z: NaN";
      labelElement.timestamp.text = `@ ${formatTime(Date.now())}`;

      this.hardware.addEventListener("reading", () => {
        if (this.hardware.x === undefined || this.hardware.y === undefined || this.hardware.z === undefined) {
          labelElement.value.text = "ACC: x: NaN, y: NaN, z: NaN";
        } else {
          this.updateValue({ value: { x: this.hardware.x, y: this.hardware.y, z: this.hardware.z } });
          labelElement.value.text = `ACC: x: ${this.hardware.x.toFixed(2)}, y: ${this.hardware.y.toFixed(2)}, z: ${this.hardware.z.toFixed(2)}`;
          labelElement.timestamp.text = `@ ${formatTime(Date.now())}`;
          // Emittiere Event für Logger
          this.emit("myreading");
        }
      });

      this.hardware.start();
    } else {
      console.log("❌This device does NOT have an Accelerometer!");
      labelElement.value.text = "ACC: Not supported";
    }
  }
}

const accelerometerSensor = new AccelerometerSensor();

export function initAccelerometer(labelElement) {
  accelerometerSensor.init(labelElement);
}

export { accelerometerSensor };