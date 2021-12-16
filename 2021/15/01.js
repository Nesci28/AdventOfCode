/* eslint-disable no-restricted-syntax */
const fs = require("fs");

const inputs = fs
  .readFileSync("./inputs.txt", { encoding: "utf-8" })
  .replace(/\r/g, "")
  .trim()
  .split("\n")
  .map((x) => x.split("").map(Number));

function arrayMin(arr) {
  return arr.reduce((p, v) => (p < v ? p : v));
}

function convertCoordsToIndex(x, y) {
  return y * inputs[0].length + x;
}

function convertIndexToCoords(index) {
  const y = Math.floor(index / inputs[0].length);
  const x = index % inputs[0].length;
  return { x, y };
}

function getNeighborsCoords(index) {
  const { x, y } = convertIndexToCoords(index);
  const neighbors = [
    { x: x - 1, y },
    { x: x + 1, y },
    { x, y: y - 1 },
    { x, y: y + 1 },
  ].filter((el) => {
    const { x: xCoord, y: yCoords } = el;
    return xCoord >= 0 && xCoord < inputs[0].length && yCoords >= 0 && yCoords < inputs.length;
  });
  return neighbors;
}

const distances = [];
const previous = [];
const Q = [];

for (let y = 0; y < inputs.length; y += 1) {
  for (let x = 0; x < inputs[0].length; x += 1) {
    const index = convertCoordsToIndex(x, y);
    distances[index] = Infinity;
    previous[index] = undefined;
    Q.push(y * inputs.length + x);
  }
}

distances[0] = 0;

while (Q.length) {
  const min = arrayMin(Q);
  const minIndex = Q.findIndex((x) => x === min);
  const [u] = Q.splice(minIndex, 1);
  const neighbors = getNeighborsCoords(u);
  for (const neighbor of neighbors) {
    const { x, y } = neighbor;
    const alt = distances[u] + inputs[y][x];
    const neighborIndex = convertCoordsToIndex(x, y);
    if (alt < distances[neighborIndex]) {
      distances[neighborIndex] = alt;
      previous[neighborIndex] = u;
    }
  }
}

const total = distances[distances.length - 1];
console.log("total :>> ", total);
