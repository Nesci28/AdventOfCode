const inputs = require("./inputs.js");

const sequences = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

let total = 1;
for (const sequence of sequences) {
  let counter = 0;
  let xPos = 0;
  const xAdd = sequence[0];
  const yAdd = sequence[1];

  for (let i = yAdd; i < inputs.length; i += yAdd) {
    const input = inputs[i];
    xPos = xPos + xAdd;
    const char = input[xPos];
    if (char === "#") {
      counter = counter + 1;
    }
  }
  
  total = total * counter;
}

console.log("total :>> ", total);
