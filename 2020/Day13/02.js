const rawInputs = require("./inputs");
let inputs = rawInputs[1];

inputs = inputs.split(",").reduce((accu, curr, i) => {
  if (!!+curr) {
    accu.push([+curr, i]);
  }
  return accu;
}, []);

let counter = inputs[0][0];
let step = inputs[0][0];
for (let i = 1; i < inputs.length; i++) {
  const [busId, j] = inputs[i];
  while ((counter + j) % busId !== 0) {
    counter += step;
  }
  step = step * busId;
}

console.log("counter :>> ", counter);
