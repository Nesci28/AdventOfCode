/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
const fs = require("fs");

const inputs = fs
  .readFileSync("./inputs.txt", { encoding: "utf-8" })
  .replace(/\r/g, "")
  .split("\n\n")
  .map((x) => x.split("\n"))
  .filter(Boolean);

const templatePairs = inputs[0][0];
const pairInsertions = inputs[1]
  .map((x) => x.split(" -> "))
  .map((y) => ({ regex: y[0], letter: y[1] }));

function createPairs(arr) {
  const pairs = arr.reduce((accu, curr, i) => {
    const newAccu = accu;
    if (i === 0) {
      return newAccu;
    }
    const previousLetter = arr[i - 1];
    newAccu.push([previousLetter, curr]);
    return newAccu;
  }, []);
  return pairs;
}

const steps = 10;
let polymer = "";
let newTemplatePairs = createPairs(templatePairs.split(""));
for (let i = 0; i < steps; i += 1) {
  const newTemplate = [];

  for (let j = 0; j < newTemplatePairs.length; j += 1) {
    const templatePair = newTemplatePairs[j];
    const pairInsertion = pairInsertions.find((x) => x.regex === templatePair.join(""));
    if (!pairInsertion) {
      continue;
    }
    templatePair.splice(1, 0, pairInsertion.letter);
    if (j !== 0) {
      templatePair.shift();
    }
    newTemplate.push(templatePair);
  }

  if (i === steps - 1) {
    polymer = newTemplate.flat().join("");
  }
  newTemplatePairs = createPairs(newTemplate.flat());
}

const counts = polymer.split("").reduce((accu, curr) => {
  const newAccu = accu;
  const found = newAccu.find((x) => x.letter === curr);
  if (!found) {
    newAccu.push({ letter: curr, count: 1 });
  } else {
    found.count += 1;
  }
  return newAccu;
}, []);

const min = Math.min(...counts.map((x) => x.count));
const max = Math.max(...counts.map((x) => x.count));

const total = max - min;
console.log("total :>> ", total);
