import { battery } from "power";
import { charger } from "power";

export function initPower() {
    console.log("Battery level: " + battery.chargeLevel + "%");
    console.log("Charger connected: " + (charger.connected ? "Yes" : "No"));

    battery.addEventListener("change", () => {
        console.log("Battery level: " + battery.chargeLevel + "%");
        console.log("Charger connected: " + (charger.connected ? "Yes" : "No"));
    });

    charger.addEventListener("change", () => {
        console.log("Battery level: " + battery.chargeLevel + "%");
        console.log("Charger connected: " + (charger.connected ? "Yes" : "No"));
    });
};