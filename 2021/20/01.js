/* eslint-disable no-restricted-syntax */
const fs = require("fs");
const _ = require("lodash");

const [algorithm, rawInputs] = fs
  .readFileSync("./inputs.txt", { encoding: "utf-8" })
  .replace(/\r/g, "")
  .trim()
  .split("\n\n");

const inputs = rawInputs.split("\n").map((x) => x.split(""));

function getDecimalValue(x, y, newInputs) {
  let input = "";
  for (let yRes = -1; yRes <= 1; yRes += 1) {
    for (let xRes = -1; xRes <= 1; xRes += 1) {
      try {
        const element = newInputs[y + yRes][x + xRes];
        if (!element) {
          throw new Error();
        }
        input += element === "." ? "0" : "1";
      } catch (__) {
        input += newInputs[0][0] === "." ? "0" : "1";
      }
    }
  }

  const decimal = parseInt(input, 2);
  return decimal;
}

let newInputs = inputs;
for (let i = 0; i < 2; i += 1) {
  const algorithmInput = [];
  for (let y = -1; y < newInputs.length + 1; y += 1) {
    let row;
    row = newInputs[y];
    if (!row) {
      const fill = newInputs[0][0];
      row = Array(newInputs[0].length).fill(fill);
    }
    for (let x = -1; x < row.length + 1; x += 1) {
      const decimal = getDecimalValue(x, y, newInputs);
      const algoRes = algorithm[decimal];
      if (!algorithmInput[y + 1]) {
        algorithmInput[y + 1] = [];
      }
      algorithmInput[y + 1][x + 1] = algoRes;
    }
  }
  newInputs = _.cloneDeep(algorithmInput);
}

const total = newInputs.flat().filter((x) => x === "#").length;
console.log("total :>> ", total);
