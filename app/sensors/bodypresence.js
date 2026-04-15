import { BodyPresenceSensor } from "body-presence";
import { logPrototypeChain } from "../debug/prototype";

// Initialize the body presence sensor and update the label element based on the sensor's readings
export function initBodyPresence(labelElement) {

  // Create a new instance of the BodyPresenceSensor  
  const bodysensor = new BodyPresenceSensor();

  //logPrototypeChain(bodysensor);

  function updateLabel() {
    if(bodysensor.present === null) {
      labelElement.text = "Loading...";
      return;
    }
    labelElement.text = bodysensor.present ? "On-wrist" : "Off-wrist";
  };

  // Add an event listener to the sensor to update the label element whenever a new reading is available
  bodysensor.addEventListener("reading", () => { updateLabel(); });

  // Start the sensor to begin receiving readings
  bodysensor.start();
  updateLabel();
}