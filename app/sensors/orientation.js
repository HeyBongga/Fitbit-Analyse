import { OrientationSensor } from "orientation";
import { display } from "display";
import { formatTime } from "../utils/format";
import { BaseSensor } from "./BaseSensor";

export class OrientationSensorWrapper extends BaseSensor {
  constructor() {
    super("Orientation");
    this.isSupported = typeof OrientationSensor !== "undefined";

    if (this.isSupported) {
      this.hardware = new OrientationSensor({ frequency: 1 });
    } else {
      this.hardware = null;
    }
  }

  getValue() {
    return {
      sensorName: this.sensorName,
      value: {
        q0: this.hardware.quaternion[0],
        q1: this.hardware.quaternion[1],
        q2: this.hardware.quaternion[2],
        q3: this.hardware.quaternion[3]
      },
      timestamp: this.timestamp || new Date().toISOString()
    };
  }

  /**
   * Gibt alle Orientation-Werte als String zurück (für Debugging)
   */
  getValues() {
    const [q0, q1, q2, q3] = this.hardware.quaternion;
    return `${this.sensorName}: q0=${q0}, q1=${q1}, q2=${q2}, q3=${q3} [${this.timestamp}]`;
  }

  init(labelElement) {
    if (this.isSupported) {
      //console.log("This device has an Orientation sensor!");

      labelElement.value.text = "Orientation: q0: NaN, q1: NaN, q2: NaN, q3: NaN";
      labelElement.timestamp.text = `@ ${formatTime(Date.now())}`;

      this.hardware.addEventListener("reading", () => {
        this.updateValue({
          value: {
            q0: this.hardware.quaternion[0],
            q1: this.hardware.quaternion[1],
            q2: this.hardware.quaternion[2],
            q3: this.hardware.quaternion[3]
          }
        });

        console.log(
          `Orientation Reading: timestamp=${this.hardware.timestamp}, [${this.hardware.quaternion[0]}, ${this.hardware.quaternion[1]}, ${this.hardware.quaternion[2]}, ${this.hardware.quaternion[3]}]`
        );

        labelElement.value.text = `Orientation: q0: ${this.hardware.quaternion[0]}, q1: ${this.hardware.quaternion[1]}, q2: ${this.hardware.quaternion[2]}, q3: ${this.hardware.quaternion[3]}`;
        labelElement.timestamp.text = `@ ${formatTime(this.hardware.timestamp)}`;
        // Emittiere Event für Logger
        this.emit("myreading");
      });

      display.addEventListener("change", () => {
        display.on ? this.hardware.start() : this.hardware.stop();
      });

      this.hardware.start();
    } else {
      console.log("❌This device does NOT have an Orientation sensor!");
      labelElement.value.text = "Orientation: Not supported!";
    }
  }
}

const orientationSensor = new OrientationSensorWrapper();

export function initOrientation(labelElement) {
  orientationSensor.init(labelElement);
}

export { orientationSensor };
