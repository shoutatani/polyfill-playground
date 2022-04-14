import { sub } from "./sub";

const executor = () => {
  Promise.resolve("promiseTest").then((result) => {console.log(result)});
  sub();
};

executor();
