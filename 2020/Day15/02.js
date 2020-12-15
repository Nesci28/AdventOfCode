const rawInputs = require("./inputs");
const inputs = rawInputs.split(",");

const mem = {};
let lastNumber = undefined;
let counter = 1;
while (counter <= 30000000) {
  if (inputs[counter - 1]) {
    lastNumber = inputs[counter - 1];
  } else if (mem[lastNumber].repeat === 1) {
    lastNumber = "0";
  } else {
    lastNumber = (mem[lastNumber].turn[1] - mem[lastNumber].turn[0]).toString();
  }

  if (!mem[lastNumber]) {
    mem[lastNumber] = {
      turn: [],
      repeat: 0,
    };
  }
  if (mem[lastNumber].turn.length === 2) {
    mem[lastNumber].turn.shift();
  }
  mem[lastNumber].turn.push(+counter);
  mem[lastNumber].repeat += 1 || 1;

  counter += 1;
  continue;
}

console.log("counter", +lastNumber);
