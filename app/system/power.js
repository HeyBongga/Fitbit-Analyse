import { battery } from "power";
import { charger } from "power";

export function initPower(labelElement) {
    console.log("Battery level: " + battery.chargeLevel + "%");
    console.log("Charger connected: " + (charger.connected ? "Yes" : "No"));

    labelElement.value.text = `Battery: ${battery.chargeLevel}%`;

    // battery.addEventListener("change", () => {
    //     console.log("Battery level: " + battery.chargeLevel + "%");
    //     console.log("Charger connected: " + (charger.connected ? "Yes" : "No"));
    // });

    // charger.addEventListener("change", () => {
    //     console.log("Battery level: " + battery.chargeLevel + "%");
    //     console.log("Charger connected: " + (charger.connected ? "Yes" : "No"));
    // });
};