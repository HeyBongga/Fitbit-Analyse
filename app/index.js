
import * as document from "document";
import { initClock } from "./clock";
import { initBodyPresence } from "./sensors/bodypresence";
import { initHeartRate } from "./sensors/heartrate";
import { initAccelerometer } from "./sensors/accelerometer";

// Get references to the label elements in the document
const clockLabel = document.getElementById("clockLabel");
const bodyPresenceLabel = document.getElementById("bodyPresenceLabel");
const heartRateLabel = document.getElementById("heartRateLabel");
const accelerometerLabel = document.getElementById("accelerometerLabel");


//const bodySensor = initBodyPresence(bodyPresenceLabel);

// Initialize the clock and sensors with the respective label elements
initClock(clockLabel);
initBodyPresence(bodyPresenceLabel);
initHeartRate(heartRateLabel);
initAccelerometer(accelerometerLabel);


