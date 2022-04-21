export const sub = (value) =>
  Promise.resolve(value.toString()).then((result) => {
    console.log(result);
  });
