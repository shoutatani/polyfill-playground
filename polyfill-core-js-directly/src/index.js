import { sub } from "./sub";

class executor {
  constructor() {
    Promise.resolve("main constructor called").then((result) => {
      console.log(result);
    });
  }

  execute() {
    const map = new Map();
    map.set("key", "sub module called");
    sub(map.get("key"));
  }
}

new executor().execute();
