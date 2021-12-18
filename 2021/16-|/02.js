/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */

const fs = require("fs");
const _ = require("lodash");
const flatten = require("flat");

const inputs = fs
  .readFileSync("./inputs.txt", { encoding: "utf-8" })
  .replace(/\r/g, "")
  .trim();

function hex2bin(hex) {
  const conversions = {
    0: "0000",
    1: "0001",
    2: "0010",
    3: "0011",
    4: "0100",
    5: "0101",
    6: "0110",
    7: "0111",
    8: "1000",
    9: "1001",
    A: "1010",
    B: "1011",
    C: "1100",
    D: "1101",
    E: "1110",
    F: "1111",
  };

  let num = "";
  for (let i = 0; i < hex.length; i += 1) {
    const element = hex[i];
    const conversion = conversions[element];
    num += conversion;
  }

  return num;
}

function calculateOperations(parent) {
  const { T, childValues } = parent;
  if (T === 0) {
    parent.value = _.sum(childValues);
  }
  if (T === 1) {
    parent.value = _.multiply(...childValues);
  }
  if (T === 2) {
    parent.value = Math.min(...childValues);
  }
  if (T === 3) {
    parent.value = Math.max(...childValues);
  }
  if (T === 5) {
    const [first, second] = childValues;
    parent.value = first > second ? 1 : 0;
  }
  if (T === 6) {
    const [first, second] = childValues;
    parent.value = first < second ? 1 : 0;
  }
  if (T === 7) {
    const [first, second] = childValues;
    parent.value = first === second ? 1 : 0;
  }
}

function calculate(tree, parent) {
  if (!tree.childValues) {
    tree.childValues = [];
  }

  const { childs, value } = tree;
  if (!childs.length) {
    parent.childValues.push(value);
  } else {
    for (const child of childs) {
      calculate(child, tree);
    }
    calculateOperations(tree);
  }
}

function calculateLiteralPacket(input) {
  const newInput = input;
  let value;
  const loop = true;
  let substringIndex = 0;
  let length;
  while (loop) {
    const bitOperator = parseInt(newInput.substring(substringIndex, substringIndex + 1), 2);
    value = parseInt(newInput.substring(substringIndex + 1, substringIndex + 5), 2);
    substringIndex += 5;
    if (bitOperator === 0) {
      length = substringIndex + 6;
      break;
    }
  }

  return { value, length };
}

function calculateI0Childs(input) {
  const newInput = input;
  const L = parseInt(newInput.substring(0, 15), 2);
  let childInput = newInput.substring(15, 15 + L);
  const childs = [];
  let consumed = 0;
  while (consumed !== L) {
    const child = parsePackets(childInput);
    const childFlatten = Object.entries(flatten(child)).filter((x) => x[0].includes("length"));
    const totalConsumed = _.sum(childFlatten.map((x) => x[1]));
    consumed += totalConsumed;
    childs.push(child);
    childInput = childInput.substring(totalConsumed);
  }
  return childs;
}

function calculateI1Childs(input) {
  const childs = [];
  const newInput = input;
  const L = parseInt(newInput.substring(0, 11), 2);
  const childsInput = newInput.substring(11);
  let length = 0;

  for (let i = 0; i < L; i += 1) {
    length = _.sum(childs.filter(Boolean).map((x) => x.length));
    const childInput = childsInput.substring(length);
    const child = parsePackets(childInput);
    childs.push(child);
  }

  return childs;
}

function parsePackets(input) {
  const newInput = input;
  const V = parseInt(newInput.substring(0, 3), 2);
  const T = parseInt(newInput.substring(3, 6), 2);
  let I;
  let L;
  let packet;
  if (T === 4) {
    const inputForCalculation = newInput.substring(6);
    const { value: pValue, length: pLength } = calculateLiteralPacket(inputForCalculation);
    packet = { V, T, I, L, value: pValue, length: pLength, childs: [] };
  } else {
    I = parseInt(newInput.substring(6, 7), 2);
    const inputForCalculation = newInput.substring(7);
    if (I === 0) {
      const childs = calculateI0Childs(inputForCalculation);
      packet = { V, T, I, L, value: undefined, length: 22, childs };
    }
    if (I === 1) {
      const childs = calculateI1Childs(inputForCalculation);
      packet = { V, T, I, L, value: undefined, length: 18, childs };
    }
  }

  return packet;
}

function solve(input) {
  const packets = parsePackets(input);
  calculate(packets);
  const { value } = packets;
  return value;
}

let total = 0;

total = solve(hex2bin("C200B40A82"));
console.log(total === 3);

total = solve(hex2bin("04005AC33890"));
console.log(total === 54);

total = solve(hex2bin("880086C3E88112"));
console.log(total === 7);

total = solve(hex2bin("CE00C43D881120"));
console.log(total === 9);

total = solve(hex2bin("F600BC2D8F"));
console.log(total === 0);

total = solve(hex2bin("D8005AC2A8F0"));
console.log(total === 1);

total = solve(hex2bin("9C005AC2F8F0"));
console.log(total === 0);

total = solve(hex2bin("9C0141080250320F1802104A08"));
console.log(total === 1);

total = solve(hex2bin(inputs));
console.log("total :>> ", total);
