import { OrientationSensor } from "orientation";
import { display } from "display";
import { formatTime } from "../utils/format";

export function initOrientation(labelElement) {
    if (OrientationSensor) {
        console.log("This device has an Orientation sensor!");

        const orientation = new OrientationSensor({ frequency: 1 });

        labelElement.value.text = "ORIENTATION: q0: NaN, q1: NaN, q2: NaN, q3: NaN";
        labelElement.timestamp.text = `@ ${formatTime(Date.now())}`;

        orientation.addEventListener("reading", () => {
            console.log(
            `Orientation Reading: \
            timestamp=${orientation.timestamp}, \
            [${orientation.quaternion[0]}, \
            ${orientation.quaternion[1]}, \
            ${orientation.quaternion[2]}, \
            ${orientation.quaternion[3]}]`
            );

            labelElement.value.text = `ORIENTATION: q0: ${orientation.quaternion[0]}, q1: ${orientation.quaternion[1]}, q2: ${orientation.quaternion[2]}, q3: ${orientation.quaternion[3]}`;
            labelElement.timestamp.text = `@ ${formatTime(orientation.timestamp)}`;
        });

        display.addEventListener("change", () => {
            // Automatically stop the sensor when the screen is off to conserve battery
            display.on ? orientation.start() : orientation.stop();
        });

        orientation.start();
    } else {
        console.log("This device does NOT have an Orientation sensor!");
        labelElement.value.text = "ORIENTATION: Not supported";
    }
}
