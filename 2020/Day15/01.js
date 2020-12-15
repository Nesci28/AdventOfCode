const rawInputs = require("./inputs");
const inputs = rawInputs.split(",");

const mem = {};
let lastNumber = undefined;
let counter = 1;
while (counter <= 2020) {
  if (inputs[counter - 1]) {
    lastNumber = inputs[counter - 1];
  } else if (mem[lastNumber].repeat === 1) {
    lastNumber = "0";
  } else {
    lastNumber = (
      mem[lastNumber].turn[mem[lastNumber].turn.length - 1] -
      mem[lastNumber].turn[mem[lastNumber].turn.length - 2]
    ).toString();
  }

  if (!mem[lastNumber]) {
    mem[lastNumber] = {
      turn: [],
      repeat: 0,
    };
  }
  mem[lastNumber].turn.push(+counter);
  mem[lastNumber].repeat += 1 || 1;

  counter += 1;
  continue;
}

console.log("counter", +lastNumber);
