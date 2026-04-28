import * as document from "document";
import { initClock } from "./clock";
import { initBodyPresence } from "./sensors/bodypresence";
import { initHeartRate } from "./sensors/heartrate";
import { initAccelerometer } from "./sensors/accelerometer";
import { initGyroscope } from "./sensors/Gyroscope";    
import { initSleep } from "./metrics/sleep";
import { initActivity } from "./metrics/excercise";
import { initProfile } from "./system/profile";
import { initPower } from "./system/power";
import { initOrientation } from "./sensors/orientation";
//import { peerSocket } from "messaging";

////////////////////////////////////////////////////////////////////////
// Get references to the label elements in the document
const bg = document.getElementById("background");
const clockLabel = document.getElementById("clockLabel");

const bodyPresenceLabel = document.getElementById("bodyPresenceLabel");

const hrLabel1 = document.getElementById("hrLabel1");
const hrLabel2 = document.getElementById("hrLabel2");

const accLabel1 = document.getElementById("accLabel1");
const accLabel2 = document.getElementById("accLabel2");

const gyroLabel1 = document.getElementById("gyroLabel1");
const gyroLabel2 = document.getElementById("gyroLabel2"); 

const orientationLabel1 = document.getElementById("orientationLabel1");
const orientationLabel2 = document.getElementById("orientationLabel2");

const sleepLabel1 = document.getElementById("sleepLabel1");
const sleepLabel2 = document.getElementById("sleepLabel2");

const activityLabel1 = document.getElementById("activityLabel1");
const activityLabel2 = document.getElementById("activityLabel2");

const profileLabel = document.getElementById("profileLabel");
/////////////////////////////////////////////////////////////////////////
// Initialize the clock and sensors with the respective label elements
initClock(clockLabel);
initBodyPresence(bodyPresenceLabel);
initHeartRate({value: hrLabel1,timestamp: hrLabel2});
initAccelerometer({value: accLabel1,timestamp: accLabel2});
initGyroscope({value: gyroLabel1,timestamp: gyroLabel2});
initOrientation({value: orientationLabel1,timestamp: orientationLabel2});
initSleep({value: sleepLabel1,timestamp: sleepLabel2});
initActivity({value: activityLabel1,timestamp: activityLabel2});
initProfile({value: profileLabel,timestamp: null});
initPower();
/////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
//PAGES
let currentPage = 0;
const totalPages = 3;

const pages = [
  document.getElementById("page0"),
  document.getElementById("page1"),
  document.getElementById("page2")
];

// function showPage(index) {
//   pages.forEach((p, i) => {
//     p.visibility = (i === index) ? "visible" : "hidden";
//   });
// }
function showPage(index) {
  pages[0].style.visibility = (index === 0) ? "visible" : "hidden";
  pages[1].style.visibility = (index === 1) ? "visible" : "hidden";
  pages[2].style.visibility = (index === 2) ? "visible" : "hidden";
}

// Tap zum Wechseln
bg.addEventListener("click", () => {
  console.log("CLICK!");
  currentPage = (currentPage + 1) % totalPages;
  showPage(currentPage);
});
