import { me as appbit } from "appbit";

if (!appbit.permissions.granted("access_sleep")) {
   console.log("We're not allowed to read a users' sleep!");
}

import sleep from "sleep";

export function initSleep(labelElement) {
//console.log("Initializing Sleep API");
labelElement.value.text = "SLEEP: NaN";
if (sleep) {
  sleep.addEventListener("change", () => {
     console.log(`User sleep state is: ${sleep.state}`);
        labelElement.value.text = `SLEEP: ${sleep.state}`;
        labelElement.timestamp.text = `@ ${formatTime(Date.now())}`;

   });
} else {
   console.warn("Sleep API not supported on this device, or no permission");
   labelElement.value.text = "SLEEP: Not supported";
}
};