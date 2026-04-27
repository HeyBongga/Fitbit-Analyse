import { me as appbit } from "appbit";
import { user } from "user-profile";

export function initProfile(labelElement) {
   labelElement.value.text = "PROFILE: loading...";

if (appbit.permissions.granted("access_user_profile")) {
   console.log((user.restingHeartRate || "Unknown") + " BPM");
   labelElement.value.text = `PROFILE:\nAge: ${user.age}\nGender: ${user.gender}\nResting HR: ${user.restingHeartRate || "Unknown"} BPM`;
}
}