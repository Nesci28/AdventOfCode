const rawInputs = require("./inputs");
const inputs = rawInputs.sort((a, b) => a - b);
inputs.unshift(0);

const counts = Array(inputs.length - 1).fill(0);
counts.unshift(1);

for (let i = 0; i < counts.length; i++) {
  for (let j = i - 3; j < i; j++) {
    if (inputs[i] <= inputs[j] + 3) {
      counts[i] += counts[j];
    }
  }
}

console.log("counts :>> ", counts.pop());
