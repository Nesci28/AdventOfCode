const rawInputs = require("./inputs");
const inputs = rawInputs.split("\n");

let personCounter = 0;
let counter = 0;
let alphabet = {};

for (const input of inputs) {
  if (!input) {
      const charFilter = +Object.values(alphabet).filter(
        (al) => al === personCounter
      ).length;
      counter += charFilter;
      personCounter = 0;
      alphabet = {};
      continue;
  }
  personCounter += 1;
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    alphabet[char] = alphabet[char] + 1 || 1;
  }
}

console.log("counter :>> ", counter);
