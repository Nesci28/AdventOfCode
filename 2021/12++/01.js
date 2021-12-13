/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */
const fs = require("fs");

const inputs = fs
  .readFileSync("./inputs.txt", { encoding: "utf-8" })
  .replace(/\r/g, "")
  .split("\n")
  .filter(Boolean)
  .reduce((accu, curr) => {
    const newAccu = accu;
    const [from, to] = curr.split("-");
    newAccu[from] ? newAccu[from].push(to) : newAccu[from] = [to];
    newAccu[to] ? newAccu[to].push(from) : newAccu[to] = [from];
    return newAccu;
  }, {});

function generatePaths(from, path, paths) {
  path.push(from);
  if (from === "end") {
    paths.push(path.join(","));
    return;
  }

  for (const neighbor of inputs[from]) {
    const isSmallCave = /[a-z]/.test(neighbor);
    const isAlreadyInPath = path.includes(neighbor);
    if (isSmallCave && isAlreadyInPath) {
      continue;
    }

    generatePaths(neighbor, [...path], paths);
  }
}

const paths = [];
generatePaths("start", [], paths);

const total = paths.length;
console.log("total :>> ", total);
