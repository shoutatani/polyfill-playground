import { sub } from "./sub";

const executor = () => {
  Promise.resolve("promiseTest").then((result) => {console.log(result)});
  const map = new Map();
  map.set("key", "value");
  sub();
};

executor();
