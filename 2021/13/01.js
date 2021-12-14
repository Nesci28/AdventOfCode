/* eslint-disable no-restricted-syntax */
const fs = require("fs");

const inputs = fs
  .readFileSync("./inputs.txt", { encoding: "utf-8" })
  .replace(/\r/g, "")
  .split("\n\n")
  .map((x) => x.split("\n"))
  .filter(Boolean);

function buildMap(xMax, yMax) {
  const map = [];
  for (let i = 0; i < yMax + 1; i += 1) {
    map.push([]);
    for (let j = 0; j < xMax + 1; j += 1) {
      map[i][j] = ".";
    }
  }

  return map;
}

const [dots, folds] = inputs;
const xMax = Math.max(...dots.map((x) => +x.split(",")[0]));
const yMax = Math.max(...dots.map((x) => +x.split(",")[1]));

const map = buildMap(xMax, yMax);

for (const dot of dots) {
  const [x, y] = dot.split(",");
  map[y][x] = "#";
}

const [direction, line] = folds[0].replace("fold along ", "").split("=");
const isYDirection = direction === "y";

const lastNum = isYDirection ? map.length - 1 : map[0].length - 1;
const diff = lastNum - line;
for (let i = 0; i < diff; i += 1) {
  const removes = isYDirection ? map[lastNum - i] : map.map((x) => x[lastNum - i]);
  const goods = isYDirection ? map[line - diff + i] : map.map((x) => x[line - diff + i]);
  for (let j = 0; j < removes.length; j += 1) {
    const removeElement = removes[j];
    const goodElement = goods[j];
    if (removeElement === "#" || goodElement === "#") {
      isYDirection ? map[line - diff + i][j] = "#" : map[j][line - diff + i] = "#";
    }
  }
}

if (isYDirection) {
  for (let i = 0; i <= diff; i += 1) {
    map.pop();
  }
} else {
  for (let i = 0; i <= map.length - 1; i += 1) {
    for (let j = 0; j <= diff; j += 1) {
      map[i].pop();
    }
  }
}

const total = map.flat().filter((x) => x === "#").length;
console.log("total :>> ", total);
