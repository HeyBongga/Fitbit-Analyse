import { me as appbit } from "appbit";
import { today, goals, primaryGoal } from "user-activity";
import { formatTime } from "../utils/format";

export function initActivity(labelElement) {

  labelElement.value.text = "ACTIVITY: loading...";
  labelElement.timestamp.text = `@ ${formatTime(Date.now())}`;

  if (!appbit.permissions.granted("access_activity")) {
    labelElement.value.text = "ACTIVITY: No permission";
    return;
  }

    // Herzrate optional starten

  setInterval(() => {
    const steps = today.adjusted.steps || 0;
    const distance = today.adjusted.distance || 0;
    const calories = today.adjusted.calories || 0;
    const elevation = today.local.elevationGain || 0;
    const azm = today.adjusted.activeZoneMinutes?.total || 0;
    

    console.log(today.adjusted.steps);
    labelElement.value.text =
      `ACT: Steps: ${steps} Dist: ${distance} Cal: ${calories}`;

    labelElement.timestamp.text = `@ ${formatTime(Date.now())}`;

  }, 1000);
}