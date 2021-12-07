/* eslint-disable no-restricted-syntax */
const fs = require("fs");
const _ = require("lodash");

const inputs = fs
  .readFileSync("./inputs.txt", { encoding: "utf-8" })
  .replace(/\r/g, "")
  .split(",")
  .filter(Boolean)
  .map(Number);

function calculateFuelCost(position, min, max) {
  const fuelCosts = [];

  let counter = 1;
  for (let i = position; i >= min; i -= 1) {
    const arr = [...Array(counter).keys()];
    fuelCosts[i] = _.sum(arr);
    counter += 1;
  }

  counter = 1;
  for (let i = position; i <= max; i += 1) {
    const arr = [...Array(counter).keys()];
    fuelCosts[i] = _.sum(arr);
    counter += 1;
  }

  return fuelCosts;
}

function calculateLowestFuelCost(positions) {
  const cost = {
    position: undefined,
    minimumFuel: Infinity,
  };
  const { length } = positions[0].fuelCostPerPositions;
  for (let i = 0; i < length; i += 1) {
    const fuelCosts = positions.map((x) => x.fuelCostPerPositions[i]);
    const total = _.sum(fuelCosts);
    if (total < cost.minimumFuel) {
      cost.position = i;
      cost.minimumFuel = total;
    }
  }

  return cost;
}

const min = Math.min(...inputs);
const max = Math.max(...inputs);

const positions = inputs.reduce((accu, curr) => {
  const newAccu = accu;
  const position = {};
  position.currentPosition = curr;
  const memoize = newAccu.find((x) => x.currentPosition === curr);
  if (memoize) {
    position.fuelCostPerPositions = memoize.fuelCostPerPositions;
    newAccu.push(position);
    return newAccu;
  }
  position.fuelCostPerPositions = calculateFuelCost(curr, min, max);
  newAccu.push(position);
  return newAccu;
}, []);
const lowestFuelCosts = calculateLowestFuelCost(positions, min, max);

const total = lowestFuelCosts.minimumFuel;
console.log("total :>> ", total);
