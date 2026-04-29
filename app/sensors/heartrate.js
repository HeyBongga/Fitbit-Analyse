import { HeartRateSensor } from "heart-rate";
import { BodyPresenceSensor } from "body-presence";
import { formatTime } from "../utils/format";
import { BaseSensor } from "./BaseSensor";

export class HeartRateSensorWrapper extends BaseSensor {
  constructor() {
    super("HeartRate");
    this.hardware = new HeartRateSensor({ frequency: 1 });
    this.bodySensor = new BodyPresenceSensor();
  }

  getValue() {
    return {
      sensorName: this.sensorName,
      value: this.hardware.heartRate,
      timestamp: this.timestamp || new Date().toISOString()
    };
  }

  //Gibt alle HeartRate-Werte als String zurück (für Debugging)
  getValues() {
    return `${this.sensorName}=${this.hardware.heartRate} bpm @[${this.timestamp}]`;
  }

  init(labelElement) {
    labelElement.text = "Heart Rate: NaN";

    this.bodySensor.addEventListener("reading", () => {
      if (!this.bodySensor.present) {
        this.hardware.stop();
        labelElement.value.text = "Heart Rate: --";
        labelElement.timestamp.text = `@ ${formatTime(Date.now())}`;
      } else {
        this.hardware.start();
      }
    });

    this.bodySensor.start();

    this.hardware.addEventListener("reading", () => {
      this.updateValue(this.hardware.heartRate);
      labelElement.value.text = `Heart Rate: ${this.hardware.heartRate}`;
      labelElement.timestamp.text = `@ ${formatTime(Date.now())}`;
      // Emittiere Event für Logger
      this.emit("myreading");
    });
  }
}

const heartRateSensor = new HeartRateSensorWrapper();

export function initHeartRate(labelElement) {
  heartRateSensor.init(labelElement);
  return heartRateSensor.hardware;
}

export { heartRateSensor };
