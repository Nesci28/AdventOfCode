/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable default-case */
/* eslint-disable no-restricted-syntax */
const fs = require("fs");

const inputs = fs
  .readFileSync("./inputs.txt", { encoding: "utf-8" })
  .replace(/\r/g, "")
  .split("\n")
  .map((input, y) => input.split("").map((value, x) => (
    { value: +value, coords: { x, y }, increase: 0 }
  )))
  .flat();

let total = 0;

function calculateBoard(cells, add) {
  const newCells = cells.map((x) => ({
    value: x.value === 0 && !add ? x.value : x.value + x.increase,
    increase: 0,
    coords: x.coords,
  }));

  return newCells;
}

function addToNeighbors(cell, cells) {
  for (let x = -1; x <= 1; x += 1) {
    for (let y = -1; y <= 1; y += 1) {
      if (x === 0 && y === 0) {
        // eslint-disable-next-line no-continue
        continue;
      }

      const xCoord = cell.coords.x + x;
      const yCoord = cell.coords.y + y;
      const neighbors = cells.find((b) => b.coords.x === xCoord && b.coords.y === yCoord);
      if (!neighbors) {
        // eslint-disable-next-line no-continue
        continue;
      }
      neighbors.increase += 1;
    }
  }

  return cells;
}

function calculateStep(cells) {
  let newCells = cells;
  const isDone = cells.every((c) => c.value <= 9);
  if (isDone) {
    return newCells;
  }

  for (const cell of cells) {
    if (cell.value <= 9) {
      // eslint-disable-next-line no-continue
      continue;
    }

    total += 1;
    cell.value = 0;
    newCells = addToNeighbors(cell, cells);
  }
  newCells = calculateBoard(newCells, false);
  return calculateStep(newCells);
}

let cells = inputs;
for (let i = 0; i < 100; i += 1) {
  cells = cells.map((x) => {
    x.increase = 1;
    return x;
  });
  cells = calculateBoard(cells, true);
  cells = calculateStep(cells);
}

console.log("total :>> ", total);
