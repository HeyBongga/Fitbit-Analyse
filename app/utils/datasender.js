// utils/dataSender.js
import * as messaging from "messaging";

let buffer = [];
const BUFFER_SIZE = 10;

export function sendData(entry) {
  buffer.push(entry);

  if (buffer.length >= BUFFER_SIZE) {
    flush();
  }
}

export function flush() {
  if (buffer.length === 0) return;

  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send({
      type: "chunk",
      data: buffer
    });

    buffer = [];
  } else {
    console.log("Socket nicht offen – Daten bleiben im Buffer");
  }
}