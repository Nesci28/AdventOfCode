/* eslint-disable no-restricted-syntax */
const fs = require("fs");

const inputs = fs
  .readFileSync("./inputs.txt", { encoding: "utf-8" })
  .replace(/\r/g, "")
  .split("\n")
  .filter(Boolean)
  .map((x) => {
    const [wires, digits] = x.split(" | ");
    return {
      wires: wires.split(" "), digits: digits.split(" "),
    };
  });

const codes = [
  {
    value: 0,
    segments: ["a", "b", "c", "e", "f", "g"].join(""),
  },
  {
    value: 1,
    segments: ["c", "f"].join(""),
  },
  {
    value: 2,
    segments: ["a", "c", "d", "e", "g"].join(""),
  },
  {
    value: 3,
    segments: ["a", "c", "d", "f", "g"].join(""),
  },
  {
    value: 4,
    segments: ["b", "c", "d", "f"].join(""),
  },
  {
    value: 5,
    segments: ["a", "b", "d", "f", "g"].join(""),
  },
  {
    value: 6,
    segments: ["a", "b", "d", "e", "f", "g"].join(""),
  },
  {
    value: 7,
    segments: ["a", "c", "f"].join(""),
  },
  {
    value: 8,
    segments: ["a", "b", "c", "d", "e", "f", "g"].join(""),
  },
  {
    value: 9,
    segments: ["a", "b", "c", "d", "f", "g"].join(""),
  },
];

function decodeWires(wires) {
  const decodedWires = [];

  const numberOfWires = wires.reduce((accu, curr) => {
    const newAccu = accu;
    for (const letter of curr) {
      newAccu[letter] = newAccu[letter] + 1 || 1;
    }
    return newAccu;
  }, {});

  const digitOne = wires.find((x) => x.length === 2);
  const digitSeven = wires.find((x) => x.length === 3);
  const digitFour = wires.find((x) => x.length === 4);

  const entries = Object.entries(numberOfWires);
  const e = entries.find((x) => x[1] === 4)[0];
  const b = entries.find((x) => x[1] === 6)[0];
  const f = entries.find((x) => x[1] === 9)[0];
  const c = digitOne.replace(f, "");
  const a = digitSeven.replace(c, "").replace(f, "");
  const d = digitFour.replace(b, "").replace(c, "").replace(f, "");
  const g = entries.filter((x) => x[1] === 7).find((x) => x[0] !== d)[0];
  decodedWires.push({ segment: "e", value: e });
  decodedWires.push({ segment: "b", value: b });
  decodedWires.push({ segment: "f", value: f });
  decodedWires.push({ segment: "c", value: c });
  decodedWires.push({ segment: "a", value: a });
  decodedWires.push({ segment: "d", value: d });
  decodedWires.push({ segment: "g", value: g });

  return decodedWires;
}

function decodeDigit(digits, decodedWires) {
  const values = digits.map((x) => x.split("").reduce((accu, curr) => {
    let newAccu = accu;
    const { segment } = decodedWires.find((w) => w.value === curr);
    newAccu += segment;
    return newAccu;
  }, "")
    .split("")
    .sort()
    .join(""));
  const value = values.map((x) => {
    const digit = codes.find((c) => c.segments === x).value;
    return digit;
  });

  return value;
}

let total = 0;
for (const input of inputs) {
  const decodedWires = decodeWires(input.wires);
  const digit = decodeDigit(input.digits, decodedWires);
  const subTotal = +digit.join("");
  total += subTotal;
}

console.log("counter :>> ", total);
