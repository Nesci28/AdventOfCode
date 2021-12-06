/* eslint-disable no-restricted-syntax */
const fs = require("fs");
const _ = require("lodash");

const inputs = fs
  .readFileSync("./inputs.txt", { encoding: "utf-8" })
  .replace(/\r/g, "")
  .split("\n")
  .filter(Boolean)
  .map((l) => l.split(","))
  .flat()
  .map(Number);

const fishCounts = new Array(9).fill(0);

inputs.forEach((i) => {
  fishCounts[i] += 1;
});

for (let day = 0; day < 256; day += 1) {
  const numberOfNewFish = fishCounts[0];
  for (let i = 0; i < 9; i += 1) {
    fishCounts[i] = fishCounts[i + 1];
  }
  fishCounts[8] = numberOfNewFish;
  fishCounts[6] += numberOfNewFish;
}

const total = _.sum(fishCounts);
console.log("total :>> ", total);
