import { HeartRateSensor } from "heart-rate";
import { BodyPresenceSensor } from "body-presence";
import { formatTime } from "../utils/format";

const hrm = new HeartRateSensor({ frequency: 1 });

export function initHeartRate(labelElement) {
  // reagiert auf BodyPresence
  labelElement.text = "Heart Rate: NaN";

  const bodySensor = new BodyPresenceSensor();

  bodySensor.addEventListener("reading", () => {
    if (!bodySensor.present) {
      hrm.stop();
      labelElement.value.text = "Heart Rate: --" 
      labelElement.timestamp.text = `@ ${formatTime(Date.now())}`;
    } else {
      hrm.start();
    }
  });

  bodySensor.start();

  // Herzrate + timestamp anzeigen
  hrm.addEventListener("reading", () => {
    const timeStamp = Date.now();
    labelElement.value.text = `Heart Rate: ${hrm.heartRate}`;
    labelElement.timestamp.text = `@ ${formatTime(timeStamp)}`;
  });
}
