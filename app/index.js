import * as document from "document";
import { initClock } from "./clock";
import { initBodyPresence } from "./sensors/bodypresence";

// Get references to the <text> elements in the document
const clockLabel = document.getElementById("clockLabel");
const bodyPresenceLabel = document.getElementById("bodyPresenceLabel");

// Initialize the clock and body presence sensor with the respective label elements
initClock(clockLabel);
initBodyPresence(bodyPresenceLabel);




