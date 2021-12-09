/* eslint-disable no-restricted-syntax */
/* eslint-disable no-constant-condition */
const fs = require("fs");
const mathjs = require("mathjs");

const inputs = fs
  .readFileSync("./inputs.txt", { encoding: "utf-8" })
  .replace(/\r/g, "")
  .split("\n")
  .filter(Boolean)
  .map((x) => x.replace(/[^9]/g, "0"))
  .map((x) => x.split("").map(Number));

function getZeroesSides(x, y, side) {
  const value = side === "x" ? x : y;
  const newSide = side === "x" ? "y" : "x";
  const maxLength = side === "x" ? inputs[0].length : inputs.length;
  const coords = [];

  for (const operator of ["-", "+"]) {
    let counter = 1;
    while (true) {
      const newCoord = mathjs.evaluate(`${value} ${operator} ${counter}`);
      if (newCoord < 0 || newCoord > maxLength - 1) {
        break;
      }
      const selectedNumber = side === "x" ? inputs[y][newCoord] : inputs[newCoord][x];
      if (selectedNumber === 9 || selectedNumber === 1) {
        break;
      }

      const newX = side === "x" ? newCoord : x;
      const newY = side === "y" ? newCoord : y;
      inputs[newY][newX] = 1;
      const zeroes = getZeroesSides(newX, newY, newSide).flat();
      zeroes.forEach((z) => { inputs[z.y][z.x] = 1; });
      coords.push([{ x: newX, y: newY }, ...zeroes]);
      counter += 1;
    }
  }

  return coords;
}

function getZeroes(x, y) {
  inputs[y][x] = 1;

  const horizontals = getZeroesSides(x, y, "x");
  const verticals = getZeroesSides(x, y, "y");

  return [{ x, y }, ...horizontals.flat(), ...verticals.flat()];
}

const sizes = [];
inputs.forEach((input, y) => {
  input.forEach((number, x) => {
    if (number === 0) {
      sizes.push(getZeroes(x, y).length);
    }
  });
});

sizes.sort((a, b) => b - a);
const [top1, top2, top3] = sizes;

const total = top1 * top2 * top3;
console.log("total :>> ", total);
