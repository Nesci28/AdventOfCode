const fs = require("fs");
const _ = require("lodash");

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

function parsePackets(input) {
  const packets = [];
  let newInput = input;
  let index = 0;
  let isNewInputNotAllZeroes = /1/.test(newInput);
  while (newInput.length && isNewInputNotAllZeroes) {
    const V = parseInt(newInput.substring(0, 3), 2);
    const T = parseInt(newInput.substring(3, 6), 2);
    let I;
    let L;
    let value;

    if (T === 4) {
      index = 6;
      const loop = true;
      while (loop) {
        const bitOperator = parseInt(newInput.substring(index, index + 1), 2);
        value = parseInt(newInput.substring(index + 1, index + 5), 2);
        index += 5;
        if (bitOperator === 0) {
          break;
        }
      }
    } else {
      I = parseInt(newInput.substring(6, 7), 2);
      if (I === 0) {
        L = parseInt(newInput.substring(8, 23), 2);
        index = 22;
      } else if (I === 1) {
        L = parseInt(newInput.substring(8, 19), 2);
        index = 18;
      }
    }

    packets.push({ V, T, I, L, value });
    newInput = newInput.substring(index);
    isNewInputNotAllZeroes = /1/.test(newInput);
  }

  return packets;
}

function solve(input) {
  const packets = parsePackets(input);
  const subTotal = packets.map((x) => x.V);
  const total = _.sum(subTotal);
  return total;
}

const total = solve(hex2bin(inputs));
console.log("total :>> ", total);
