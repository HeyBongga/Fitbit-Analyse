import clock from "clock";
import * as document from "document";
import { preferences } from "user-settings";
import { BodyPresenceSensor } from "body-presence";
//import { Accelerometer } from "accelerometer";

function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// Update the clock every second
clock.granularity = "seconds";

// Get a handle on the <text> element
const myLabel = document.getElementById("myLabel");
const mySensor = document.getElementById("mySensor");

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h formate
    hours = zeroPad(hours);
  }
  let mins = zeroPad(today.getMinutes());
  let seconds = zeroPad(today.getSeconds());
  myLabel.text = `${hours}:${mins}:${seconds}`;
}

const body = new BodyPresenceSensor();
let proto = BodyPresenceSensor.prototype;
body.addEventListener("reading", () => {
  mySensor.text = body.present ? "On-wrist" : "Off-wrist";
});
body.start();


console.log(Object.getOwnPropertyNames(body));
let stufe = 0;
getMethods(proto)

function getMethods(proto){
  while (proto) {
    console.log("Stufe:", stufe);
    console.log(Object.getOwnPropertyNames(proto));
    proto = Object.getPrototypeOf(proto);
    stufe++;
  }
}
