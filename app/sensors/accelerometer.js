import { Accelerometer } from "accelerometer";
import { formatTime } from "../utils/format";

export function initAccelerometer(labelElement) {
if (Accelerometer) {
   console.log("This device has an Accelerometer!");

   const accelerometer = new Accelerometer({ frequency: 1 });

   labelElement.value.text = "ACC: x: NaN, y: NaN, z: NaN";
   labelElement.timestamp.text = `@ ${formatTime(Date.now())}`;

   accelerometer.addEventListener("reading", () => {
    if (accelerometer.x === undefined || accelerometer.y === undefined || accelerometer.z === undefined) {
        labelElement.value.text = "ACC: x: NaN, y: NaN, z: NaN";
    } else {
        const timestamp = Date.now();
        labelElement.value.text = `ACC: x: ${accelerometer.x}, y: ${accelerometer.y}, z: ${accelerometer.z} \n @ ${formatTime(timestamp)}`;
        labelElement.timestamp.text = `@ ${formatTime(timestamp)}`;
    }
   });

   accelerometer.start();

} else {
   console.log("This device does NOT have an Accelerometer!");
   labelElement.value.text = "ACC: Not supported";
}
}