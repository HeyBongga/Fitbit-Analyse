// Utility function to log the prototype chain of an object for debugging purposes
export function logPrototypeChain(obj) {
  let proto = Object.getPrototypeOf(obj);
  let level = 0;

  while (proto) {
    console.log("Level:", level);
    console.log(Object.getOwnPropertyNames(proto));
    proto = Object.getPrototypeOf(proto);
    level++;
  }
}