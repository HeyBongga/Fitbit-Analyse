// Utility function to zero-pad numbers less than 10
export function zeroPad(i) {
  return i < 10 ? "0" + i : i;
}

export function formatTime(ts) {
  const stamp = new Date(ts);

  const hours = zeroPad(stamp.getHours());
  const minutes = zeroPad(stamp.getMinutes());
  const seconds = zeroPad(stamp.getSeconds());
  const milliseconds = zeroPad(stamp.getMilliseconds());

  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}