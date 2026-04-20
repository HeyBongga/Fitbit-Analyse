import { BodyPresenceSensor } from "body-presence";
import { logPrototypeChain } from "../debug/prototype";

// Create a new instance of the BodyPresenceSensor
const bodysensor = new BodyPresenceSensor();

// Initialize the body presence sensor and update the label element based on the sensor's readings
export function initBodyPresence(labelElement) {
  //logPrototypeChain(bodysensor);
  labelElement.text = "NaN";
  // Add an event listener to the sensor to update the label element whenever a new reading is available
  bodysensor.addEventListener("reading", () => { 
    labelElement.text = bodysensor.present ? "Body present: Yes" : "Body present: No";
  });

  // Start the sensor to begin receiving readings
  bodysensor.start();

  return;
}