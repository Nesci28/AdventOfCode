/* eslint-disable no-restricted-syntax */
const fs = require("fs");
const _ = require("lodash");

const inputs = fs
  .readFileSync("./inputs.txt", { encoding: "utf-8" })
  .replace(/\r/g, "")
  .split("\n")
  .filter(Boolean)
  .map((x) => x.split("").map(Number));

function getAdjacents(x, y) {
  const adjacents = [];
  const adjacentUp = y - 1;
  if (adjacentUp >= 0) {
    adjacents.push(inputs[adjacentUp][x]);
  }
  const adjacentDown = y + 1;
  if (adjacentDown < inputs.length) {
    adjacents.push(inputs[adjacentDown][x]);
  }
  const adjacentLeft = x - 1;
  if (adjacentLeft >= 0) {
    adjacents.push(inputs[y][adjacentLeft]);
  }
  const adjacentRight = x + 1;
  if (adjacentRight < inputs[0].length) {
    adjacents.push(inputs[y][adjacentRight]);
  }

  return adjacents;
}

const inputsToMap = inputs.reduce((accu, curr, y) => {
  const newAccu = accu;
  const value = curr.map((n, x) => ({
    value: n,
    adjacents: getAdjacents(x, y),
  }));
  newAccu.push(value);
  return newAccu;
}, []).flat();

const lowPoints = inputsToMap.filter((x) => x.adjacents.every((y) => y > x.value));
const height = lowPoints.map((x) => x.value + 1);

const total = _.sum(height);
console.log("total :>> ", total);
