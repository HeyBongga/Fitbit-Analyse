import { BodyPresenceSensor } from "body-presence";
import { logPrototypeChain } from "../debug/prototype";

// Initialize the body presence sensor and update the label element based on the sensor's readings
export function initBodyPresence(labelElement) {
  console.log("Started");
  // Create a new instance of the BodyPresenceSensor  
  const bodysensor = new BodyPresenceSensor();

  console.log("before event listener:", bodysensor);
  //logPrototypeChain(bodysensor);
  // Add an event listener to the sensor to update the label element whenever a new reading is available
  bodysensor.addEventListener("reading", () => { 
    labelElement.text = bodysensor.present ? "On-wrist" : "Off-wrist";
    console.log("In event listener:", bodysensor);
  });

  // Start the sensor to begin receiving readings
  bodysensor.start();
 console.log("ended");
}