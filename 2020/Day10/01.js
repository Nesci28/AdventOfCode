const rawInputs = require("./inputs");
const inputs = rawInputs.sort((a, b) => a - b);

const differences = {
  1: 0,
  2: 0,
  3: 0,
};

for (let i = 0; i < inputs.length; i++) {
  const input = inputs[i];
  if (i === inputs.length - 1) {
    differences["3"] += 1;
    break;
  } else if (i === 0) {
    let diff = input - 0;
    differences[diff.toString()] += 1;
  }
  const diff = inputs[i + 1] - input;
  differences[diff.toString()] += 1;
}

const count = differences["1"] * differences["3"];
console.log("count :>> ", count);
