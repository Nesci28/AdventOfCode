const inputs = require("./inputs");

const mem = {};
let mask;
for (const input of inputs) {
  if (input.startsWith("mask")) {
    mask = input.split("=")[1];
    continue;
  }

  let [, pos] = input.match(/\[(.*?)\]/);
  const value = input.split("=")[1];

  const binaryPos = parseInt(pos).toString(2).padStart(36, "0");

  const calculatedMask = generateMem(mask.trim(), binaryPos);
  const allPossibilities = generatePossibilities(calculatedMask);
  allPossibilities.forEach((p) => {
    const pos = parseInt(p, 2);
    mem[pos] = +value;
  });
}

const counter = Object.values(mem).reduce((accu, curr) => (accu += curr), 0);
console.log("counter :>> ", counter);

function generateMem(mask, values) {
  mask = mask.split("");
  for (let i = 0; i < mask.length; i++) {
    const value = values[i];
    switch (mask[i]) {
      case "X":
        mask[i] = "X";
        break;
      case "0":
        mask[i] = value;
        break;
      case "1":
        mask[i] = "1";
        break;
    }
  }

  return mask.join("");
}

function generatePossibilities(mask) {
  if (!mask.includes("X")) return mask;

  return [
    generatePossibilities(mask.replace("X", "0")),
    generatePossibilities(mask.replace("X", "1")),
  ].flat();
}
