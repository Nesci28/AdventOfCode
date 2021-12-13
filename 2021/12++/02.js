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

function generatePaths(node, path, visitedTwice, paths) {
  path.push(node);
  if (node === "end") {
    paths.push(path.join(","));
    return;
  }

  for (const cave of inputs[node]) {
    const isStart = cave === "start";
    if (isStart) {
      continue;
    }

    const isSmallCave = /[a-z]/.test(cave);
    const pathIncludesCave = path.includes(cave);
    if (isSmallCave && pathIncludesCave) {
      if (visitedTwice) {
        continue;
      }
      const isCaveRepetitions = path.filter((x) => x === cave).length >= 2;
      if (isCaveRepetitions) {
        continue;
      }
      generatePaths(cave, [...path], true, paths);
    } else {
      generatePaths(cave, [...path], visitedTwice, paths);
    }
  }
}

const paths = [];
generatePaths("start", [], false, paths);

const total = paths.length;
console.log("total :>> ", total);
