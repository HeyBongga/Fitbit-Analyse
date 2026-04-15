import clock from "clock";
import { preferences } from "user-settings";
import { zeroPad } from "./utils/format";

// Initialize the clock and update the label element with the current time every second
export function initClock(labelElement) {
  // Set the clock to update every second
  clock.granularity = "seconds";

  // Update the clock display every time the clock ticks
  clock.ontick = (evt) => {
    let today = evt.date;
    let hours = today.getHours();

    if (preferences.clockDisplay === "12h") {
      // 12h format
      hours = hours % 12 || 12;
    } else {
      // 24h format
      hours = zeroPad(hours);
    }

    // Zero-pad minutes and seconds
    let mins = zeroPad(today.getMinutes());
    let seconds = zeroPad(today.getSeconds());
    
    // Update the label element with the current time
    labelElement.text = `${hours}:${mins}:${seconds}`;
  };
}