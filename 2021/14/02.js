/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
const fs = require("fs");
const _ = require("lodash");

const inputs = fs
  .readFileSync("./inputs.txt", { encoding: "utf-8" })
  .replace(/\r/g, "")
  .split("\n\n")
  .map((x) => x.split("\n"))
  .filter(Boolean);

const templatePairs = inputs[0][0];
const pairInsertions = inputs[1]
  .map((x) => x.split(" -> "))
  .map((y) => ({ pair: y[0], letter: y[1] }));

function createPairs(arr) {
  const pairs = arr.reduce((accu, curr, i) => {
    const newAccu = accu;
    if (i === 0) {
      return newAccu;
    }
    const previousLetter = arr[i - 1];
    const map = `${previousLetter}${curr}`;
    newAccu[map] = newAccu[map] + 1 || 1;
    return newAccu;
  }, {});

  return pairs;
}

const steps = 40;
let newTemplatePairs = createPairs(templatePairs.split(""));
for (let i = 0; i < steps; i += 1) {
  let polymer = _.cloneDeep(newTemplatePairs);

  for (const pairInsertion of pairInsertions) {
    const found = newTemplatePairs[pairInsertion.pair];
    if (!found) {
      continue;
    }

    const count = newTemplatePairs[pairInsertion.pair];
    polymer[pairInsertion.pair] = 0;
    const pair1 = `${pairInsertion.pair[0]}${pairInsertion.letter}`;
    const pair2 = `${pairInsertion.letter}${pairInsertion.pair[1]}`;
    polymer[`x-${pair1}`] = polymer[`x-${pair1}`] + count || count;
    polymer[`x-${pair2}`] = polymer[`x-${pair2}`] + count || count;
  }
  const entries = Object.entries(polymer);
  polymer = entries.reduce((accu, curr) => {
    const newAccu = accu;
    if (!curr[0].includes("x-")) {
      return newAccu;
    }
    const pairName = curr[0].replace("x-", "");
    newAccu[pairName] = newAccu[pairName] + curr[1] || curr[1];
    return newAccu;
  }, {});

  newTemplatePairs = _.cloneDeep(polymer);
}

const letters = [...new Set(Object.keys(newTemplatePairs).join("").split(""))];
const entries = Object.entries(newTemplatePairs);
const counts = letters.reduce((accu, curr) => {
  const newAccu = accu;
  const letterEntriesStarts = entries.filter((x) => x[0].startsWith(curr));
  const sumStart = _.sum(letterEntriesStarts.map((x) => x[1]));
  const letterEntriesEnds = entries.filter((x) => x[0].endsWith(curr));
  const sumEnd = _.sum(letterEntriesEnds.map((x) => x[1]));
  newAccu[curr] = Math.max(sumStart, sumEnd);
  return newAccu;
}, {});

const min = Math.min(...Object.values(counts));
const max = Math.max(...Object.values(counts));

const total = max - min;
console.log("total :>> ", total);
