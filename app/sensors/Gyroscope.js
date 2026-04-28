import { Gyroscope } from "gyroscope";
import { formatTime } from "../utils/format";

const gyro = new Gyroscope({ frequency: 1 });

export function initGyroscope(labelElement) {
    if (Gyroscope) {
        console.log("This device has an Gyroscope!");

        

        labelElement.value.text = "GYRO: x: NaN, y: NaN, z: NaN";
        labelElement.timestamp.text = `@ ${formatTime(Date.now())}`;

        gyro.addEventListener("reading", () => {
            if (gyro.x === undefined || gyro.y === undefined || gyro.z === undefined) {
               labelElement.value.text = "GYRO: x: NaN, y: NaN, z: NaN";
            } else {
                const timestamp = Date.now();
                labelElement.value.text = `GYRO: x: ${gyro.x}, y: ${gyro.y}, z: ${gyro.z} \n @ ${formatTime(timestamp)}`;
                labelElement.timestamp.text = `@ ${formatTime(timestamp)}`;
            }
        });
        gyro.start();
    } else {
        console.log("This device does NOT have a Gyroscope!");
        labelElement.value.text = "GYRO: Not supported";
    }
};