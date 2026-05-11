import { me as appbit } from "appbit";
import { user } from "user-profile";

export function initProfile(labelElement) {
   labelElement.value.text = "PROFILE: loading...";

if (appbit.permissions.granted("access_user_profile")) {
   //console.log((user.restingHeartRate || "Unknown") + " BPM");
   labelElement.value.text = `Age: ${user.age} Sex: ${user.gender} RHR: ${user.restingHeartRate || "?"} BPM`;
}
};