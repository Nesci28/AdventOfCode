const inputs = require("./inputs");

const mem = [];
let mask;
for (const input of inputs) {
  if (input.startsWith("mask")) {
    mask = input.split("=")[1];
    continue;
  }

  const [, pos] = input.match(/\[(.*?)\]/);
  const value = parseInt(input.split("=")[1].trim())
    .toString(2)
    .padStart(36, "0");

  mem[pos] = generateMem(mask.trim(), value);
}

const counter = mem.reduce((accu, curr) => {
  return (accu += parseInt(curr, 2) || 0);
}, 0);
console.log("counter :>> ", counter);

function generateMem(mask, values) {
  mask = mask.split("");
  for (let i = 0; i < mask.length; i++) {
    const value = values[i];
    if (mask[i] === "X") {
      mask[i] = value;
    }
  }

  return mask.join("");
}
