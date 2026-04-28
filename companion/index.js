// import * as messaging from "messaging";
// //import { writeFileSync } from "fs";

console.log("Companion started");

// let csv = "timestamp,x,y,z\n";

// messaging.peerSocket.onmessage = (evt) => {
//   if (evt.data.type === "chunk") {

//     evt.data.data.forEach(entry => {
//       csv += `${entry.timestamp},${entry.x},${entry.y},${entry.z}\n`;
//     });

//     // optional: regelmäßig speichern
//     writeFileSync("data.csv", csv, "utf-8");
//   }
// };